import logo from "../assets/OLX-Symbol.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faComment } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
const Header = () => {
    const navigate = useNavigate();

    const [location, setLocation] = useState("kerala");
    const [currentUser, setCurrentUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleChange = (e)=>{
        setLocation(e.target.value)
    }


    const checkUser = async () => {
        const sessionToken = localStorage.getItem("token");
        console.log({ sessionToken });
        if (sessionToken) {
            const decodedToken = jwtDecode(sessionToken);
            console.log("Decoded token:", decodedToken);
            setCurrentUser(decodedToken.username);
        } else {
            navigate("/login");
        }
    };
    const removeSession = () => {
        localStorage.removeItem("token");
        checkUser();
    };

    useEffect(() => {
        checkUser();
    }, []);

    return (
        <header>
            <div className="navbar">
                <img src={logo} alt="" />
                <div className="location_box">
                    <span>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </span>
                    <input type="search" value={location} onChange={handleChange} />
                </div>
                <div className="search_box">
                    <input type="search" placeholder="Find Cars, Mobile Phones nad more..." />
                    <span>
                        <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "white" }} />
                    </span>
                </div>
                <h4 className="language_div">ENGLISH</h4>
                <span className="icons">
                    <FontAwesomeIcon icon={faComment} />
                </span>
                <span className="icons">
                    <FontAwesomeIcon icon={faBell} />
                </span>
                <div className="user_div">
                    <p className="user" onClick={toggleDropdown}>
                        {currentUser && currentUser.charAt(0)}
                    </p>
                    {dropdownOpen && (
                        <div className="dropdown">
                            <div className="dropdown_header">
                                <span>{currentUser && currentUser.charAt(0)}</span>
                                <p className="username">{currentUser}</p>
                            </div>
                            <p className="logout" onClick={removeSession}>
                                Logout
                            </p>
                        </div>
                    )}
                </div>
                <button className="nav_btn" onClick={() => navigate("/add-product")}>
                    + SELL
                </button>
            </div>
            <div className="bottom_bar">
                <h4>ALL CATAGORIES</h4>
                <a href="#">Cars</a>
                <a href="#">Motorcycles</a>
                <a href="#">Mobile Phones</a>
                <a href="#">For Sale: Houses & Apartments</a>
                <a href="#">Scooters</a>
                <a href="#">Commercial & Other Vehicles</a>
                <a href="#">For Rent: Houses & Apartments</a>
            </div>
        </header>
    );
};

export default Header;
