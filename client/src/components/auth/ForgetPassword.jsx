import react from 'react';
import { useState } from "react";

import { useNavigate } from "react-router-dom";

import ToastMessage from "./ToastMessage";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { putData } from "../../utils/api";


const ForgetPassword = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const navigate = useNavigate()
    const [email, setInputData] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [toastMessage, setToastMessage] = useState('Something went wrong ');

    const inputChangeHandler = (e) => {
        setInputData(e.target.value);
    }

    const handleReset = async (e) => {
        e.preventDefault();

        try {
            if (email.trim() == "") {
                const error = "all the fields are required"
                throw error


            }
            else if(emailRegex.test(email) == false){
                const error = "Enter your valid email address";
                throw error;
            }

            const response = await putData('/auth/forget-password', {email});
            console.log(response.data.success);

            if(response.data.success == false){
                console.log(response.data.success);

                throw response.data.message;
            }
            else{
                setSuccess(true);
                setToastMessage(response.data.message);
                setTimeout(() => {
                    navigate('/login')
                  },4000);

            }








        }
        catch (error) {
            setError(true);
            setToastMessage(error);
            setTimeout(() => {
                setError(false);
              },4000);
        }
    }
    return (
        <>
            {/*  */}
            {error && <ToastMessage error msg={toastMessage} />}
            {success && <ToastMessage msg={toastMessage} />}
            <div className="flex justify-center">
                {/* <div>
      <img  src='https://res.cloudinary.com/dd2qjbcts/image/upload/v1709495887/forgetpassword-fotor-bg-remover-2024030412749_qwkyhx.png'/>
<h1>image</h1>
      </div> */}


                <div className="md:w-[50%] md:min-w-[500px] h-screen grid place-content-center">


                    <div className="text-[3rem] font-bold text-center">
                        Forget Your Account
                    </div>
                    <Input
                        placeholder="Enter your email"
                        name=" email"
                        value={email}
                        onChange={inputChangeHandler}
                    />
                    <Button
                        buttonTitle="Reset password"
                        onClick={handleReset}

                        buttonClasses="hover:bg-[#3ebca3ae] bg-[#28B498] text-white"
                    />

                </div>
            </div>
        </>
    );
}

export default ForgetPassword;