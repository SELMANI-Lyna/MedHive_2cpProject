const Produit = require('../models/produit');
const Pharmacie = require('../models/pharmacie');
const { filterByDistance } = require('../utils/searchUtils');

exports.rechercherProduitsAvecPharmacies = async(req, res) => {
    try {
        const {
            nom,
            lat,
            lng,
            distance = 5,
            disponible,
            wilaya,
            maxPrix
        } = req.query;

        // Construction de la requête de base
        let query = {};

        // Filtre par nom de produit
        if (nom) {
            query.nom = { $regex: nom, $options: 'i' };
        }

        // Filtre par disponibilité
        if (disponible !== undefined) {
            query.disponible = disponible === 'true';
        }

        // Filtre par prix maximum
        if (maxPrix) {
            query.prix = { $lte: parseFloat(maxPrix) };
        }

        // Effectuer la recherche avec population des données de la pharmacie
        let produits = await Produit.find(query)
            .populate({
                path: 'pharmacie',
                select: 'nom adresse wilaya latitude longitude telephone',
                match: wilaya ? { wilaya: { $regex: wilaya, $options: 'i' } } : {}
            })
            .populate('vendeur', 'nom telephone role nomPharmacie');

        // Filtrer les produits qui n'ont pas de pharmacie si un filtre de wilaya est appliqué
        if (wilaya) {
            produits = produits.filter(produit => produit.pharmacie);
        }

        // Si des coordonnées sont fournies, filtrer par distance
        if (lat && lng) {
            const latitude = parseFloat(lat);
            const longitude = parseFloat(lng);

            if (isNaN(latitude) || isNaN(longitude) || latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
                return res.status(400).json({ message: "Coordonnées GPS invalides" });
            }

            // Filtrer et trier par distance
            produits = filterByDistance(produits, latitude, longitude, parseFloat(distance));
        }

        return res.status(200).json({
            count: produits.length,
            produits: produits
        });

    } catch (error) {
        console.error('Erreur lors de la recherche:', error);
        return res.status(500).json({
            message: "Erreur lors de la recherche des produits",
            error: error.message
        });
    }
};

// Obtenir les statistiques pour le tableau de bord admin
exports.getAdminStats = async(req, res) => {
    try {
        const stats = {
            totalProduits: await Produit.countDocuments(),
            produitsDisponibles: await Produit.countDocuments({ disponible: true }),
            produitsByPharmacie: await Produit.aggregate([{
                $group: {
                    _id: '$pharmacie',
                    count: { $sum: 1 }
                }
            }])
        };

        return res.status(200).json(stats);
    } catch (error) {
        console.error('Erreur lors de la récupération des statistiques:', error);
        return res.status(500).json({
            message: "Erreur lors de la récupération des statistiques",
            error: error.message
        });
    }
};