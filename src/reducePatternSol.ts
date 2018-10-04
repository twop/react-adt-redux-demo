// const findSum = (l: List<number>, sum: number = 0): number =>
//   isEmpty(l) ? sum : sum + l.val + findSum(l.next);

// const findValue = (
//   l: List<number>,
//   val: number,
//   found: boolean = false
// ): boolean =>
//   found || isEmpty(l) ? false : val === l.val || findValue(l.next, val, found);

// const even = (l: List<number>, res: List<number> = Empty): List<number> => {
//   return isEmpty(l)
//     ? res
//     : even(l.next, l.val % 2 === 0 ? L.addInFront(res, l.val) : res);
// };

// const reduce = <T, R>(l: List<T>, op: (res: R, val: T) => R, initVal: R): R =>
//   isEmpty(l) ? initVal : reduce(l.next, op, op(initVal, l.val));

// const findSum2 = (l: List<number>): number => reduce(l, (r, v) => r + v, 0);
// const findValue2 = (l: List<number>, val: number): boolean =>
//   reduce(l, (r, v) => r || v === val, false);

// const filter = (l: List<number>, pred: (v: number) => boolean): List<number> =>
//   reduce(l, (r: List<number>, v) => (pred(v) ? L.addInFront(r, v) : r), Empty);
