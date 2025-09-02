import React from "react";
import "../assets/Warning.css";

export default function Approve({text}) {
  return (
    <>
      <div className="approve-container">
        <p id="approve"> {text} </p>
      </div>
    </>
  );
}
