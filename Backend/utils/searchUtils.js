const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = value => (value * Math.PI) / 180;
    const R = 6371; // Rayon de la Terre en km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance en kilomètres
};

const filterByDistance = (items, userLat, userLng, maxDistance = 5) => {
    return items
        .map(item => {
            const distance = calculateDistance(
                userLat,
                userLng,                item.latitude || item.pharmacie?.latitude,
                item.longitude || item.pharmacie?.longitude
            );
            return {...item.toObject(), distance: Math.round(distance * 10) / 10 };
        })
        .filter(item => item.distance <= maxDistance)
        .sort((a, b) => a.distance - b.distance);
};

module.exports = {
    calculateDistance,
    filterByDistance
};