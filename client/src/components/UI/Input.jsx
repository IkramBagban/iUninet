import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Input = ({ value, type, onChange, placeholder, name }) => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        console.log('')
        setShowPassword(!showPassword);
    }
    type = type || "text"

    return (
        <div className="flex">
            <input
                placeholder={placeholder}
                name={name}
                className="p-3 mt-5 w-[32rem] h-[4rem] bg-[#ECF5F3] rounded-3xl text-[20px] text-normal text-black"
                value={value || ""} type={showPassword ? "text" : type} onChange={onChange}
            ></input>
            {type === 'password' ?
                <button className="absolute flex inset-y-50% pl-29rem" type="button" onClick={togglePasswordVisibility}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                : ''
            }
        </div>
    )
}

export default Input