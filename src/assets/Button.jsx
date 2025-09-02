import React from "react";
import "./Button.css";

export default function Button({ atributes }) {
  return (
    <>
        <button id={atributes[0]} type={atributes[1]} className={atributes[2]}>
          {atributes[3]}
        </button>
    </>
  );
}
