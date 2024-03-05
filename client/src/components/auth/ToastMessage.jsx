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
   toast[type](msg,{
        autoClose: 3000,
        position: 'top-right',
        hideProgressBar: false,
        closeButton:false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
   })
        
  }, [msg, type]);

  return (
    <>
      <ToastContainer />

    </>
  )
}

export default ToastMessage;