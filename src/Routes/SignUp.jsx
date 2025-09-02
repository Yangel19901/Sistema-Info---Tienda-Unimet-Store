import React from "react";
import "../assets/LogIn.css";
import "../assets/Input.css"
import SignUpForm from "../assets/SignUpForm";

export default function SignUp() {
  return (
    <>
      <div className="container-form">
        <div className="form-content">
          <h1 id="title">Registrarse</h1>
          <SignUpForm/>
        </div>
      </div>
    </>
  );
}
