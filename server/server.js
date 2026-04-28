const express = require("express");
const cors = require("cors");
const connectMongoDb = require("./config/db");
const { authUser } = require("./middleware/authUser");
const regValidator = require("./middleware/regValidator");
const loginValidator = require("./middleware/loginValidator");
const { regNewUser } = require("./src/reg.ctrl");
const { loginUser, returnUser } = require("./src/login.ctrl");
const {
  submitShift,
  endShift,
  submitJob,
  deleteShift,
  todayShift,
} = require("./src/shifts.ctrl");
// =================================================
const app = express();
// SERVER LISTEN
const PORT = process.env.PORT || 5000;
const CLIENT_DOMAIN_ORIGIN = process.env.CLIENT_DOMAIN_ORIGIN
const LOCAL_HOST_ORIGIN = process.env.LOCAL_HOST_ORIGIN
app.listen(PORT, () => {
  console.log(`patrol_mate_server listening on ${PORT}....`);
});
// Data Base Connection
connectMongoDb();
// Middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [`${CLIENT_DOMAIN_ORIGIN}`],
    credentials: true
    // origin: "*",
  })
);

// Routes
// USER ROUTES ========================================================
// @users       POST
// @description register user
// @acces       public
app.post("/api/users/register", [regValidator], regNewUser);

// @users       POST
// @description login user
// @acces       public
app.post("/api/users/login", [loginValidator], loginUser);

// @users       GET
// @description auth user gets user based on the token it has
// @acces       private
app.get("/api/users/login", authUser, returnUser);

// SHIFT ROUTES =======================================================
// Submith shift POST from Front end
// private acces
app.post("/shifts", authUser, submitShift);

// Submit Job PUT from front end to /shifts
// edit the shift document append to jobs array
// private acces
app.put("/shifts", authUser, submitJob);

// End Shift PUT to the current running shift editing endActual
// editing runningNow to false
// editing endActual to what time is now
// private acces
app.put("/shifts/end", authUser, endShift);

app.delete("/shifts/:id", deleteShift);

//Get current day GET
// showing current day on the home page
// private acces
app.get("/shifts/today", authUser, todayShift);

// Submith job POST from Front end
// private acces
// app.put('/days/edit/jobs', daysCtrl.submitJob);
