"use client";

import { useState } from 'react';

export default function Home() {
  const [nom, setNom] = useState('');
  const [categorie, setCategorie] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Etat pour afficher la modale

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifier si les champs sont remplis
    if (!nom || !categorie) {
      setMessage('Veuillez remplir tous les champs.');
      return;
    }

    setLoading(true);
    setMessage('');  // Réinitialiser le message

    const res = await fetch('http://localhost:1337/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nom, categorie }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setMessage(`Voici votre film : ${data.film.nom}, catégorie : ${data.film.categorie}`);
      setNom('');
      setCategorie('');
      setIsModalOpen(true); // Ouvrir la modale après la soumission réussie
    } else {
      setMessage('Erreur lors de l\'ajout du film');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Fermer la modale
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h1 style={styles.heading}>Ajouter un film</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Nom du film"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Catégorie"
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.submitButton} disabled={loading}>
            {loading ? 'Chargement...' : 'Valider'}
          </button>
        </form>

        {message && (
          <p style={styles.message}>{message}</p>
        )}
      </div>

      {/* Modale pour afficher le message de succès */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2 style={styles.modalHeading}>Film ajouté avec succès!</h2>
            <p>{message}</p>
            <button onClick={closeModal} style={styles.closeButton}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
  },
  formWrapper: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '500px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '1rem',
  },
  input: {
    padding: '0.8rem',
    borderRadius: '8px',
    border: '1px solid #f44336',  // Rouge pour le contour des champs
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s',
    marginBottom: '1rem',
  },
  submitButton: {
    padding: '0.8rem',
    backgroundColor: '#f44336',  // Rouge pour le bouton
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  message: {
    marginTop: '1rem',
    color: 'green',
    fontSize: '1rem',
  },
  // Style de la modale
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Fond semi-transparent
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '300px',
    textAlign: 'center',
  },
  modalHeading: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '1rem',
  },
  closeButton: {
    padding: '0.8rem',
    backgroundColor: '#f44336',  // Rouge pour le bouton
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '1rem',
  },
};
