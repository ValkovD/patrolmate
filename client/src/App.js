import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Spinner from "./components/Spinner";
import { Routes, Route } from "react-router-dom";
import { Home_P } from "./pages/Home_P";
import { Register_P } from "./pages/Register_P";
import { Login_P } from "./pages/Login_P";
import { Logout_P } from "./pages/Logout_P";
import JobsPerShift_P from "./pages/JobsPerShift_P";
import { PatrolMate_P } from "./pages/PatrolMate_P";
import { PrivateRoutes_P } from "./pages/PrivateRoutes_P";
import WorkContext from "./context/WorkContext";
import Jobs_P from "./pages/Jobs_P";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const initUserData = {
  name: "",
  surname: "",
  email: "",
  isLogedIn: false,
};
const initWorkData = {
  todayShift: {},
  jobsToday: [],
}



function App() {
  const [appReady, setAppReady] = useState(false)
  const [userData, setUserData] = useState(initUserData);
  const [workData, setWorkData] = useState(initWorkData);
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState({})
  // const [loading, setCurrentView] = useState("");

  // hooks
  useEffect(() => {
    // const token = localStorage.getItem("token");
    // console.log(token)
    // if (!token) {
    //   setUserData(initUserData);
    // }
    // =========================================
    const init = async () => {
      // await loginUser(userData)
      const token = localStorage.getItem("token");
      if (token) {
        await getShift();
        await getUser(token);

      }

      setAppReady(true);
    };

    init();
    // ================================================
    // getUser(token);
    // getShift();
  }, []);

  // Get User ===== making GET request with token if available in LS
  const getUser = async (tokenData) => {
    // setCurrentView("spinner");
    try {
      const config = {
        headers: { "x-auth-token": tokenData },
      };
      const res = await axios.get(
        `${SERVER_URL}/api/users/login`,
        config
      );
      // console.log("res getUser", res.data.user);
      const { name, surname, email } = res.data.user;
      setUserData({ name, surname, email, isLogedIn: true });
    } catch (err) {
      console.error(err.response.data);
      console.error(err.message, "NO USER LOGED IN");
      setUserData({ ...userData, isLogedIn: false });
    }
    // setCurrentView("");
  };

  // Login USER =========================
  const loginUser = async (loginData) => {
    setLoading(true)
    try {
      // setCurrentView("spinner")
      const res = await axios.post(
        `${SERVER_URL}/api/users/login`,
        loginData
      );
      // console.log(res.data)
      localStorage.setItem("token", `${res.data.token}`);
      const token = localStorage.getItem("token");
      console.log("logingUser OK");
      await getUser(token);
      await getShift();
      // setCurrentView("")
    } catch (err) {
      const errMsg = err.response.data
      setServerErrors(errMsg)
      setTimeout(() => {
        setServerErrors(false);
      }, 4000);
      console.log(errMsg)
      console.error(err.response.data);
      // console.error(err.message);
    } finally {
      setLoading(false)
    }
  };

  // Log Out USER must clear LS and set userData to initUserData
  const logOutUser = () => {
    localStorage.removeItem("token");
    setUserData({ ...initUserData, isLogedIn: false });
  };

  // Register USER =========================
  const registerUser = async (regData) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${SERVER_URL}/api/users/register`,
        regData
      );
      // console.log("res registerUser", res.data)
      localStorage.setItem("token", `${res.data.token}`);
      const token = localStorage.getItem("token");
      await getUser(token);
    } catch (err) {
      console.error(err.response.data);
      console.error(err.message);
    } finally {
      setLoading(false)
    }
  };
  // const test = async () => {
  //   setWorkData({ todayShift: { kk: 12 }, jobsToday: [1, 2, 3] })

  // }
  // Get Today`s Shift=====================
  const getShift = async () => {
    setLoading(true)
    const token = localStorage.getItem("token");
    try {
      const config = {
        headers: { "x-auth-token": token },
      };
      const res = await axios.get(
        `${SERVER_URL}/shifts/today`, config
      );
      let shiftRunningNow = res.data.today[0].runningNow
      // console.log(res.data.today[0])
      if (shiftRunningNow) {
        const todayShift = res.data.today[0];
        const jobsToday = res.data.today[0].jobs;
        setWorkData({ todayShift, jobsToday })
      } else {
        setWorkData(initWorkData)
      }
    } catch (err) {
      console.error(err.response.data);
      console.error(err.message);
    } finally {
      setLoading(false)
    }
  };
  // getShift()
  // Submit Shift =========================
  const submitShift = async (shiftData) => {
    // console.log(shiftData);
    const token = localStorage.getItem("token");
    try {
      const config = {
        headers: { "x-auth-token": token },
      };
      const res = await axios.post(
        `${SERVER_URL}/shifts`,
        shiftData, config
      );
      await getShift();
    } catch (err) {
      console.error(err.response.data);
      console.error(err.message);
      const errMsg = err.response.data
      setServerErrors(errMsg)
      setTimeout(() => {
        setServerErrors(false);
      }, 4000);
    }
  };
  // End Shift ============================
  const endShift = async () => {
    const token = localStorage.getItem("token");
    try {
      const config = {
        headers: { "x-auth-token": token },
      };
      const res = await axios.put(
        `${SERVER_URL}/shifts/end`,
        { runningNow: false, endActual: new Date() }, config
      );
      // console.log(new Date())
      getShift();
    } catch (err) {
      console.error(err.response.data);
      console.error(err.message);
    }
  }
  // Submit Job =========================
  const submitJob = async (jobData) => {
    const token = localStorage.getItem("token");
    try {
      const config = {
        headers: { "x-auth-token": token },
      };
      const res = await axios.put(
        `${SERVER_URL}/shifts`,
        jobData, config
      );
      await getShift();
    } catch (err) {
      console.error(err.response.data);
      console.error(err.message);
    }
  };

  return (
    !appReady ? <div className="h-screen w-screen bg-gradient-custom flex items-center justify-center"><Spinner /></div> :
      <WorkContext.Provider
        value={{
          workData,
          getShift,
        }}>
        <div className="h-screen w-screen bg-gradient-custom flex items-center justify-center">




          <Routes>
            <Route path="/" element={<Home_P userData={userData} />} />
            <Route
              path="/user"
              element={
                <PrivateRoutes_P userData={userData} logOutUser={logOutUser} />
              }
            >
              <Route
                path="jps"
                element={<JobsPerShift_P
                  submitShift={submitShift}
                  submitJob={submitJob}
                  userData={userData}
                  endShift={endShift}
                  loading={loading}
                  serverErrors={serverErrors}
                // workData={workData}
                // onUpdate={getShift}
                />}
              />
              <Route path="patrolmate" element={<PatrolMate_P />} />
              <Route path="jobs" element={<Jobs_P />} />
            </Route>
            <Route
              path="/register"
              element={
                <Register_P
                  registerUser={registerUser}
                  userData={userData}
                  loading={loading} />
              }
            />
            <Route
              path="/login"
              element={<Login_P loginUser={loginUser} userData={userData} loading={loading} serverErrors={serverErrors} />}
            />
            <Route path="/logout" element={<Logout_P />} />
            <Route path="*" element={"Error Page Not Found"} />
          </Routes>



        </div>
      </WorkContext.Provider>
  );
}

export default App;
