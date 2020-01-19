export const makeArray = obj => {
  const array = [];
  for (let i = 0, num = obj.length; i < num; i++) {
    array[i] = obj[i];
  }
  return array;
};
