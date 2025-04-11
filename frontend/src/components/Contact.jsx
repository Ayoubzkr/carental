import React from 'react';

const Contact = () => {
  return (
    <div className="custom-container mt-32">
      <h1 className="headline-1">Contactez-nous</h1>

      <div className="mt-8 grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <section>
            <h2 className="headline-2">Nos coordonnées</h2>
            <div className="text-zinc-300 mt-4 space-y-2">
              <p><strong>Adresse :</strong> 123 Avenue des Champs-Élysées, 75008 Paris</p>
              <p><strong>Téléphone :</strong> +33 1 23 45 67 89</p>
              <p><strong>Email :</strong> contact@luxurycarrental.com</p>
            </div>
          </section>

          <section>
            <h2 className="headline-2">Horaires d'ouverture</h2>
            <div className="text-zinc-300 mt-4 space-y-2">
              <p>Lundi - Vendredi : 9h00 - 19h00</p>
              <p>Samedi : 10h00 - 18h00</p>
              <p>Dimanche : Fermé</p>
            </div>
          </section>
        </div>

        <div className="bg-zinc-800 p-6 rounded-xl">
          <h2 className="headline-2">Formulaire de contact</h2>
          <form className="mt-4 space-y-4">
            <div>
              <label className="label">Nom complet</label>
              <input type="text" className="text-field" placeholder="Votre nom" />
            </div>
            <div>
              <label className="label">Email</label>
              <input type="email" className="text-field" placeholder="Votre email" />
            </div>
            <div>
              <label className="label">Sujet</label>
              <input type="text" className="text-field" placeholder="Sujet de votre message" />
            </div>
            <div>
              <label className="label">Message</label>
              <textarea className="text-field h-32" placeholder="Votre message"></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Envoyer le message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
