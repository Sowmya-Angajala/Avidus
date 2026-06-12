
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import {
 AuthProvider
}
from "./context/AuthContext";

import "./styles/global.css";
import { ToastProvider } from "./context/ToastContext";

ReactDOM.createRoot(
 document.getElementById("root")
).render(

 <AuthProvider>
    <ToastProvider>
  <App/>

    </ToastProvider>
 </AuthProvider>

);
