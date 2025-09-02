import React from "react";
import "../assets/CreateMenu.css";

import CreateMenuForm from "../assets/CreateMenu"


export default function CreateMenu() {
  return (
    <>
      <div className="container-form-menu">
        <div className="form-content-menu">
          <h1 id="title">Crear Menú</h1>
          <CreateMenuForm/>
        </div>
      </div>
    </>
  );
}
