const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({
    nom: { type: String, required: true }, // Nom du produit
    description: { type: String, required: true }, // Description du produit
    prix: { type: Number, required: true }, // Prix du produit
    photo: { type: String }, // Photo du produit
    vendeur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true }, // Référence vers le vendeur
    pharmacie: { type: mongoose.Schema.Types.ObjectId, ref: 'Pharmacie' }, // Ajout de la référence pharmacie
    dateAjout: { type: Date, default: Date.now } // Date d'ajout du produit
});

// Méthode personnalisée pour retourner les infos du vendeur
produitSchema.methods.getProduitAvecInfosVendeur = async function() {
    const vendeur = await mongoose.model('Utilisateur').findById(this.vendeur);
    const pharmacie = this.pharmacie ? await mongoose.model('Pharmacie').findById(this.pharmacie) : null;

    return {
        _id: this._id,
        nom: this.nom,
        description: this.description,
        prix: this.prix,
        photo: this.photo,
        dateAjout: this.dateAjout,
        vendeur: {
            nom: vendeur.nom,
            telephone: vendeur.telephone,
            estPharmacie: vendeur.role === 'Pharmacien',
            nomPharmacie: vendeur.role === 'Pharmacien' ? vendeur.nomPharmacie : null
        },
        pharmacie: pharmacie ? {
            _id: pharmacie._id,
            nom: pharmacie.nom,
            adresse: pharmacie.adresse,
            wilaya: pharmacie.wilaya,
            latitude: pharmacie.latitude,
            longitude: pharmacie.longitude,
            telephone: pharmacie.telephone
        } : null
    };
};

const Produit = mongoose.model('Produit', produitSchema);
module.exports = Produit;