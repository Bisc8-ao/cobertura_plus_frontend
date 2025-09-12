import { useState } from "react";
import { LocationContext } from "./locationContext";

function LocationProvider({ children }) {
    const [location, setLocation] = useState({});
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    function handleLocation(callback) {
        if (!navigator.geolocation) {
            setError("Geolocalização não suportada");
            return;
        }

        setIsLoading(true);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                if (position.coords.latitude && position.coords.longitude) {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                    setError(null);
                    ;


                    if (callback) callback();
                }
            },
            (err) => {
                setError("Erro a obter a localização: " + err.message);
                setIsLoading(false);
            }
        );
    }

    return (
        <LocationContext.Provider
            value={{ location, error, isLoading, handleLocation, setIsLoading }}
        >
            {children}
        </LocationContext.Provider>
    );
}

export { LocationProvider };
