import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

import AuthRightSection from "../UI/AuthRightSection";
import ToastMessage from "./ToastMessage";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { postData } from "../../utils/api";

const Login = () => {

  const [inputData, setInputData] = useState({
    email: "",
    password: ""
  })

  const inputChangeHandler = ((e) => {
    const { name, value } = e.target;
    setInputData(prevData => ({
      ...prevData, [name]: value
    }))
  });

  const navigate = useNavigate()

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [toastMessage, setToastMessage] = useState('Something went wrong ');


  if (localStorage.getItem('token')) return <Navigate to="/" />

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (Object.values(inputData).some(input => input.trim() === "")) {
        const error = "all the fields are required"
        throw error
      }

      const response = await postData('/auth/login', inputData);
      console.log('response', response)
      if (response?.status === 404) {
        const error = "user not found"
        throw error
      }

      if (response.data.success === false) {
        const error = response.data?.message
        throw error
      } else {
        setSuccess(true);
        setToastMessage("Login successful");
        navigate('/')
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user._id);
      }
    } catch (error) {
      console.error("Error:", error);

      setError(true);
      if (error.response?.data.message === "Invalid password") {
        return setToastMessage(error.response.data.message);
      }
      setToastMessage(error);
      setTimeout(() => {
        setError(false);
      },4000);
      
    }
  }

  return (

    <>
      {error && <ToastMessage type="error" msg={toastMessage} />}
      {success && <ToastMessage type="success" msg={toastMessage} />}

      <div className="flex flex-col md:flex-row ">
        <div className="md:w-[50%] md:min-w-[500px] h-screen grid place-content-center">
          <div className="text-[3rem] font-bold text-center">
            Login To Your Account
          </div>
          <div className="text-[1.8rem] font-normal text-center">
            Login using social networks{" "}
          </div>
          <hr className="h-px mx-7 my-3 " />


          <div className="grid place-content-center my-7">
            <Input
              placeholder="Email"
              name="email"
              value={inputData.email}
              onChange={inputChangeHandler}
            />

            <Input
              placeholder="Password"
              name="password"
              value={inputData.password}
              onChange={inputChangeHandler}
              type="password"
            />

            <Link href="" className=" text-right text-normal mt-2 hover:text-blue-400 text-[1.3rem] ">
              Forgot Password?
            </Link>
          </div>
          <Button
            buttonTitle="Sign In"
            onClick={handleSubmit}
            buttonClasses="hover:bg-[#3ebca3ae] bg-[#28B498] text-white"
          />
        </div>

        <AuthRightSection heading="New Here?" content="Sign up and discover a great amount of new opportunities!" buttonTitle="Sign Up" onButtonClick={() => navigate('/register')} />

      </div>

    </>
  );
};

export default Login;