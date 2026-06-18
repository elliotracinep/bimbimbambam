import { useEffect, useState } from "react";
import SymbolList from "../symbolItem/SymbolItem";
import { useHttpClient } from "../../hooks/http-hook.js";
import "./SymbolList.css";
import Loader from "../containers/LoadingCard";

const SymbolList = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [loadedSymbols, setLoadedSymbols] = useState([]);
    const { sendRequest } = useHttpClient();

    useEffect(() => {
        const fetchSymbols = async () => {
            try {
                setIsLoading(true);
                const reponse = await sendRequest(
                    import.meta.env.VITE_BACKEND_URL +
                    "symbols",
                );
                setLoadedSymbols(reponse.symbols);
                setIsLoading(false);
            } catch (err) {
                console.log("erreur lors de la recherche des symboles : ", err);
            }
        };
        fetchSymbols();
    }, [sendRequest]);
    if (loadedSymbols == undefined) {
        return (
            <div className="symbol-error-card">
                <h3>erreur</h3>
                <p>fahhh</p>
            </div>
        );
    }

    if (liste.length == 0) {
        liste = loadedSymbols;
    }

    return (
        <>
            <div className="spinner"> {isLoading && <Loader />}</div>
            <ul className="symbols-list">
                {liste.map((symbol) =>
                    liste.length > 0 ? (
                        <SymbolList
                            key={symbol.id}
                            id={symbol.id}
                            name={symbol.name}
                            album={symbol.image}>
                        </SymbolList>
                    ) : null,
                )}
            </ul>
        </>
    );
};

export default SymbolList;
