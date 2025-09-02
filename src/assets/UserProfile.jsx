import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import './UserProfile.css';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../Controllers/users';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchUserData(currentUser.email);
        const user = await getUser(currentUser.email);
        setUserData(user);
      } else {
        setUser(null);
        setUserData(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const fetchUserData = async (email) => {
    const user = getUser(email);
    setUserData(user);
  };

  const handleSignOut = () => {
    auth.signOut();
    navigate('/');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-title">
          <h2>Mi perfil</h2>
        </div>
        <div className="university-logo">
          <img src="/images/UnimetLogo.png" alt="Universidad Metropolitana" />
        </div>
      </div>
      <div className="profile-content">
        <div className="profile-info">
          <div className="profile-picture">
            <img src={user.photoURL || "/images/avatar.webp"} alt="Profile" />
          </div>
          <div className="profile-details">
            <h3>{userData ? `${userData.name} ${userData.lastname}` : 'Usuario'}</h3>
            <p>Correo: {user.email}</p>
            <p>Teléfono: {userData?.phone || 'N/A'}</p>
            <p>Carnet: {userData?.id || 'N/A'}</p>
          </div>
        </div>
        <div className="profile-actions">
          <button className="action-button" onClick={() => navigate('/EditProfile')}>Editar perfil</button>
          <button className="action-button logout" onClick={handleSignOut}>Cerrar sesión</button>
        </div>
      </div>
      <button className="back-button" onClick={() => navigate('/home')}>Volver</button>
    </div>
  );
};

export default UserProfile;

