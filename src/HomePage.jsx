import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from '@fortawesome/free-solid-svg-icons';


const HomePage = () => {
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        document.querySelector('#scroll-top').classList.add('active');
      } else {
        document.querySelector('#scroll-top').classList.remove('active');
      }
    };

    const loader = () => {
      const loaderContainer = document.querySelector('.loader-container');
      if (loaderContainer) {
        loaderContainer.classList.add('fade-out');
      }
    };

    const fadeOut = () => {
      setTimeout(loader, 1000); 
    };

    window.addEventListener('scroll', handleScroll);
    fadeOut();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <header>
        <div className="logo">
          <a href="https://www.unimet.edu.ve/">
            <img src="/images/UnimetLogo.png" alt="foto unimet" style={{ transform: 'scale(0.6)' }} className="unimet" />
          </a>
          <img src="/images/tienditaLogo.png" alt="foto de la tiendita" className="latiendita" />
        </div>
        <FontAwesomeIcon id="menu-bar" className="fas fa-bars" icon={faBars} />
        <nav className="navbar">
          <Link to="/UserProfile">Ver Perfil</Link>
          <a href="#speciality">Conócenos</a>
          <Link to="/Productos">Productos</Link>
          <Link to="/Cart"><button className="btn0">Carrito</button></Link>
        </nav>
      </header>
      <section className="home" id="home">
        <div className="image"></div>
      </section>
      <section className="speciality" id="speciality">
        <h1 className="heading">Que caracteriza a la <span>Tiendita?</span> </h1>
        <div className="box-container">
          <div className="box">
            <img className="image" src="/images/lugarfavorito.jpeg" alt="foto de los espacio de la tiendita" />
            <div className="content">
              <h3>Tu lugar favorito para desayunar</h3>
              <p><span>¿No te ha pasado que buscas un lugar para desayunar tranquilo después de tu clase, donde puedas estar tú con tu desayuno o tus amigos, simplemente disfrutando el tiempo libre antes de entrar a clases? La tiendita, con sus increíbles espacios, te lo garantiza.</span> </p>
            </div>
          </div>
          <div className="box">
            <img className="image" src="/images/confort.jpeg" alt="foto de los espacios de la tiendita 2" />
            <div className="content">
              <h3>Zona de comfort</h3>
              <p><span>A veces, lo único que necesitas es sentarte y disfrutar de nuestros espacios. No solo comerás de manera increíble, sino que también tendrás esos momentos en los que puedes sentir que el trimestre te suelta el brazo.</span> </p>
            </div>
          </div>
          <div className="box">
            <img className="image" src="/images/servicio.jpeg" alt="empleada de la tiendita" />
            <div className="content">
              <h3>El mejor servicio</h3>
              <p><span>Nuestra prioridad siempre ha sido tener a nuestros clientes por delante, cumplir sus pedidos de la forma mas eficiente y especial.</span></p>
            </div>
          </div>
          <div className="box">
            <img className="image" src="/images/Unimet-tiendita.jpeg" alt="foto de la tiendita" />
            <div className="content">
              <h3>Unimet = Latiendita</h3>
              <p><span>La Tiendita es una de las tiendas más significativas de la Universidad Metropolitana, donde hemos crecido hasta tener diversas sedes dentro del campus.</span></p>
            </div>
          </div>
          <div className="box">
            <img className="image" src="/images/calidad.jpeg" alt="foto de calidad" />
            <div className="content">
              <h3>La mejor calidad</h3>
              <p><span>En el corazón de nuestra vida universitaria se encuentra un lugar que no solo sirve comida y bebida, sino que también ofrece calidad y excelencia: nuestra cafetería universitaria. desde la mejor calidad de los ingredientes hasta la preparación de los mismos.</span></p>
            </div>
          </div>
          <div className="box">
            <img className="image" src="/images/mejor prodcutos.jpeg" alt="cafes de la tiendita" />
            <div className="content">
              <h3>Los mejores sabores</h3>
              <p><span>Desde nuestros cafés, hasta nuestros pastelitos, tenemos una trayectoria de calidad en nuestros productos, para darle la mejor experiencia a nuestros clientes.</span></p>
            </div>
          </div>
        </div>
      </section>
      <section className="popular" id="popular">
        <h1 className="heading">Nuestros <span>mejores</span> productos</h1>
        <div className="box-container">
          <div className="box">
            <span className="price"> $1.50 </span>
            <img src="/images/pastelitos.jpg" alt="pastelito" />
            <h3>Pastelitos</h3>
            <a href="#order" className="btn">Ordena</a>
          </div>
          <div className="box">
            <span className="price"> $2.00 </span>
            <img src="/images/cafe.jpg" alt="cafe" />
            <h3>Cafe mediano</h3>
            <a href="#order" className="btn">Ordena</a>
          </div>
          <div className="box">
            <span className="price"> $1.20 </span>
            <img src="/images/nestea.jpg" alt="nestea" />
            <h3>Nestea</h3>
            <a href="#order" className="btn">Ordena</a>
          </div>
          <div className="box">
            <span className="price"> $2.50 </span>
            <img src="/images/Tequenos-.jpg" alt="tequenos" />
            <h3>Tequeños</h3>
            <a href="#order" className="btn">Ordena</a>
          </div>
          <div className="box">
            <span className="price"> $1.80 </span>
            <img src="/images/doritos.jpg" alt="doritos" />
            <h3>Doritos</h3>
            <a href="#order" className="btn">Ordena</a>
          </div>
          <div className="box">
            <span className="price"> $3.00 </span>
            <img src="/images/torta.jpg" alt="torta" />
            <h3>Pedazo de torta</h3>
            <a href="#order" className="btn">Ordena</a>
          </div>
        </div>
      </section>
      <section className="footer">
        <div className="container">
          <div className="footer-content">
            <h3>Contactanos</h3>
            <ul className='contacto'>
              <li>Email: tiendita.unimetana@unimet.edu.ve</li>
              <li>Telefono: +58-4122351319</li>
              <li>Direccion: Ditribuidor metropolitano Caracas, 1060, Miranda</li>
            </ul>
          </div>
          <div className="footer-content">
            <h3>Siguenos</h3>
            <ul className="social-icons">
            </ul>
          </div>
        </div>
        <p className="copyright">TienditaUnimetana © 2024</p>
      </section>
      <div className="loader-container">
        <img src="/images/tienditagif.gif" alt="loader" />
      </div>
    </div>
  );
};

export default HomePage;
