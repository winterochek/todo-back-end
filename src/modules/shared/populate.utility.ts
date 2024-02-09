export function populate<T, U>({
  field,
  callback,
}: {
  field?: T[];
  callback: (entity: T) => U;
}): U[] | undefined {
  if (!field) return;
  return field.map(callback);
}
