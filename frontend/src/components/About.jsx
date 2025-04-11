import React from 'react';

const About = () => {
  return (
    <div className="custom-container mt-32">
      <h1 className="headline-1">À propos de nous</h1>

      <div className="mt-8 space-y-6">
        <section>
          <h2 className="headline-2">Notre histoire</h2>
          <p className="text-zinc-300 mt-4">
            Fondée en 2024, Luxury Car Rental est née d'une passion commune pour l'automobile et le service client d'exception.
            Notre mission est de rendre accessible la location de voitures de luxe à tous, tout en garantissant une expérience inoubliable.
          </p>
        </section>

        <section>
          <h2 className="headline-2">Nos valeurs</h2>
          <ul className="list-disc list-inside text-zinc-300 mt-4 space-y-2">
            <li>Qualité de service irréprochable</li>
            <li>Transparence dans nos tarifs et conditions</li>
            <li>Engagement envers la satisfaction client</li>
            <li>Innovation constante dans nos services</li>
          </ul>
        </section>

        <section>
          <h2 className="headline-2">Notre flotte</h2>
          <p className="text-zinc-300 mt-4">
            Nous proposons une sélection rigoureuse de véhicules de luxe, allant des berlines élégantes aux SUV spacieux,
            en passant par les sportives performantes. Chaque véhicule est entretenu avec le plus grand soin pour garantir
            votre sécurité et votre confort.
          </p>
        </section>

        <section>
          <h2 className="headline-2">Notre équipe</h2>
          <p className="text-zinc-300 mt-4">
            Notre équipe est composée de professionnels passionnés, experts dans leur domaine, toujours prêts à vous accompagner
            dans le choix du véhicule qui correspondra parfaitement à vos besoins.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
