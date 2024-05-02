import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from "./App.jsx";
import "./index.css";
import '@fortawesome/fontawesome-free/css/all.css'

ReactDOM.createRoot(document.getElementById("root")).render(
    <GoogleOAuthProvider clientId="502914410725-joo959riskvf8pejqqa65irp2j5t6jad.apps.googleusercontent.com">
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
    </GoogleOAuthProvider>
);
