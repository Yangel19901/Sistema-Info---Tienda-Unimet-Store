import React from "react";
import "./Input.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Input({ atributes }) {
  return (
    <>
      <div className="input-field" id={atributes[0]}>
        <i className={atributes[1]}>
          <FontAwesomeIcon icon={atributes[2]} />
        </i>
        <input
          id={atributes[3]}
          type={atributes[4]}
          placeholder={atributes[5]}
        />
      </div>
    </>
  );
}
