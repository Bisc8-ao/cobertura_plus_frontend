import { useState } from "react";
import PropTypes from "prop-types";
import { LocationContext } from "./locationContext";
import { UseCheckCoverage, UseUserIp } from "../../hooks";

function LocationProvider({ children }) {
    const [location, setLocation] = useState({});
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const { checkCoverage } = UseCheckCoverage();
    const { getIpUser } = UseUserIp();

    function handleLocation(callback) {
        if (!navigator.geolocation) {
            setError("Geolocalização não suportada");
            return;
        }

        setIsLoading(true);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                if (
                    position.coords.latitude &&
                    position.coords.longitude &&
                    getIpUser
                ) {
                    const payload = {
                        userIp: getIpUser,
                        userLat: position.coords.latitude,
                        userLon: position.coords.longitude,
                    };

                    try {
                        const result = await checkCoverage(payload);
                        setLocation({
                            lat: payload.userLat,
                            lng: payload.userLon,
                            ip: payload.userIp,
                            corvaged: result.available,
                        });
                        setError(null);
                    } catch (err) {
                        setError(err.message);
                    } finally {
                        setIsLoading(false);
                        callback?.();
                    }
                } else {
                    setError("Não foi possível obter todos os dados necessários (IP, Localização).");
                    setIsLoading(false);
                }
            },
            (err) => {
                setError("Erro a obter a localização: " + err.message);
                setIsLoading(false);
            },
            { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
        );
    }

    return (
        <LocationContext.Provider
            value={{
                location,
                setLocation,
                error,
                isLoading,
                handleLocation,
                setIsLoading,
            }}
        >
            {children}
        </LocationContext.Provider>
    );
}

LocationProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { LocationProvider };
