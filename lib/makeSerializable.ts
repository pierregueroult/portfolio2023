// ! This function is used to make an object serializable by converting it to a JSON string and then back to an object.
export function makeSerializable<T extends any>(o: T): T {
  return JSON.parse(JSON.stringify(o));
}
