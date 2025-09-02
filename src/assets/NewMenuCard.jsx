import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import "../assets/SlideCardMenuAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function NewMenuCard() {
  return (
    <Link to="/createmenu">
      <div className="Card-individual-container">
        <div className="Card-CirclePlus-container">
          <FontAwesomeIcon icon={faCirclePlus} />
        </div>
        <div className="Card-price-container">
          <p>Crear un nuevo Menú</p>
        </div>
      </div>
    </Link>
  );
}
