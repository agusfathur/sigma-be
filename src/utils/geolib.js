// @ts-nocheck
import geolib from "geolib";

// Fungsi untuk mengecek jarak
export const isWithinRadius = (userLat, userLong, officeLat, officeLong, radiusInMeters) => {
  return geolib.isPointWithinRadius(
    { latitude: userLat, longitude: userLong },
    { latitude: officeLat, longitude: officeLong },
    radiusInMeters
  );
};
