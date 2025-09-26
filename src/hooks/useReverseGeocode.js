import { useEffect, useState } from "react";
import { UseLocation } from "./useLocation";

function useReverseGeocode() {
    const [address, setAddress] = useState("");
    const { location } = UseLocation();

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        const getAddressFromLatLng = async () => {
            const API_KEY = import.meta.env.VITE_API_KEY_GOOGLE;
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${API_KEY}`,
                {
                    signal,
                }
            );
            const data = await response.json();

            if (data.status === "OK") {
                setAddress(data.results[0].formatted_address);
            } else {
                setAddress("Não foi possível obter o endereço");
            }
        };

        getAddressFromLatLng();

        return () => controller.abort();
    }, [location]);

    return {
        address,
    };
}

export { useReverseGeocode };
