import { Union, of } from 'ts-union';

export type Desc = {
  text: string;
};

export const ItemState = Union({
  Fetched: of<Desc>(),
  Fetching: of<void>(),
  Err: of<string>()
});

export type AppState = {
  [index: number]: typeof ItemState.T | undefined;
};

// const state: AppState = {};

// state[1] = undefined;
