import { faLock, faLockOpen, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../assets/SlideCardMenuAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { changeAvaileble, deleteMenuFirebase } from "../Controllers/menu";
import { useState } from "react";

export default function MenuCard({ d }) {

  const [seed, setSeed] = useState(0);

  const deleteByValue = async (value) => {
    deleteMenuFirebase(value);
  };

  const changeState = async (value) => {
    const a = !value.available;
    value.available = a;
    await changeAvaileble(value);
    setSeed(seed+1)
  };

  return (
    <div className="Card-individual-container">
      <div className="Card-img-container">//imagen</div>
      <div className="Card-name-container">
        <p>{d.name}</p>
      </div>
      <div className="Card-description-container">
        <p>{d.description}</p>
      </div>
      <div className="Card-price-container">
        <p>{d.price} USD</p>
      </div>
      <div className="btn-card-settings">
        <button className="Card-price-container-btn-pencil">
          <FontAwesomeIcon icon={faPencil} />
        </button>
        <button
          onClick={() => deleteByValue(d.id)}
          className="Card-price-container-btn-trash"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>

        <button key = {seed}
          onClick={() => changeState(d)}
          className= {d.available ? "Card-price-container-btn-available" : "Card-price-container-btn-trash"}
        >
          <FontAwesomeIcon icon={d.available ? faLockOpen : faLock} />
        </button>
      </div>
    </div>
  );
}
