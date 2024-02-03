import { Link } from "react-router-dom";
import { useState } from "react";
const Login = () => {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  

  const handleSubmit = () => {
    console.log(email, password);
  }

  const handleInputChangePassword=(e)=>{
    setPassword(e.target.value);
  }

  const handleInputChangeEmail=(e)=>{
  console.log(e.target.value);
  setEmail(e.target.value);
  }
  return (

     <>
       <form onSubmit={handleSubmit}> 
    <div className=" flex ">
      <div className="min-w-[938px] h-screen bg-white grid place-content-center ">
        <div className=" text-[3rem] font-bold text-center">
          Login To Your Account
        </div>
        <div className="text-[1.8rem] font-normal  text-center">
          Login using social networks{" "}
        </div>
        <div className="flex justify-center">
          <a href="">
            <img
              className="w-[3rem] mr-4"
              src="https://img.freepik.com/premium-vector/round-facebook-logo-isolated-white-background_469489-897.jpg"
              alt=""
            />
          </a>
          <a href="">
            <img
              className="w-[3rem] mr-4"
              src="https://cdn-teams-slug.flaticon.com/google.jpg"
              alt=""
            />
          </a>
          <a href="">
            <img
              className="w-[3rem] mr-4"
              src="data:image/png;base64,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"
              alt=""
            />
          </a>
        </div>

        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <div className="grid place-content-center">
          <div>
            <input
              placeholder="Email"
<<<<<<< HEAD
              className=" p-3 w-[32rem] h-[4rem] text-grey border border-[#3ebca3ae] bg-[#ECF5F3] rounded-3xl text-[20px] text-normal"
=======
              className=" p-3 w-[32rem] h-[4rem] bg-[#000000] rounded-3xl text-[20px] text-normal" value={email} onChange={handleInputChangeEmail}
>>>>>>> 756ebb512c49108e366b71cad33468c722a9b438
            ></input>
          </div>
          <div>
            <input
              placeholder="Password"
              className=" p-3 mt-5 w-[32rem] h-[4rem] bg-[#000000] rounded-3xl text-[20px] text-normal"
              value={password} onChange={handleInputChangePassword}
            ></input>
          </div>

          <Link href="" className=" text-right text-normal mt-2 hover:text-blue-400 text-[1.3rem] ">
            Forgot Password?
          </Link>
        </div>

        <div className="flex justify-center mt-6 ">
          <button type="submit"  className=" hover:bg-[#3ebca3ae] w-[322px] h-[77px] text-center rounded-[30px] bg-[#28B498] text-white text-[32px] text-normal">
            Sign In
          </button>
        </div>
      </div>
      <div className="min-w-[576px] h-screen bg-gradient-to-r from-[#3FAAA8F2] to-[#39B792] flex justify-center">
        <div className="w-[498px] h-screen grid place-content-center">
          <div className=" text-center text-white font-bold text-[4rem]">
            New Here?
          </div>

          <div className=" text-center  text-white font-medium text-[1.5rem]">
            Sign up and discover a great amount of new opportunities!
          </div>
          <div className=" flex justify-center">
            <button className="mt-10 w-[322px] h-[77px] bg-white rounded-[30px] text-center text-[32px] font-semibold text-teal-600 hover:text-white hover:bg-teal-600 transition duration-300">
              Sign Up
            </button>

          </div>
        </div>
      </div>
    </div>
    </form>
    </>
  );
};

export default Login;