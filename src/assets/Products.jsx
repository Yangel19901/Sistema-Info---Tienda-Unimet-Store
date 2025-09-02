import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { CartContext } from '../Context/CartContext';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'Menu');
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  return (
    <div className="products-page">
      <header className="products-header">
        <div className="logo-container">
          <img src="/images/tienditaLogo.png" alt="La Tiendita" className="logo" />
        </div>
      </header>
      <main className="products-container">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-info">
              <img src={product.imgSrc || '/images/defproduct.png'} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>Precio: {product.price}</p>
              <p>Descripción: {product.description}</p>
            </div>
            <button className="add-to-cart" onClick={() => addToCart(product)}>+</button>
          </div>
        ))}
      </main>
      <div className="button-container">
        <button className="back-button" onClick={() => navigate('/home')}>Volver</button>
        <button className="cart-button" onClick={() => navigate('/cart')}>Carrito</button>
      </div>
    </div>
  );
};

export default Products;
