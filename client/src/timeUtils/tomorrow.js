export const tomorrow = () => {
  return `Tomorrow ${new Date().getDate() + 1} ${new Date().toLocaleString(
    "en-GB",
    {
      year: "numeric",
      month: "short",
      timeZone: "Europe/London"
    }
  )}`;
};
