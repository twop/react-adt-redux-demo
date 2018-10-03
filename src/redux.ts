import { describeAction, createReducer } from 'ts-describe-action';
import { createStore, applyMiddleware, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkAction } from 'redux-thunk';

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

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});
export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);
// export const store = createStore(reducer, applyMiddleware(thunk));
