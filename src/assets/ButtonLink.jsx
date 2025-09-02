import React from "react";
import "../assets/Button.css";
import { Link } from "react-router-dom";
import Button from "./Button";

export default function ButtonLink({ atributes }) {
  return (
    <>
      <Link to={atributes[4]}>
        <Button atributes={atributes}/>
      </Link>
    </>
  );
}
