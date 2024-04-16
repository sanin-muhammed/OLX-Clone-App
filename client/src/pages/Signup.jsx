import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/OLX-Symbol.png";
import "./style.css";
import { post_signup, verify_otp } from "../Actions/action";

const Signup = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState(false);

    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phoneNumber: "",
        password: "",
    });
    const [otpData, setOtpData] = useState({
        source: "",
        otp:"",
        
    });
    const handleChange = (e) => {
        e.target.classList.remove("border_red");
        setMessage("");
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("form data = ", formData);
        const { username, phoneNumber, email, password } = formData;
        if (!username) {
            setMessage("Enter username");
            return;
        } else if (!email) {
            setMessage("Enter email");
            return;
        } else if (!phoneNumber) {
            setMessage("Enter phone number");
            return;
        } else if (!password) {
            setMessage("Enter password");
            return;
        }

        // Send formData to your backend
        const response = await post_signup(formData);
        console.log("response = ", response);
        if (response.message) {
            setMessage(response.message);
        }
        if (response.status) {
            setStatus(true)
            setOtpData({ ...otpData, source: phoneNumber });
            // navigate("/");
        }
    };
    const handleOtpChange = (e) => {
        setMessage("")
        const {  name,value } = e.target;
        setOtpData({...otpData,[name]:value})
    };

    const handleOtp =async (e) => {
        e.preventDefault();
        console.log(otpData);
        const {otp} = otpData
        if (!otp) {
            setMessage("Enter otp");
            return;
        }
        // Send otpData to backend
        const response = await verify_otp(otpData);
        console.log("response =>", response);
        if (response.Token) {
            localStorage.setItem('token', response.Token);
            navigate('/')
        } else {
            setMessage(response.message);
        }
    };
    const handleBlur = (e) => {
        if (!e.target.value) {
            e.target.classList.add("border_red");
        }
    };

    return (
        <div className="signup_container">
            {status ? (
                <div className="signup_box">
                    <img src={logo} alt="logo" />
                    <h3>Enter OTP</h3>
                    <div className={message ? "alert" : "no_alert"}>{message}</div>
                    <form onSubmit={handleOtp}>
                        <input type="number" name="otp" onChange={handleOtpChange} value={otpData.otp} placeholder="OTP" />
                        <button type="submit">Login</button>
                    </form>
                </div>
            ) : (
            <div className="signup_box">
                <img src={logo} alt="" />
                <h3>Create your Account</h3>
                <div className={message ? "alert" : "no_alert"}>{message}</div>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" onChange={handleChange} value={formData.username} placeholder="Username" onBlur={handleBlur} />
                    <input type="email" name="email" onChange={handleChange} value={formData.email} placeholder="Email" onBlur={handleBlur} />
                    <input type="number" name="phoneNumber" onChange={handleChange} value={formData.phoneNumber} placeholder="Phone number" onBlur={handleBlur} />
                    <input type="password" name="password" onChange={handleChange} value={formData.password} placeholder="Password" onBlur={handleBlur} />
                    <button type="submit">Create</button>
                </form>
                <p>
                    Already have an Account?<Link to="/login"> Login</Link>
                </p>
            </div>
            )}
        </div>
    );
};

export default Signup;
