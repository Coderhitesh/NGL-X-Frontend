import "./login.css";
import bg from "./WhatsApp Image 2024-01-18 at 15.33.52_7543a4d2.jpg";
import { Link , useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
const Login = () => {
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({ email: "", password: "" });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformdata({ ...formdata, [name]: value });
  };
  useEffect(()=>{
    window.scrollTo({
      top : 0,
      behavior : "smooth"
    })
  },[])
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(formdata)
    try {
      const response = await axios.post(
        "https://nglx-cosmetic-backend-git-io.onrender.com/api/login",
        formdata
      );
      toast.success("Login SuccessFull");
      const LoginToken = response.data.token;
      sessionStorage.setItem('token', LoginToken);
      sessionStorage.setItem("login", true)
      sessionStorage.setItem("userid", response.data.user._id)
      navigate('/Shop-All')
    } catch (error) {
      // console.error(error);

      // console.log(error.response.data.error)
      toast.error(error.response.data.error);
    }
  };
  return (
    <>
      <div className="login-container">
        <div className="container">
          <div className="main-login-box">
            <div className="login-form-main">
              <div className="heading">
                <span>Welcome Back</span>
              </div>
              <form action="" onSubmit={handleLogin} >
                <input
                  className="focus:ring-green-500"
                  name="email"
                  value={formdata.Email}
                  onChange={handleInputChange}
                  type="email"
                  placeholder="Enter Your Email"
                />

                <input
                  className="focus:ring-violet-300 "
                  type="password"
                  name="password"
                  onChange={handleInputChange}
                  value={formdata.Password}
                  placeholder="Enter Your Password"
                  id=""
                />
                <div className="button-box">
                  <div className="up-btn">
                    <button className="btn-grad"  >LOGIN</button>
                    {/* <button className="btn-grad">FORGET-PASSWORD</button> */}
                  </div>
                  <hr />
                  <div className="down-link">
                    <span>Dont have an account ?</span>

                    <Link to="/register">Register</Link>
                  </div>
                </div>
              </form>
            </div>

            <div className="right-bg">
              <img src={bg} alt="login-bg" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
