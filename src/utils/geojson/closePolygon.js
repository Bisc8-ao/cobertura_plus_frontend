function closePolygon(coords) {
    if (!coords.length) return coords;
    const first = coords[0];
    const last = coords[coords.length - 1];
    if (first[0] !== last[0] || first[1] !== last[1]) {
        coords.push([...first]); // fecha o polígono
    }
    return coords;
}

export { closePolygon };
