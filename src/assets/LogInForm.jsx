import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import Warning from "./Warning";
import "./LogIn.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonLink from "./ButtonLink";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { dataBaseInfoLogInWithGoogle, validateEmail } from "../Hooks/User";
import { createUser, logOut } from "../Controllers/users";

export default function LogInForm() {
  const [warning, setWarning] = useState();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [authData, setAuthData] = useState({
    email: "",
    password: "",
    passwordvalidation: "",
  });

  const [formDataGoogle, setFormDataGoogle] = useState({
    name: "",
    lastname: "",
    phone: "",
    id: "",
    email: "",
    admin: false,
  });

  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function handleSubmit() {
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/home");
      })
      .catch(async (error) => {
        const a = await dataBaseInfoLogInWithGoogle(formData.email);
        if (a) {
          setWarning("Debes de iniciar sesion con Google");
        } else {
          setWarning("Credenciales no validas");
        }
      });
  }

  async function handleSubmitProviders() {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        if (!validateEmail(user.email)) {
          await logOut();
          setWarning(
            "Debes de utilizar un correo con un dominio válido de la organización"
          );
        } else {
          const a = await dataBaseInfoLogInWithGoogle(user.email);
          if (!a) {
            const email = user.email;
            setFormDataGoogle({
              name: "",
              lastname: "",
              phone: "",
              id: "",
              email: email,
              admin: false,
            });
            await createUser(formDataGoogle);
          }
          navigate("/home");
        }

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  return (
    <form>
      <div className="input-group">
        <div className="input-field">
          <i>
            <FontAwesomeIcon icon={faEnvelope} />
          </i>
          <input
            type="email"
            name="email"
            placeholder="Correo Electronico"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <i>
            <FontAwesomeIcon icon={faLock} />
          </i>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <Warning text={warning} />
      </div>
      <div className="btn-field">
        <ButtonLink
          atributes={["signUp", "button", "signUp", "Registrarse", "/SignUp"]}
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
      <div className="btn-separetor">
        <div className="btn-separetor-line"></div>
        <p className="btn-separetor-or">OR</p>
        <div className="btn-separetor-line"></div>
      </div>
      <div className="btn-submit">
        <button
          type="button"
          className="login-with-google-btn"
          onClick={handleSubmitProviders}
        >
          Sign in with Google
        </button>
      </div>
    </form>
  );
}
