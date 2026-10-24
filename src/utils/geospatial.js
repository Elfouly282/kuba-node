/**
 * Geospatial Utilities for Point-in-Polygon detection and Region Zones.
 */

/**
 * Checks whether a 2D point (latitude, longitude) is inside a polygon defined by an array of vertices.
 * Uses the Jordan curve theorem (Ray-casting algorithm).
 *
 * @param {Object} point - { latitude: Number, longitude: Number }
 * @param {Array<Object>} polygonPoints - Array of { latitude: Number, longitude: Number }
 * @returns {Boolean} - true if point is inside polygon, false otherwise.
 */
function isPointInPolygon(point, polygonPoints) {
    if (!point || !Array.isArray(polygonPoints) || polygonPoints.length < 3) {
        return false;
    }

    const lat = Number(point.latitude !== undefined ? point.latitude : point.lat);
    const lng = Number(point.longitude !== undefined ? point.longitude : point.lng);

    if (isNaN(lat) || isNaN(lng)) return false;

    let inside = false;
    const n = polygonPoints.length;

    for (let i = 0, j = n - 1; i < n; j = i++) {
        const p1 = polygonPoints[i];
        const p2 = polygonPoints[j];

        const lat1 = Number(p1.latitude !== undefined ? p1.latitude : p1.lat);
        const lng1 = Number(p1.longitude !== undefined ? p1.longitude : p1.lng);
        const lat2 = Number(p2.latitude !== undefined ? p2.latitude : p2.lat);
        const lng2 = Number(p2.longitude !== undefined ? p2.longitude : p2.lng);

        if (isNaN(lat1) || isNaN(lng1) || isNaN(lat2) || isNaN(lng2)) continue;

        // Check if ray crosses edge
        const intersect = ((lng1 > lng) !== (lng2 > lng)) &&
            (lat < ((lat2 - lat1) * (lng - lng1)) / (lng2 - lng1 || 0.0000000001) + lat1);

        if (intersect) {
            inside = !inside;
        }
    }

    return inside;
}

/**
 * Calculates bounding box of polygon points.
 *
 * @param {Array<Object>} points
 * @returns {{ minLat: Number, maxLat: Number, minLng: Number, maxLng: Number }|null}
 */
function getPolygonBoundingBox(points) {
    if (!Array.isArray(points) || points.length === 0) return null;

    let minLat = Infinity;
    let maxLat = -Infinity;
    let minLng = Infinity;
    let maxLng = -Infinity;

    points.forEach((p) => {
        const lat = Number(p.latitude !== undefined ? p.latitude : p.lat);
        const lng = Number(p.longitude !== undefined ? p.longitude : p.lng);
        if (!isNaN(lat) && !isNaN(lng)) {
            if (lat < minLat) minLat = lat;
            if (lat > maxLat) maxLat = lat;
            if (lng < minLng) minLng = lng;
            if (lng > maxLng) maxLng = lng;
        }
    });

    if (minLat === Infinity) return null;
    return { minLat, maxLat, minLng, maxLng };
}

/**
 * Finds the first region from a list of regions whose zone/polygon encompasses the given coordinates.
 *
 * @param {Number} latitude
 * @param {Number} longitude
 * @param {Array<Object>} regions
 * @returns {Object|null} Matching region or null
 */
function findRegionForCoordinates(latitude, longitude, regions) {
    if (latitude === null || latitude === undefined || longitude === null || longitude === undefined) {
        return null;
    }

    const lat = Number(latitude);
    const lng = Number(longitude);
    if (isNaN(lat) || isNaN(lng)) return null;

    for (const region of regions) {
        const pts = region.points;
        if (!pts || !Array.isArray(pts) || pts.length < 3) continue;

        const bbox = getPolygonBoundingBox(pts);
        if (bbox) {
            // Quick bounding box test
            if (lat < bbox.minLat || lat > bbox.maxLat || lng < bbox.minLng || lng > bbox.maxLng) {
                continue;
            }
        }

        if (isPointInPolygon({ latitude: lat, longitude: lng }, pts)) {
            return region;
        }
    }

    return null;
}

module.exports = {
    isPointInPolygon,
    getPolygonBoundingBox,
    findRegionForCoordinates,
};
