import React from "react";
import "../assets/LogIn.css";

import LogInForm from "../assets/LogInForm"


export default function LogIn() {
  return (
    <>
      <div className="container-form">
        <div className="form-content">
          <h1 id="title">Iniciar Sesión</h1>
          <LogInForm/>
        </div>
      </div>
    </>
  );
}
