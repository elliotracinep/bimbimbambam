import "./NavLinks.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/app-context.js";

const NavLinks = () => {
    const auth = useContext(AuthContext);
    return (
        <ul className="navlinks">
            {!auth.isLoggedIn && (
                <>
                    <li>
                        <NavLink to="/bimbimbambam">
                            <p>menu</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/login">
                            <p>connexion</p>
                        </NavLink>
                    </li>
                </>
            )}
            {auth.isLoggedIn && (
                <>  <li>
                    <NavLink to="/symbols">
                        <p>symboles</p>
                    </NavLink>
                </li>
                    <li>
                        <NavLink to="/bimbimbambam" onClick={auth.logout}>
                            <p>déconnexion</p>
                        </NavLink>
                    </li>
                </>
            )}
        </ul>
    );
};

export default NavLinks;
