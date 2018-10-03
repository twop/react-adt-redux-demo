import { Reducer, applyMiddleware, createStore } from 'redux';
import { AppState, ItemState, Desc } from './types';
import thunk, { ThunkAction } from 'redux-thunk';
import { api, Res } from './api';

const START_FETCHING = 'start fetching';
const FINISHED_FETCHING = 'finished fetching';
const ERR_FETCHING = 'err fetching';

type StartfetchingAction = {
  type: typeof START_FETCHING;
  payload: number;
};

type FinishedfetchingAction = {
  type: typeof FINISHED_FETCHING;
  payload: { index: number; desc: Desc };
};

type ErrfetchingAction = {
  type: typeof ERR_FETCHING;
  payload: { index: number; err: string };
};

type AllActions =
  | StartfetchingAction
  | FinishedfetchingAction
  | ErrfetchingAction;

const startFetching = (index: number): StartfetchingAction => ({
  type: START_FETCHING,
  payload: index
});

const finishedFetching = (
  index: number,
  desc: Desc
): FinishedfetchingAction => ({
  type: FINISHED_FETCHING,
  payload: { index, desc }
});

const errFetching = (index: number, err: string): ErrfetchingAction => ({
  type: ERR_FETCHING,
  payload: { index, err }
});

export const ourReducer: Reducer<AppState, AllActions> = (
  prev = {},
  action
) => {
  // NOTE. DONT_DO_THAT. Never mutate state!
  switch (action.type) {
    case START_FETCHING: {
      // return { ...prev, [action.payload]: ItemState.Fetching() };
      prev[action.payload] = ItemState.Fetching();
      return prev;
    }
    case FINISHED_FETCHING: {
      const { index, desc } = action.payload;
      prev[index] = ItemState.Fetched(desc);
      return prev;
      //   return { ...prev, [index]: ItemState.Fetched(desc) };
    }
    case ERR_FETCHING: {
      const { index, err } = action.payload;
      prev[index] = ItemState.Err(err);
      // return { ...prev, [index]: ItemState.Err(err) };
      return prev;
    }
    default:
      return prev;
  }
};

type MyThunkAction = ThunkAction<void, AppState, void, AllActions>;

export const fetchDescription = (index: number): MyThunkAction => dispath => {
  dispath(startFetching(index));

  api.fetchDesc(index).then(res =>
    dispath(
      Res.match<AllActions>(res, {
        Ok: desc => finishedFetching(index, desc),
        Err: str => errFetching(index, str)
      })
    )
  );
};

export const ourStore = createStore(ourReducer, applyMiddleware(thunk));
