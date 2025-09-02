import React from "react";
import "../assets/SlideCardMenuAdmin.css";
import "../assets/TableOrder.css";
import SlideCardMenuAdmin from "../assets/SlideCardMenuAdmin";
import HistoryOrders from "../assets/HistoryOrders";
import UncompleteOrders from "../assets/UncompleteOrders";

export default function AdminLandPage() {
  return (
    <>
      <div className="menu-bar-container">
        <div className="title-menu-bar">Menu</div>
        <div className="title-menu-line"></div>
        <SlideCardMenuAdmin />
      </div>
      <div className="grid-admin-orders">
        <div className="order-table-list-container">
          <div className="title-menu-bar">Órdenes Completadas</div>
          <div className="title-menu-line"></div>
          <HistoryOrders />
        </div>
        <div className="order-table-list-container">
          <div className="title-menu-bar">Órdenes Pendientes</div>
          <div className="title-menu-line"></div>
          <UncompleteOrders />
        </div>
      </div>
    </>
  );
}
