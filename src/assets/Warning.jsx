import React from "react";
import "../assets/Warning.css";

export default function Warning({text}) {
  return (
    <>
      <div className="warning-container">
        <p id="warning"> {text} </p>
      </div>
    </>
  );
}
