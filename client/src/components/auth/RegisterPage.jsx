import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import ToastMessage from "./ToastMessage";
import AuthRightSection from "../UI/AuthRightSection";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { postData } from "../../utils/api";
import FileInput from "../UI/FileInput";


const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const RegisterPage = () => {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
    name: "",
  })
  const [selectedFile, setSelectedFile] = useState(null)


  console.log("locals", localStorage)

  //for errors
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState('Something went wrong ');

  const navigate = useNavigate()


  if (localStorage.getItem('token')) return <Navigate to="/" />


  const inputChangeHandler = (e) => {
    const { name, value } = e.target
    setInputData(prevData => ({ ...prevData, [name]: value }))
  }
  const onFileChange = (e) => {
    console.log(e.target)
    console.log('e.target.files',e.target.files[0])
    setSelectedFile(e.target.files[0])
  }


  const handleSubmit = async (e) => {
    setError(false)
    setSuccess(false)
    setToastMessage('')
    e.preventDefault();
    try {

      if (Object.values(inputData).some(input => input.trim() === "")) {
        const error = "All the fields are required";
        throw error
      }

      //password 8 to 16
      else if (inputData.password.length < 8 || inputData.password.length > 16) {
        const error = "Password must be of length between 8 to 16"
        throw error
      }

      else if (emailRegex.test(inputData.email) === false) {
        const error = "Enter your valid email address"
        throw error
      }

      const formData = new FormData();
      formData.append('name', inputData.name)
      formData.append('email', inputData.email);
      formData.append('password', inputData.password);
      if (selectedFile) {
        formData.append('profilePic', selectedFile)
      }
      console.log('formdata', formData)
      const response = await postData('/auth/register', formData)
      console.log('response', response)

      if (response.data.success === true) {
        setSuccess(true);
        setToastMessage("User register successfully");
        navigate('/login')
      }

      else {
        throw response.message
      }
    }
    catch (err) {
      setError(true);
      setToastMessage(err || "Something went wrong !!");
     
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
            Register Your Account
          </div>
          <hr className="h-px mx-7 my-3 " />

          <div className="grid place-content-center my-7">

            <Input
              placeholder="Name"
              name="name"
              value={inputData.name}
              onChange={inputChangeHandler}
            />

            <Input placeholder="Email"
              name="email"
              value={inputData.email}
              onChange={inputChangeHandler}
            />
            <FileInput onChange={onFileChange} />

            <Input
              placeholder="Password"
              name="password"
              value={inputData.password}
              type='password'
              onChange={inputChangeHandler}
            />
          </div>
          <Button buttonTitle="Sign Up" onClick={handleSubmit} buttonClasses="hover:bg-[#3ebca3ae] bg-[#28B498] text-white" />
        </div>

        <AuthRightSection heading="Already There?" content="Sign In and discover a great amount of new opportunities!" buttonTitle="Sign In" onButtonClick={() => navigate('/login')} />
      </div>

    </>
  );

}

export default RegisterPage;