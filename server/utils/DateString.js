// Function that  creates the simple todays date string

function dateString() {
    const date = new Date();
    return date.toLocaleDateString("en-GB", { timeZone: "Europe/London" })
};

module.exports = { dateString }