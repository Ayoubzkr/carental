import React from 'react';

const FAQ = () => {
  const questions = [
    {
      question: "Quels sont les documents requis pour louer une voiture ?",
      answer: "Pour louer une voiture, vous aurez besoin de votre permis de conduire valide, d'une pièce d'identité et d'une carte de crédit au nom du conducteur principal."
    },
    {
      question: "Quelle est la politique d'annulation ?",
      answer: "Vous pouvez annuler votre réservation jusqu'à 24 heures avant la date de prise en charge sans frais. Pour les annulations moins de 24 heures à l'avance, des frais peuvent s'appliquer."
    },
    {
      question: "Quelle est la limite d'âge pour louer une voiture ?",
      answer: "Le conducteur principal doit avoir au moins 21 ans et détenir un permis de conduire valide depuis au moins 2 ans."
    },
    {
      question: "Quelles sont les options d'assurance disponibles ?",
      answer: "Nous proposons plusieurs options d'assurance : assurance tous risques, assurance collision, assurance vol et assurance responsabilité civile. Nos conseillers peuvent vous aider à choisir la meilleure option selon vos besoins."
    },
    {
      question: "Puis-je modifier ma réservation ?",
      answer: "Oui, vous pouvez modifier votre réservation en ligne ou en nous contactant directement. Les modifications sont soumises à disponibilité et peuvent entraîner des ajustements de prix."
    }
  ];

  return (
    <div className="custom-container mt-32">
      <h1 className="headline-1">Foire aux questions</h1>

      <div className="mt-8 space-y-6">
        {questions.map((item, index) => (
          <div key={index} className="bg-zinc-800 p-6 rounded-xl">
            <h3 className="headline-2 text-xl">{item.question}</h3>
            <p className="text-zinc-300 mt-4">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
