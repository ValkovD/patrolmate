
const Shift = require('../models/Shift');
const { dateString } = require('../utils/DateString');
const { decodeId } = require('../utils/decodeId')
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
// ==============================================



// Show today Shift by token id whoever is logged in GET /shifts/today
// can only see his shift
async function todayShift(req, res) {
    // console.log("today", today, dateString())
    try {
        const token = req.header("x-auth-token")
        const stringId = decodeId(token)
        let today = await Shift.find({ date: dateString(), ownerId: stringId })
        if (today.length === 0) { return res.status(404).json({ msg: "Today not found CODE 404" }) }
        res.status(200).json({ today });
    } catch (err) {
        console.error(err.message);
        res.status(500).json([{ msg: "Server error" }]);
    }
};
// =================================================================
// Submit Shift POST /shifts private
async function submitShift(req, res) {
    // const today = dateString;
    try {
        const token = req.header("x-auth-token")
        const stringId = decodeId(token)
        let today = await Shift.find({ date: dateString(), ownerId: stringId })
        if (today.length !== 0) {
            return res.status(405).json({ msg: "One shift per day Only !!!" })
        } else {
            let shift = req.body
            const token = req.header("x-auth-token")
            const decodedId = decodeId(token)
            shift = new Shift(shift)
            shift.ownerId = decodedId
            await shift.save()
            res.status(200).json({ msg: "Shift submited" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json([{ msg: "Server error" }]);
    }
};
// ==============================================
// End Shift PUT /shifts/end private
async function endShift(req, res) {
    // const today = dateString;
    try {
        const token = req.header("x-auth-token")
        const decodedId = decodeId(token)
        // console.log(req.body.endActual)
        let filter = { runningNow: true, ownerId: decodedId };
        let update = { runningNow: false, endActual: req.body.endActual }
        let endedShift = await Shift.findOneAndUpdate(filter, update, { new: true })

        // await console.log(endedShift);
        if (!endedShift) {
            res.status(200).json({ msg: "Shift not Found" });
        } else {
            res.status(200).json({ msg: "Shift ended" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json([{ msg: "Server error" }]);
    }
};
// ==============================================

// ==================================================================
// Submit Job PUT /shifts finds the todays shift and updates the
// jobs array by appending new element job object with his own props
async function submitJob(req, res) {
    const token = req.header("x-auth-token")
    const decodedId = decodeId(token)
    const ownerId = decodedId
    let todayShift = await Shift.find({ date: dateString(), ownerId })
    if (todayShift.length === 0) { return res.status(404).json({ msg: "Today Shift not found CODE 404" }) }
    try {
        let filter = { date: dateString(), ownerId };
        let update = { jobs: [...todayShift[0].jobs, req.body] }
        let updatedShift = await Shift.findOneAndUpdate(filter, update, { new: true })
        res.status(200).json({ msg: "Job submited" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json([{ msg: "Server error" }]);
    }
}
// =================================================================
// Delete day DELETE /days
async function deleteShift(req, res) {
    if (req.params.id.length !== 24) {
        return res
            .status(400)
            .json([{ msg: "Incorrect id format requested from client" }]);
    }
    try {
        let shiftToDel = await Shift.findById(req.params.id).exec();
        if (!shiftToDel) {
            return res
                .status(404)
                .json({ msg: "Shift not found" });
        }
        let deletedShift = await Shift.findByIdAndDelete(shiftToDel);
        return res.status(200).json([{ msg: `Shift ${deletedShift.date} deleted` }]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json([{ msg: "Server error" }]);
    }
    const shiftToDel = req.params.id;
    console.log(shiftToDel)
    res.send(shiftToDel);
};

module.exports = {
    todayShift,
    submitJob,
    submitShift,
    endShift,
    deleteShift,
    // showAllDays,
    // fillDays
}


