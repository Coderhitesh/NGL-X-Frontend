import "./login.css";
import bg from "./WhatsApp Image 2024-01-18 at 15.33.52_7543a4d2.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";

const Login = () => {
  // const navigate = useNavigate(); // Uncommented and used
  const [loading, setLoading] = useState(false); // Corrected initialization
  const [formdata, setFormdata] = useState({ email: "", password: "" });
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when login starts
    console.log(formdata);
    try {
      const response = await axios.post(
        "http://localhost:4100/api/login",
        formdata
      );
      toast.success("Login Successful");
      const loginToken = response.data.token;
      sessionStorage.setItem('token', loginToken);
      sessionStorage.setItem("login", true);
      sessionStorage.setItem("userid", response.data.user._id);
      navigate('/');
    } catch (error) {
      // console.error(error);
      // console.log(error.response.data.error)
      toast.error('Login Failed');
    } finally {
      setLoading(false); // Set loading to false when login finishes
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
              <form action="" onSubmit={handleLogin}>
                <input
                  className="focus:ring-green-500"
                  name="email"
                  value={formdata.email}
                  onChange={handleInputChange}
                  type="email"
                  placeholder="Enter Your Email"
                />

                <input
                  className="focus:ring-violet-300 "
                  type="password"
                  name="password"
                  onChange={handleInputChange}
                  value={formdata.password}
                  placeholder="Enter Your Password"
                  id=""
                />
                <div className="button-box">
                  <div className="up-btn">
                    <button className="btn-grad" type="submit" disabled={loading}>
                      {loading ? "Loading..." : "LOGIN"}
                    </button>
                    <Link to={'/forget-password'} className="btn-grad">FORGET-PASSWORD</Link>
                  </div>
                  <hr />
                  <div className="down-link">
                    <span>Don't have an account?</span>
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
