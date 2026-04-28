
const mongoose = require('mongoose')
const { timeString } = require("../utils/TimeString");
const { dateString } = require('../utils/DateString')
console.log(dateString())
const ShiftSchema = mongoose.Schema({
    date: { type: String, required: true },
    start: {
        type: Date,
        required: true
    },
    endDef: {
        type: Date,
        required: true
    },
    endActual: {
        type: Date,
    },
    runningNow: {
        type: Boolean,
    },
    duration: {
        type: Number,
        required: true
    },

    ownerId: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    ownerSurname: {
        type: String,
        required: true
    },



    jobs: [{
        endTime: { type: String, },
        date: { type: String, },
        jobOutcome: { type: String, requred: true },
        notes: { type: String, default: "N/A" }
    }],
    jps: { type: Number },
    jpsSpeed: { type: Number },
})
module.exports = mongoose.model("shift", ShiftSchema);