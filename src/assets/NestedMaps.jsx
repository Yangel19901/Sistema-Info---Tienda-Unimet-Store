import { useState } from "react";
import { useUncompleteOrders } from "../Hooks/Orders";
import "../assets/HistoryOrders.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { createOrder } from "../Controllers/order";

export default function NestedMaps(products) {
  return (
    <>
      {products.products.map((d) => (
        <p>{d}</p>
      ))}
    </>
  );
}
