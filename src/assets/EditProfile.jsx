import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import './EditProfile.css';

const EditProfile = () => {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [id, setId] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'users', user.email);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setName(userData.name || '');
          setLastname(userData.lastname || '');
          setId(userData.id || '');
          setPhone(userData.phone || '');
        } else {
          console.error('User document does not exist');
        }
      } else {
        console.error('User is not authenticated');
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with:", { name, lastname, id, phone });
    const user = auth.currentUser;
    if (user) {
      try {
        const userDocRef = doc(db, 'users', user.email);
        await updateDoc(userDocRef, {
          name,
          lastname,
          id,
          phone,
        });
        console.log("Document updated");
        navigate('/UserProfile'); // Redirige de nuevo al perfil del usuario
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    } else {
      console.error('User is not authenticated');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-profile-page-container">
      <form onSubmit={handleSubmit} className="edit-profile-form">
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Apellido:</label>
          <input
            type="text"
            id="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="id">Carnet:</label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Teléfono:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditProfile;
