import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="custom-container mt-4">
      <h1 className="headline-1">Bienvenue sur notre site de location de voitures</h1>
      <p className="title-1">Découvrez notre sélection de véhicules</p>
      <Link to="/voitures" className="btn btn-primary">
        Voir notre catalogue de voitures
      </Link>
    </div>
  );
};

export default Home;
