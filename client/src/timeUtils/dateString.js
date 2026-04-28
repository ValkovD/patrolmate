export const dateString = () => {
    const date = new Date();
    return date.toLocaleDateString("en-GB", { timeZone: "Europe/London" })
};

