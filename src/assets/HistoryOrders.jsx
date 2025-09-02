import { useState } from "react";
import { useAllOrders, useCompleteOrders } from "../Hooks/Orders";
import "../assets/HistoryOrders.css";
import NestedMaps from "./NestedMaps";

export default function HistoryOrders() {
  const { data, isLoading } = useCompleteOrders();

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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
