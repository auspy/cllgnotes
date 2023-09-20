export function removeUndefindedFromObject(obj: any) {
  const newObj = {};
  for (const key in obj) {
    if (obj[key] !== undefined) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}
