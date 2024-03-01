import react, { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastMessage = ({ type, msg }) => {
  useEffect(() => {
    // if type = 'success' it will be like 
    // toast.succes()
    if (!type) {
      alert("type should be provided to 'ToastMessage' component")
      return
    }
    toast[type](msg);
  }, [msg, type]);

  return (
    <>
      <ToastContainer />

    </>
  )
}

export default ToastMessage;