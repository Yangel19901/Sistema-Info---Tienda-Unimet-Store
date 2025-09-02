import React, { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import './Cart.css';

const Cart = () => {
  const { cart, total, clearCart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleOrderSubmit = async () => {
    if (cart.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert('Debes estar autenticado para realizar una orden');
      return;
    }

    const orderNumber = new Date().getTime().toString(); // Genera un número de orden único basado en el timestamp

    const order = {
      products: cart.map(product => `${product.name} x${product.quantity || 1}`),
      total: total.toString(),
      user: user.email,
      direction: "Saman",
      complete: false,
      id: orderNumber,
      orderNumber: orderNumber
    };

    try {
      await addDoc(collection(db, 'Orders'), order);
      clearCart();
      navigate('/Productos');
      alert('Orden enviada exitosamente');
    } catch (error) {
      console.error("Error al enviar la orden: ", error);
      alert('Hubo un problema al enviar la orden');
    }
  };

  return (
    <div className="cart-page">
      <header className="cart-header">
        <h1>Carrito de Compras</h1>
      </header>
      <main className="cart-container">
        {cart.length > 0 ? (
          cart.map((product, index) => (
            <div key={index} className="cart-item">
              <img src={product.imgSrc || '/images/defproduct.png'} alt={product.name} className="cart-item-image" />
              <div className="cart-item-info">
                <h3>{product.name}</h3>
                <p>Precio: {product.price}</p>
                <p>Descripción: {product.description}</p>
                <p>Cantidad: {product.quantity || 1}</p>
                <button className="remove-button" onClick={() => removeFromCart(product)}>Eliminar</button>
              </div>
            </div>
          ))
        ) : (
          <p>El carrito está vacío</p>
        )}
      </main>
      <footer className="cart-footer">
        <h2>Total: ${total.toFixed(2)}</h2>
        <div className="button-container">
          <button className="back-button" onClick={() => navigate('/Productos')}>Volver a Productos</button>
          <button className="order-button" onClick={handleOrderSubmit}>Enviar Orden</button>
        </div>
      </footer>
    </div>
  );
};

export default Cart;