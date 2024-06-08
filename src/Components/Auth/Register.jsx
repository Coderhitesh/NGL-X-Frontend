import React, { useEffect, useState } from 'react'
import './register.css'
import register from './register.png'
import axios from 'axios';
import toast from 'react-hot-toast';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

        const datasend = async (e) => {
            e.preventDefault()
            // console.log(formData)
            try {
                const response = await axios.post('https://nglx-cosmetic-backend-git-io.onrender.com/api/register',formData)
                console.log(response.data)
                toast.success("Registeration SuccessFull")
                window.location.href="/login"
            } catch (error) {
                console.log(error)
            }
        }
  return (
    <section className='register-section'>
      <div className="register-container">
        <div className="main-register-box">
            <div className="left-bg">
                <img src={register} alt="" />
            </div>
            <div className="register-form-main">
                <div className="heading">
                    <span>Register</span>
                </div>
                <form action="" onSubmit={datasend}>
                    <input type="text" name='name' onChange={handleChange} placeholder='Enter Your Name' />
                    <input type="email" name='email'  onChange={handleChange} placeholder='Enter Your Email' />
                    {/* <input type="text" placeholder='Enter Your Phone No.' /> */}
                    <input type="password" name='password'  onChange={handleChange} placeholder='Enter Your Password' />
                    <div className="button-box">
                        <button type='submit' className='btn-grad'>Register</button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Register
