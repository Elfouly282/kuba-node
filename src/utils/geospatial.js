const booleanPointInPolygon = require('@turf/boolean-point-in-polygon').default;
const bbox = require('@turf/bbox').default;
const centroid = require('@turf/centroid').default;
const { point, polygon } = require('@turf/helpers');

const toPosition = (p) => {
    const lat = Number(p?.latitude ?? p?.lat);
    const lng = Number(p?.longitude ?? p?.lng);
    return Number.isFinite(lat) && Number.isFinite(lng) ? [lng, lat] : null;
};

const toRing = (points) => {
    if (!Array.isArray(points)) return null;
    const ring = points.map(toPosition).filter(Boolean);
    if (ring.length < 3) return null;

    const [firstLng, firstLat] = ring[0];
    const [lastLng, lastLat] = ring[ring.length - 1];
    if (firstLng !== lastLng || firstLat !== lastLat) ring.push([firstLng, firstLat]);
    return ring.length >= 4 ? ring : null;
};

const toPolygon = (points) => {
    const ring = toRing(points);
    return ring ? polygon([ring]) : null;
};

const isPointInPolygon = (target, polygonPoints) => {
    const position = toPosition(target);
    const shape = toPolygon(polygonPoints);
    if (!position || !shape) return false;
    return booleanPointInPolygon(point(position), shape);
};

const getPolygonBoundingBox = (points) => {
    if (!Array.isArray(points)) return null;
    const positions = points.map(toPosition).filter(Boolean);
    if (!positions.length) return null;

    const [minLng, minLat, maxLng, maxLat] = bbox({ type: 'MultiPoint', coordinates: positions });
    return { minLat, maxLat, minLng, maxLng };
};

const findRegionForCoordinates = (latitude, longitude, regions) => {
    if (latitude == null || longitude == null) return null;
    const position = toPosition({ latitude, longitude });
    if (!position) return null;

    const target = point(position);
    return regions.find((region) => {
        const shape = toPolygon(region.points);
        return shape && booleanPointInPolygon(target, shape);
    }) || null;
};

const buildZoneGeometry = (points) => {
    const shape = toPolygon(points);
    if (!shape) return null;

    const [lng, lat] = centroid(shape).geometry.coordinates;
    return {
        boundaries: shape.geometry,
        center: {
            latitude: Number(lat.toFixed(6)),
            longitude: Number(lng.toFixed(6)),
        },
    };
};

module.exports = {
    isPointInPolygon,
    getPolygonBoundingBox,
    findRegionForCoordinates,
    buildZoneGeometry,
};
