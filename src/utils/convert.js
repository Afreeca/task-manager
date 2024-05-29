export const convertCamelCase = (str) => {
  let result = str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
  return result;
};
