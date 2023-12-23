export default function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabillizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabillizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabillizedThis.map((el) => el[0]);
}
