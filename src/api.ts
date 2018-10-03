import { Union, of } from 'ts-union';
import { Desc } from './types';

export const Res = Union({
  Ok: of<Desc>(),
  Err: of<string>()
});

type Api = {
  fetchDesc: (index: number) => Promise<typeof Res.T>;
};

const timeout = 2000;
const minWait = 200;

const wait = (time: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, time));

export const api: Api = {
  fetchDesc: index =>
    wait(minWait + Math.random() * timeout).then(() =>
      Promise.resolve(
        Math.random() > 0.5
          ? Res.Ok({ text: `Fetched ^_^ (${index})` })
          : Res.Err(`Ha! Ha! Failed 0_o (${index})`)
      )
    )
};
