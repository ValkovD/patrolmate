export const timeString = () => {
    const date = new Date();
    return date.toLocaleTimeString("en-GB", { timeZone: "Europe/London", hour: "2-digit", minute: "2-digit" })
};