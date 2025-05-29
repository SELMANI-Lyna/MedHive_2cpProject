// src/pages/AboutUs.jsx
import React from "react";

const AboutUs = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto text-gray-800">
      <h1 className="text-4xl font-bold mb-6">À propos de MedHive</h1>

      <p className="mb-4">
        <strong>MedHive</strong> est une plateforme en ligne visant à faciliter la mise en relation entre vendeurs (pharmacies ou particuliers autorisés) et acheteurs de produits médicaux.
      </p>

      <p className="mb-4">
        Notre objectif est de créer un espace sécurisé, transparent et conforme à la réglementation pour la vente de médicaments ou de produits liés à la santé.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Notre mission</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Encourager des échanges responsables autour des produits médicaux.</li>
        <li>Assurer la conformité des annonces avec les lois en vigueur.</li>
        <li>Mettre à disposition des outils de signalement pour garantir la sécurité de tous.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Contact</h2>
      <p>
        Pour toute question ou suggestion, vous pouvez nous contacter à l'adresse suivante :
        <br />
        <a href="mailto:support@medhive.com" className="text-green-600 hover:underline">
          medhivecompany@gmail.com
        </a>
      </p>
    </div>
  );
};
// git pull origin main

export default AboutUs;