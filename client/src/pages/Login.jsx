import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import logo from "../assets/OLX-Symbol.png";
import "./style.css";
import { decodeIdToken, post_login } from "../Actions/action";

const Login = () => {
    const navigate = useNavigate();
    // const [status, setStatus] = useState(false);
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        phoneNumber: "",
        password: "",
    });

    // google login

    const responseMessage = async (response) => {
        const { credential, clientId } = response;
        console.log(response);

        const user = await decodeIdToken(credential);
        console.log({ user });

        // Send formData to your backend
        const formData = new FormData();
        
        

    };
    const errorMessage = (error) => {
        console.log(error);
    };

    const handleChange = (e) => {
        e.target.classList.remove("border_red");
        setMessage("");
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("form data = ", formData);
        const { phoneNumber, password } = formData;
        if (!phoneNumber) {
            setMessage("Enter phoneNumber ");
            return;
        } else if (!password) {
            setMessage("Enter password");
            return;
        }

        // Send formData to backend
        const response = await post_login(formData);
        console.log("response = ", response);
        if (response.message) {
            console.log("message");
            setMessage(response.message);
        }
        if (response.status) {
            navigate("/");
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
            <div className="signup_box">
                <img src={logo} alt="logo" />
                <h3>Enter Phone Number and Password</h3>
                <div className={message ? "alert" : "no_alert"}>{message}</div>
                <form onSubmit={handleSubmit}>
                    <input className="sanin" type="text" name="phoneNumber" onChange={handleChange} value={formData.phoneNumber} placeholder="Phone Number" onBlur={handleBlur} />
                    <input type="password" name="password" onChange={handleChange} value={formData.password} placeholder="Password" onBlur={handleBlur} />
                    <button type="submit">Login</button>
                </form>
                <p>
                    <Link to="/signup">Create an Account</Link>
                </p>
                <div>
                    <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
                </div>
            </div>
        </div>
    );
};

export default Login;
