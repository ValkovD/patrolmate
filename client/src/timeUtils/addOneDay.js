export const addOneDay = (date) => {
  const result = new Date(date);
  result.setDate(result.getDate() + 1);
  return result;
};
