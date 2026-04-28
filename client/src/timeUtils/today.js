export const today = () => {
  return `Today
      ${new Date().toLocaleString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "Europe/London"
  })}
      `;
};
