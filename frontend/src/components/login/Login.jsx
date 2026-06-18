import { useContext } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/app-context.js";
import { useState } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import Loader from "../containers/LoadingCard";

const Login = () => {
    let title = "sdasdfasfasf";
    const auth = useContext(AuthContext);
    const { sendRequest } = useHttpClient();
    const [isLoading, setIsLoading] = useState(false);
    const [loginValues, setLoginValues] = useState({
        username: "",
        password: "",
    });

    const handleLoginChange = (id, value) => {
        setLoginValues((prevValue) => ({
            ...prevValue,
            [id]: value,
        }));
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            const reponse = await sendRequest(
                (import.meta.env.VITE_BACKEND_URL || "bimbimbambam") +
                "users/login",
                "POST",
                JSON.stringify(loginValues),
                {
                    "Content-Type": "application/json",
                },
            );
            auth.login(reponse.userId, reponse.token);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <>
            <div className="spinner"> {isLoading && <Loader />}</div>
            <div className="form-card">
                <h1>{ttitle}</h1>
                <form onSubmit={submitHandler}>
                    <div className="label-input">
                        <label htmlFor="username">nom d'utilisateur</label>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            autoComplete="username"
                            placeholder="nom d'utilisateur"
                            onChange={(event) =>
                                handleLoginChange("username", event.target.value)
                            }
                            value={loginValues.username}
                        />
                    </div>
                    <div className="label-input">
                        <label htmlFor="password">mot de passe</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            autoComplete="current-password"
                            placeholder="mot de passe"
                            onChange={(event) =>
                                handleLoginChange("password", event.target.value)
                            }
                            value={loginValues.password}
                        />
                    </div>
                    <div>
                        <button type="submit">login</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
