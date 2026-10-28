export const searchValues = [3, 8, 12, 19, 24, 31, 37, 42, 56, 68, 73, 91];

export function traceBinarySearch(values, target) {
  let low = 0;
  let high = values.length - 1;
  const trace = [
    {
      low,
      high,
      mid: null,
      comparisons: 0,
      done: values.length === 0,
      found: false,
      message: values.length
        ? 'The array is sorted. Start with the whole search space.'
        : 'The array is empty. There is nothing to search.',
    },
  ];
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    const value = values[mid];
    const found = value === target;
    let message;
    if (found) message = `${value} = ${target}. Found at index ${mid}.`;
    else if (value < target) {
      low = mid + 1;
      message = `${value} < ${target}. Keep the values to the right.`;
    } else {
      high = mid - 1;
      message = `${value} > ${target}. Keep the values to the left.`;
    }
    const done = found || low > high;
    if (done && !found)
      message += ` No candidates remain: ${target} is not in the array.`;
    trace.push({
      low,
      high,
      mid,
      comparisons: trace.length,
      done,
      found,
      message,
    });
    if (found) break;
  }
  return trace;
}
