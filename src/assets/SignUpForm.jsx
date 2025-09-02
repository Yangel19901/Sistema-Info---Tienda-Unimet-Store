import {
  faEnvelope,
  faIdCard,
  faLock,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import Warning from "./Warning";
import Approve from "./Approve";
import "./LogIn.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonLink from "./ButtonLink";
import { dataBaseInfoLogInWithGoogle, validateUser } from "../Hooks/User";

export default function SignUpForm() {
  const [warning, setWarning] = useState();
  const [approve, setApprove] = useState();

  const [emailError, setEmailError] = useState("input-field");
  const [idError, setIdError] = useState("input-field");
  const [nameError, setNameError] = useState("input-field");
  const [lastNameError, setLastNameError] = useState("input-field");
  const [phoneError, setPhoneError] = useState("input-field");
  const [passErrorV, setPassErrorV] = useState("input-field");
  const [passError, setPassError] = useState("input-field");

  const [authData, setAuthData] = useState({
    email: "",
    password: "",
    passwordvalidation: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    phone: "",
    id: "",
    email: "",
    admin: false,
  });

  const handleChangeFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeAuthData = (e) => {
    const { name, value } = e.target;
    setAuthData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const registerReturn = await validateUser(formData, authData);

    if (!registerReturn[0]) {
      setWarning("Credenciales no válidas");
      if (!registerReturn[1] || !registerReturn[2]) {
        setEmailError("input-invalid");
        const a = await dataBaseInfoLogInWithGoogle(formData.email);
        console.log(a);
        if (a) {
          setWarning("Ya se encuenta registrado con el proveedor de Servicios: Google");
        }
      } else {
        setEmailError("input-field");
      }
      if (!registerReturn[3] || !registerReturn[4]) {
        setIdError("input-invalid");
      } else {
        setIdError("input-field");
      }
      if (!registerReturn[5]) {
        setNameError("input-invalid");
      } else {
        setNameError("input-field");
      }
      if (!registerReturn[6]) {
        setLastNameError("input-invalid");
      } else {
        setLastNameError("input-field");
      }
      if (!registerReturn[7]) {
        setPhoneError("input-invalid");
      } else {
        setPhoneError("input-field");
      }
      if (!registerReturn[9]) {
        setPassErrorV("input-invalid");
        setPassError("input-invalid");
        setWarning("Las contraseñas deben de coincidir");
      } else if (!registerReturn[8]) {
        setPassErrorV("input-invalid");
        setPassError("input-invalid");
        alert(
          "La contraseña debe de contener: \n-1 letra mayúscula \n-1 letra minúscula \n-1 número \n-8 caracteres como mínimo"
        );
      } else {
        setPassErrorV("input-field");
        setPassError("input-field");
      }
      setApprove("");
    } else {
      setEmailError("input-field");
      setIdError("input-field");
      setNameError("input-field");
      setLastNameError("input-field");
      setPhoneError("input-field");
      setPassErrorV("input-field");
      setPassError("input-field");
      setWarning("");
      setApprove("Usuario registrado con éxito");

      setAuthData(() => ({
        email: "",
        password: "",
        passwordvalidation: "",
      }));

      setFormData(() => ({
        name: "",
        lastname: "",
        phone: "",
        id: "",
        email: "",
        admin: false,
      }));
    }
  };

  return (
    <div>
      <div className="input-group">
        <div className={nameError}>
          <i>
            <FontAwesomeIcon icon={faUser} />
          </i>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChangeFormData}
          />
        </div>

        <div className={lastNameError}>
          <i>
            <FontAwesomeIcon icon={faUser} />
          </i>
          <input
            type="text"
            name="lastname"
            placeholder="Apellido"
            value={formData.lastname}
            onChange={handleChangeFormData}
          />
        </div>

        <div className={phoneError}>
          <i>
            <FontAwesomeIcon icon={faPhone} />
          </i>
          <input
            type="text"
            name="phone"
            placeholder="Teléfono"
            value={formData.phone}
            onChange={handleChangeFormData}
          />
        </div>

        <div className={idError}>
          <i>
            <FontAwesomeIcon icon={faIdCard} />
          </i>
          <input
            type="text"
            name="id"
            placeholder="Carnet"
            value={formData.id}
            onChange={handleChangeFormData}
          />
        </div>

        <div className={emailError}>
          <i>
            <FontAwesomeIcon icon={faEnvelope} />
          </i>
          <input
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            value={authData.email}
            onChange={handleChangeAuthData}
          />
        </div>

        <div className={passError}>
          <i>
            <FontAwesomeIcon icon={faLock} />
          </i>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={authData.password}
            onChange={handleChangeAuthData}
          />
        </div>

        <div className={passErrorV}>
          <i>
            <FontAwesomeIcon icon={faLock} />
          </i>
          <input
            type="password"
            name="passwordvalidation"
            placeholder="Confirmar Contraseña"
            value={authData.passwordvalidation}
            onChange={handleChangeAuthData}
          />
        </div>
        <Warning text={warning} />
        <Approve text={approve} />
      </div>
      <div className="btn-field">
        <ButtonLink
          atributes={["LogIn", "button", "LogIn", "Iniciar Sesión", "/"]}
        />
      </div>
      <div className="btn-submit">
        <button
          id="submit"
          type="button"
          className="submit "
          onClick={handleSubmit}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
