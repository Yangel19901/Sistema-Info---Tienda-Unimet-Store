import {
  faCommentDots,
  faTag,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import Warning from "./Warning";
import Approve from "./Approve";
import "./CreateMenu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonLink from "./ButtonLink";
import { validateMenu } from "../Hooks/Menus";

export default function CreateMenu() {
  const [warning, setWarning] = useState();
  const [approve, setApprove] = useState();

  const [descriptionError, setDescriptionError] = useState("input-field-menu");
  const [priceError, setPriceError] = useState("input-field-menu");
  const [nameError, setNameError] = useState("input-field-menu");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    available: true,
  });

  const handleChangeFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {

    const menuReturn = await validateMenu(formData);
    console.log(menuReturn);
    //Validacion

    if (!menuReturn[0]) {
      setApprove("");
      setWarning("Datos incorrectos");
      if (!menuReturn[1]) {
        setNameError("input-invalid-menu");
      } else {
        setNameError("input-field-menu");
      }
      if (!menuReturn[2]) {
        setPriceError("input-invalid-menu");
      } else {
        setPriceError("input-field-menu");
      }
      if (!menuReturn[3]) {
        setDescriptionError("input-invalid-menu");
      } else {
        setDescriptionError("input-field-menu");
      }
      if (!menuReturn[4]) {
        setWarning("El menú ya se encuenta registrado");
      }
    } else {
      setDescriptionError("input-field-menu");
      setPriceError("input-field-menu");
      setNameError("input-field-menu");
      setWarning("");
      setApprove("Menú registrado con éxito");

      setFormData(() => ({
        name: "",
        description: "",
        price: "",
        available: true,
      }));
    }
  };

  return (
    <div>
      <div className="input-group-menu">
        <div className={nameError}>
          <i>
            <FontAwesomeIcon icon={faUtensils} />
          </i>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.name.toLowerCase()}
            onChange={handleChangeFormData}
          />
        </div>

        <div className={descriptionError}>
          <i>
            <FontAwesomeIcon icon={faCommentDots} />
          </i>
          <input
            type="text"
            name="description"
            placeholder="Descripción"
            value={formData.description.toLowerCase()}
            onChange={handleChangeFormData}
          />
        </div>

        <div className={priceError}>
          <i>
            <FontAwesomeIcon icon={faTag} />
          </i>
          <input
            type="text"
            name="price"
            placeholder="Precio (USD)"
            value={formData.price.toLowerCase()}
            onChange={handleChangeFormData}
          />
        </div>
        <Warning text={warning} />
        <Approve text={approve} />
      </div>

      <div className="btn-submit-menu">
        <button
          id="submit"
          type="button"
          className="submit "
          onClick={handleSubmit}
        >
          Enviar
        </button>
      </div>
      <div className="btn-field-menu">
        <ButtonLink
          atributes={["return", "button", "return", "Regresar", "/adminhome"]}
        />
      </div>
    </div>
  );
}
