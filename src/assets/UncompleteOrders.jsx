import { useState } from "react";
import { useUncompleteOrders } from "../Hooks/Orders";
import "../assets/HistoryOrders.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { createOrder } from "../Controllers/order";
import NestedMaps from "./NestedMaps";


export default function UncompleteOrders() {
  const { data, isLoading } = useUncompleteOrders();

  const [products, setProducts] = useState(null);

  const completeOrder = async (value) => {
    value.complete = true;
    await createOrder(value);
  };

  const handleLoad = async (value) => {
    setProducts(value.products);
    console.log(products);
  };

  return isLoading ? (
    <div>Cargando</div>
  ) : (
    <>
      <div className="Table-History-Order-Container">
        <table className="Table-History-Order">
          <thead className="table-th">
            <tr>
              <th>Numero de orden</th>
              <th>Total (USD)</th>
              <th>Usuario</th>
              <th>Productos</th>
              <th>Direccion</th>
              <th>Estado de la orden</th>
              <th>Completar</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {data.map((d) => (
              <tr key={d.orderNumber} className="table-rows">
                <td>{d.orderNumber}</td>
                <td>{d.total}</td>
                <td>{d.user}</td>
                <td>
                  <NestedMaps products = {d.products} />
                </td>
                <td>{d.direction}</td>
                <td>{d.complete ? "Entregada" : "En proceso"}</td>
                <td>
                  <button
                    onClick={() => completeOrder(d)}
                    className="btn-complete-order"
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
