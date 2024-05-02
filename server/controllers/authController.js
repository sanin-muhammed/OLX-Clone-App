const colors = require("colors");
const Users = require("../models/users");
const { sendMailFunction, generateOTP, sendOTPviaSMS } = require("../utils/email");
const { createJwtToken } = require("../middleware/auth");
require("dotenv").config();

let otpCache = {};

// @des:signup api
// method:post
// api:/api/signup

exports.post_signup = async (req, res) => {
    try {
        const { username, phoneNumber, email, password } = req.body;
        console.log("request =>", { username, phoneNumber, email, password });
        const newUser = new Users({ username, email, phoneNumber, password });
        await newUser.save();

        const otp = generateOTP();
        otpCache[phoneNumber] = otp; // Store OTP in cache
        console.log("otpCache =".bold, otpCache);
        console.log("otp =".bold, otp.yellow);

        // Send OTP via SMS
        sendOTPviaSMS(phoneNumber, otp);

        // console.log("signup successfull".yellow);
        res.status(200).json({ status: true });
    } catch (error) {
        if (error.name === "ValidationError") {
            // Handle validation errors
            res.status(400).json({ message: error.message });
        } else if (error.code === 11000) {
            // Handle duplicate key errors
            if (error.keyValue.email) {
                console.log("This email is already used".red);
                res.status(400).json({ message: "This email is already used" });
            } else if (error.keyValue.phoneNumber) {
                console.log("This phone number is already used".red);
                res.status(400).json({ message: "This phone number is already used" });
            } else {
                // If neither email nor phoneNumber is provided, send a generic error message
                console.log("Duplicate key error".red);
                res.status(400).json({ message: "Duplicate key error" });
            }
        } else {
            // Handle other errors
            console.log("error =>", { error });
            res.status(500).json({ error });
        }
    }
};

// @des:Login api
// method:post
// api:/api/login

exports.post_login = async (req, res) => {
    console.log(req.body);
    try {
        const { phoneNumber, password } = req.body;
        const userExist = await Users.findOne({ phoneNumber, password, verified: true }, { username: 1, email: 1, phoneNumber: 1 });
        console.log("user =", userExist);
        if (userExist) {
            console.log("User is Exist ".blue);

            const user = userExist.toObject();
            const Token = createJwtToken(user);
            console.log({ Token });

            res.status(200).json({ status: true, Token });
        } else {
            res.status(401).json({ message: "Invalid phone number or password" });
        }
    } catch (error) {}
};
// @des:verify otp api
// method:post
// api:/api/verify-otp

exports.verify_otp = async (req, res) => {
    const { otp, source } = req.body;
    console.log(" req body=", req.body);
    try {
        const userExist = await Users.findOne({ phoneNumber: source }, { username: 1, email: 1, phoneNumber: 1 });
        console.log({ userExist });
        if (userExist) {
            if (otpCache[source] == otp) {
                console.log("OTP is correct".blue);
                userExist.verified = true;
                userExist.save();
                const user = userExist.toObject();
                const Token = createJwtToken(user);
                console.log({ Token });
                console.log("OTP varification success".bold.blue);
                sendMailFunction(userExist.email);
                res.status(200).json({ status: true, Token });
            } else {
                console.log("OTP is incorrect".red);
                res.status(200).json({ status: false, message: "otp is incorrect" });
            }
        }
    } catch (error) {
        res.status(500);
        console.log("Internal Server error =", error);
    }
};
