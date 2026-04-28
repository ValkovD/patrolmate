export const createStringFromDateObject = (date) => {
  if (typeof date !== "object") return date;
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};
