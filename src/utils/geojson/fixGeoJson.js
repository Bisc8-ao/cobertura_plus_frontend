import { closePolygon } from "./closePolygon";

function fixGeoJson(geojson) {
    const fixed = JSON.parse(JSON.stringify(geojson));
    fixed.features.forEach((f) => {
        if (f.geometry.type === "Polygon") {
            f.geometry.coordinates = f.geometry.coordinates.map(closePolygon);
        }
        if (f.geometry.type === "MultiPolygon") {
            f.geometry.coordinates = f.geometry.coordinates.map((poly) =>
                poly.map(closePolygon)
            );
        }
    });
    return fixed;
}

export { fixGeoJson };
