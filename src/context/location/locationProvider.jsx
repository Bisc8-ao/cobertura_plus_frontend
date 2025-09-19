import { useState } from "react";
import PropTypes from "prop-types";
import { LocationContext } from "./locationContext";
import { UseCheckCoverage, UseUserIp } from "../../hooks";

function LocationProvider({ children }) {
    const [location, setLocation] = useState({});
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const [getValueRandom, setGetValueRandom] = useState(null);
    const { checkCoverage } = UseCheckCoverage();
    const { getIpUser } = UseUserIp();



    const getRondom = () => {
        const result = Math.floor(Math.random() * 2) + 1;



        if (result <= 1) {
            setGetValueRandom(false);
        } else {
            setGetValueRandom(true);
        }
    };

    function handleLocation(callback) {
        getRondom();
        if (!navigator.geolocation) {
            setError("Geolocalização não suportada");
            return;
        }

        setIsLoading(true);

        navigator.geolocation.getCurrentPosition(
            (position) => {
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

                    console.log(payload)
                    const result = checkCoverage(payload);
                    setLocation({
                        lat: result.userLat,
                        lng: result.userLon,
                        ip: result.userIp,
                        corvaged: getValueRandom,
                    });

                    setError(null);
                    callback?.();
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
