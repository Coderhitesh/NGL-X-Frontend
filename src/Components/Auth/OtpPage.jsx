import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {toast} from 'react-hot-toast'
const OtpPage = () => {
  const { email } = useParams();
  const [formValid, setFormValid] = useState({
    email: email, // Set the email value dynamically
    otp: "",
  });
  const [ResendOtp, setResendOtp] = useState({
    email: email, 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValid({ ...formValid, [name]: value });
  };

  const handleVerifyUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api.dgmt.in/api/verify",
        formValid
      );
      console.log(response.data);
      toast.success('Email verified successfully')
      setTimeout(() => {
        window.location.href="/"
      }, 1200);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        toast.error('Please provide email and otp')
      }
      else if(error.response && error.response.status === 401){
        toast.error('Invalid OTP')

      }
    }
  };
  const handleResendOTP =async (e) => {
  
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api.dgmt.in/api/resend-otp",
        ResendOtp
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        toast.error('Email is already verified')
      }
 else{
  toast.error("Something went wrong, please try again")
 }
      setResendOtp('')
    }
  };

  return (
    <div className="w-full p-5 h-screen flex items-center justify-center">
      <div className="text-box p-5 flex flex-col items-center w-full max-w-[700px] glass">
        <div className="mb-5">
          <h1 className="text-left font-semibold text-3xl">
            Verify Your Email ID
            <hr className="w-4/5 my-2 border-t-4 border-green-500" />
          </h1>
        </div>
        <div className=" h-[300px] w-full p-10">
          <form className="flex flex-col items-center">
            <label className="mb-3 text-xl" htmlFor="otp">
              Enter OTP sent to{" "}
              <span className="font-bold uppercase text-blue-600 ">
                {formValid.email}
              </span>
            </label>
            <input
              type="text"
              name="otp"
              value={formValid.otp}
              onChange={handleInputChange}
              className="border-2 p-2 mb-5 text-xl"
              placeholder="Enter OTP"
            />

            <button
              onClick={handleVerifyUser}
              className="bg-blue-500 text-white py-2 px-4 rounded mb-5"
            >
              Verify OTP
            </button>

            <p className="text-sm mb-5">
              Didn't receive the OTP?{" "}
              <button
                onClick={handleResendOTP}
                className="text-blue-500 hover:underline"
              >
                Resend OTP
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
