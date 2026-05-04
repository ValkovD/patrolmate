import React from 'react'
import { useState } from 'react';
import { RegisterBtn } from './RegisterBtn';
import { NavLink } from 'react-router-dom';
import Spinner from './Spinner';

const initRegisterData = {
    name: "",
    surname: "",
    email: "",
    password: "",
    // validated: false,
};
export const RegisterForm = ({ registerUser, setCurrentView, loading }) => {
    const [registerData, setRegisterData] = useState(initRegisterData);
    const [errors, setErrors] = useState({});

    // Validator rules ===================
    const validate = () => {
        const newErrors = {};

        if (!registerData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!registerData.surname.trim()) {
            newErrors.surname = "Surname is required";
        }

        if (!registerData.email.includes("@")) {
            newErrors.email = "Invalid e-mail";
        }

        if (registerData.password.length < 8) {
            newErrors.password = "Use more than 8 characters with uppercase, lowercase, a number, and a symbol (!@#$).";
        }

        return newErrors;
    };

    // OnChange===========================
    const onChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
        // React takes THE CURRENT STATE FUNCTIONAL FORM of the state and modify only the current input i am typing in grabs it by name
        setErrors((prev) => ({
            ...prev,
            [e.target.name]: "",
        }));
    };
    // OnSubmit ===========================
    const submitRegisterForm = (e) => {
        e.preventDefault()
        e.stopPropagation()


        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        } else {
            registerUser(registerData);
            setRegisterData(initRegisterData);
        }
    }


    return (

        <div className='h-full grid justify-items-center content-center'>
            <form onSubmit={submitRegisterForm}>
                <h2 className='mb-6 text-center text-xl text-secondary font-semibold'>
                    New User Registration
                </h2>


                <div className='mb-4'>
                    { }
                    {errors.name && <p className="w-64 text-balance text-center text-primaryDark font-bold text-sm text-red-700">{errors.name}</p>}
                    <input
                        onChange={onChange}
                        className={`h-18 shadow-custom w-64 bg-primary border-2 rounded-md border-solid ${errors.name ? "border-red-700" : "border-stone-500"} p-2`}
                        type="text"
                        id="name"
                        name="name"
                        placeholder='Name'
                    />
                </div>
                <div className='mb-4'>
                    {errors.surname && <p className="w-64 text-balance text-center text-primaryDark font-bold text-sm text-red-700">{errors.surname}</p>}
                    <input
                        onChange={onChange}
                        className={`h-18 shadow-custom w-64 bg-primary border-2 rounded-md border-solid ${errors.surname ? "border-red-700" : "border-stone-500"} p-2`}
                        type="text"
                        id="surname"
                        name="surname"
                        placeholder='Surname'
                    />
                </div>

                <div className='mb-4'>
                    {errors.email && <p className="w-64 text-balance text-center text-primaryDark font-bold text-sm text-red-700">{errors.email}</p>}
                    <input
                        onChange={onChange}
                        className={`h-18 shadow-custom w-64 bg-primary border-2 rounded-md border-solid ${errors.email ? "border-red-700" : "border-stone-500"} p-2`}
                        type="email"
                        id="email"
                        name="email"
                        placeholder='e-mail'
                    />
                </div>

                <div className='mb-8'>
                    {/* <div className='h-[80px] text-center break-words'> */}
                    {errors.password && <p className="w-64 text-balance text-center text-primaryDark font-bold text-sm text-red-700">{errors.password}</p>}
                    {/* </div> */}

                    <input
                        onChange={onChange}
                        className={`h-18 shadow-custom w-64 bg-primary border-2 rounded-md border-solid ${errors.password ? "border-red-700" : "border-stone-500"} p-2`}
                        type="password"
                        id="password"
                        name="password"
                        placeholder='password'
                    />
                </div>

                <RegisterBtn />
            </form>

            <div>
                <NavLink
                    to="/login"
                    className="border-b-2 text-primaryDark text-xl border-primaryDark"
                >
                    Login
                </NavLink>
            </div>
        </div>


    );




}
