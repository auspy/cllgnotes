export function removeUndefindedFromObject(obj: any) {
  const newObj: any = {};
  for (const key in obj) {
    if (
      obj[key] !== undefined &&
      (typeof obj[key] == "boolean" || obj[key]) &&
      (Array.isArray(obj[key]) ? obj[key].length > 0 : true)
    ) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}
