
import { useState} from "react";

import ToastMessage from "./ToastMessage";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { putData } from "../../utils/api";
import { useParams } from "react-router-dom";


const ForgetPassword = () => {
    const { token } = useParams();
    
      

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [toastMessage, setToastMessage] = useState('Something went wrong ');

    const [inputData, setInputData] = useState({
        password: "",
        confirmPassword: ""
        
      })
    const inputChangeHandler = ((e) => {
        const { name, value } = e.target;
        setInputData(prevData => ( {
          ...prevData, [name]: value
        }))
      });

    const handleReset = async (e) => {
        e.preventDefault();

        try {
            if (Object.values(inputData).some(input => input.trim() === "")) {
                const error = "all the fields are required"
                throw error


            } else if (inputData.password.length < 8  || inputData.password.length > 16) {
                const error = "New Password must be of length between 8 to 16"
                throw error
              }

              else if(inputData.password != inputData.confirmPassword){
                const error="Confirm password must be same as new password";
                throw error;            
              }

              const response = await putData(`/auth/update-password/${token}`, inputData.password,{token});
              console.log(response);

              if(response.status==500){
                throw response.statusText;
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


                    <div className="text-[2.9rem] font-bold text-center">
                        Update Your Password
                    </div>
                    <Input
                        placeholder="Enter your new password"
                        name="password" type="password"
                        value={inputData.password}
                        onChange={inputChangeHandler}
                    />
                    <Input
                        placeholder="Enter your new confirm password"
                        name="confirmPassword" type="password"
                        value={inputData.confirmPassword}
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