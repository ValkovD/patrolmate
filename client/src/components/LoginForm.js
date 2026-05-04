import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Spinner from './Spinner';
const initLoginData = {
  email: "",
  password: "",
  // validated: false,
};
// ====================================================================
export const LoginForm = ({ loginUser, loading, serverErrors }) => {
  // Navigation====================
  // const navigate = useNavigate();
  // Local State =======================
  const [loginData, setLoginData] = useState(initLoginData);
  const [errors, setErrors] = useState({});

  // Validator rules ===================
  const validate = () => {
    const newErrors = {};

    if (!loginData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!loginData.email.includes("@")) {
      newErrors.email = "Invalid e-mail";
    }

    if (loginData.password.length < 8) {
      newErrors.password = "Invalid Password";
    }

    return newErrors;
  };
  // OnChange===========================
  const onChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  // OnSubmit =================================
  const submitLoginForm = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      console.log(validationErrors)
      return;
    } else {
      loginUser(loginData)
      // navigate("/user")
      setLoginData(initLoginData)

    }

  }

  return (
    <div className='h-full content-center grid justify-items-center'>
      <div>
        {serverErrors && <p className="text-primaryDark text-center text-lg text-red-700">{serverErrors.msg}</p>}
      </div>
      <form onSubmit={submitLoginForm} >
        <div className='mb-4'>
          {errors.email && <p className="w-64 text-balance text-center text-primaryDark font-bold text-sm text-red-700">{errors.email}</p>}
          <input onChange={onChange} value={loginData.email} className={`h-18 shadow-custom w-64 bg-primary border-2 ${errors.email ? "border-red-700" : "border-stone-500"} rounded-md border-solid p-2`} type="email" id="email" name="email" placeholder='e-mail' />
        </div>
        <div className='mb-8'>
          {errors.password && <p className="w-64 text-balance text-center text-primaryDark font-bold text-sm text-red-700">{errors.password}</p>}
          <input onChange={onChange} value={loginData.password} className={`h-18 shadow-custom w-64 bg-primary border-2 ${errors.password ? "border-red-700" : "border-stone-500"} rounded-md border-solid p-2`} type="password" id="password" name="password" placeholder='password' />
        </div>
        {/* Login Button ======= */}
        <button className='w-64 h-18 flex items-center justify-center btn-gradient shadow-custom text-3xl text-center text-primaryDark bg-primary font-extrabold border-2 border-secondary p-4 rounded-lg mb-10'>{loading ? <Spinner size={55} /> : "Login"}</button>

        <div className='text-center'>
          {/* <p>or</p> */}
        </div>
      </form>
      <div>
        <NavLink to="/register" className="border-b-2 text-primaryDark text-xl border-primaryDark" >Register</NavLink>
      </div>
    </div>
  )
};
