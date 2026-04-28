// Function that  creates time stamp string
function timeString() {
    const date = new Date();
    return date.toLocaleTimeString("en-GB")
};

module.exports = { timeString }