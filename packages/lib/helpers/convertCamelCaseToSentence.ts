export const convertCamelCaseToSentence = (camelCase: string) => {
  const sentence = camelCase.replace(/([A-Z])/g, " $1");
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
};
