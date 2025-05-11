// src/pages/ConditionsUtilisation.jsx

import React from "react";

const ConditionsUtilisation = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Conditions Générales d’Utilisation (CGU)</h1>

      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Article 1 — Objet</h2>
        <p>
          Le site <strong>MedHive</strong> est une plateforme de mise en relation entre vendeurs (particuliers ou pharmacies) et acheteurs. 
          Le site ne propose aucune vente directe et n’intervient pas dans les transactions réalisées entre les utilisateurs.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Article 2 — Acceptation des conditions</h2>
        <p>
          Toute utilisation du site implique l'acceptation pleine et entière des présentes conditions générales d'utilisation.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Article 3 — Règles d’utilisation</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Respecter les lois et règlements en vigueur, notamment en matière de vente de médicaments.</li>
          <li>Ne pas proposer à la vente des produits dont la commercialisation est interdite ou réglementée sans autorisation ou prescription médicale.</li>
          <li>Utiliser la plateforme uniquement à des fins légales et licites.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Article 4 — Responsabilités</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>MedHive</strong> agit en tant qu’intermédiaire technique et décline toute responsabilité en cas de vente illicite effectuée entre utilisateurs en dehors de la plateforme.
          </li>
          <li>
            MedHive n’est pas responsable de la légalité, la qualité, la conformité ou la véracité des informations ou produits proposés par les utilisateurs.
          </li>
          <li>
            Il appartient à chaque utilisateur de vérifier la légalité des transactions qu’il souhaite réaliser.
          </li>
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Article 5 — Système de signalement</h2>
        <p>
          Un système de signalement est mis à disposition des utilisateurs leur permettant d’alerter <strong>MedHive</strong> en cas de contenu ou de comportement suspect ou contraire aux présentes conditions.
          MedHive s’engage à traiter chaque signalement dans les meilleurs délais et à prendre les mesures appropriées (suppression de contenu, suspension de compte…).
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Article 6 — Sanctions</h2>
        <p>
          Tout manquement aux présentes CGU pourra entraîner la suspension ou la suppression définitive du compte utilisateur, sans préavis, et sans indemnité.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Article 7 — Modification des CGU</h2>
        <p>
          <strong>MedHive</strong> se réserve le droit de modifier à tout moment les présentes CGU. Les utilisateurs seront informés des modifications et devront les accepter pour continuer à utiliser la plateforme.
        </p>
      </section>

      <section className="bg-yellow-100 p-4 border border-yellow-400 rounded mt-8">
        <h2 className="text-lg font-semibold mb-2">⚠️ Avertissement</h2>
        <p>
          La vente de médicaments est soumise à des réglementations strictes. Certains produits nécessitent une ordonnance médicale. <strong>MedHive</strong> n’effectue aucune vente directe et ne saurait être tenu responsable des transactions réalisées en dehors de la plateforme. Les utilisateurs sont seuls responsables du respect des lois en vigueur.
        </p>
      </section>
    </div>
  );
};

export default ConditionsUtilisation;
