const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const { authentifierUtilisateur, verifierRole } = require('../middleware/authMiddleware');

// Route pour la recherche avancée des produits avec localisation des pharmacies
router.get('/produits-pharmacies', searchController.rechercherProduitsAvecPharmacies);

// Route pour les statistiques admin (protégée)
router.get('/admin/stats',
    authentifierUtilisateur,
    verifierRole(['Admin']),
    searchController.getAdminStats
);

module.exports = router;