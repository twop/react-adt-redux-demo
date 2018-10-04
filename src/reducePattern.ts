const Empty = 'empty';
type Opt<T> = T | typeof Empty;
const isEmpty = <T>(v: Opt<T>): v is typeof Empty => v === Empty;

type Elem<T> = { val: T; next: Opt<Elem<T>> };
type List<T> = Opt<Elem<T>>;

const L = {
  addInFront: <T>(l: List<T>, val: T): List<T> => ({ val, next: l })
};

const sum = (l: List<number>, s: number = 0): number =>
  isEmpty(l) ? s : sum(l.next, s + l.val);

const findElem = (
  l: List<number>,
  val: number,
  res: boolean = false
): boolean =>
  res || isEmpty(l) ? false : l.val === val || findElem(l.next, val, false);

const even = (l: List<number>, res: List<number> = Empty): List<number> =>
  isEmpty(l)
    ? res
    : even(l.next, l.val % 2 === 0 ? L.addInFront(res, l.val) : res);

const reduce = <T, R>(l: List<T>, op: (r: R, v: T) => R, initVal: R): R =>
  isEmpty(l) ? initVal : reduce(l.next, op, op(initVal, l.val));

const sum2 = (l: List<number>): number => reduce(l, (r, v) => r + v, 0);

const findElem2 = (l: List<number>, val: number): boolean =>
  reduce(l, (r, v) => r || val === v, false);

const filter = <T>(l: List<T>, pred: (v: T) => boolean): List<T> =>
  reduce(l, (r: List<T>, v) => (pred(v) ? L.addInFront(r, v) : r), Empty);

const map = <T, U>(l: List<T>, f: (v: T) => U): List<U> =>
  reduce(l, (r: List<U>, v) => L.addInFront(r, f(v)), Empty);

// type R<T> = { pairs: [T, T][]; left?: T };
type Pair<T> = [T, T?];
const pair = <T>(a: T, b?: T): Pair<T> => [a, b];
const zip = <T>(l: List<T>): List<Pair<T>> =>
  reduce(
    l,
    (r: List<Pair<T>>, v) => {
      if (isEmpty(r)) {
        return L.addInFront(r, pair(v));
      }

      const [a, b] = r.val;

      if (b === undefined) {
        return L.addInFront(r.next, pair(a, v));
      }

      return L.addInFront(r, pair(v));
    },
    Empty
  );

const ev = [1, 2, 3].reduce(
  (r: number[], v) => (v % 2 === 0 ? r.concat(v) : r),
  []
);

// console.log(ev);
