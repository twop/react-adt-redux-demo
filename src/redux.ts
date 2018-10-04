import { describeAction, createReducer } from 'ts-describe-action';
import { createStore, applyMiddleware, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkAction } from 'redux-thunk';
import { Middleware } from 'redux';

import { ItemState, Desc, AppState } from './types';
import { api, Res } from './api';

const StartFetching = describeAction(
  'start fetching',
  (prev: AppState, index: number) => ({
    ...prev,
    [index]: ItemState.Fetching()
  })
);

const Fetched = describeAction(
  'finished fetching',
  (prev: AppState, { index, desc }: { index: number; desc: Desc }) => ({
    ...prev,
    [index]: ItemState.Fetched(desc)
  })
);

const FetchedErr = describeAction(
  'fetching err',
  (prev: AppState, { index, err }: { index: number; err: string }) => ({
    ...prev,
    [index]: ItemState.Err(err)
  })
);

export const fetchDescription = (
  index: number
): ThunkAction<void, AppState, void, AnyAction> => dispath => {
  dispath(StartFetching.create(index));

  api.fetchDesc(index).then(res =>
    dispath(
      Res.match<AnyAction>(res, {
        Ok: desc => Fetched.create({ index, desc }),
        Err: str => FetchedErr.create({ index, err: str })
      })
    )
  );
};

const reducer = createReducer(
  [StartFetching, Fetched, FetchedErr],
  {} as AppState
);

let allActions: AnyAction[] = [
  { type: 'start fetching', payload: 0 },
  {
    type: 'finished fetching',
    payload: { index: 0, desc: { text: 'Fetched ^_^ (0)' } }
  },
  { type: 'start fetching', payload: 1 },
  {
    type: 'fetching err',
    payload: { index: 1, err: 'Ha! Ha! Failed 0_o (1)' }
  },
  { type: 'start fetching', payload: 2 },
  {
    type: 'finished fetching',
    payload: { index: 2, desc: { text: 'Fetched ^_^ (2)' } }
  },
  { type: 'start fetching', payload: 3 },
  { type: 'fetching err', payload: { index: 3, err: 'Ha! Ha! Failed 0_o (3)' } }
];

const logger: Middleware<{}, AppState> = s => next => action => {
  // tslint:disable-next-line:no-console
  console.log('dispatching', action);
  // allActions.push(action);
  // tslint:disable-next-line:no-console
  // console.log('Ser', JSON.stringify(allActions));
  let result = next(action);
  // tslint:disable-next-line:no-console
  console.log('next state', s.getState());
  return result;
};

const initState: AppState | undefined = allActions.reduce(reducer, {});

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});
export const store = createStore(
  reducer,
  initState || {},
  composeEnhancers(applyMiddleware(thunk, logger))
);
// export const store = createStore(reducer, applyMiddleware(thunk));
