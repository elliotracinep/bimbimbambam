import { useContext } from "react";
import { Link } from "react-router-dom";
import "./SymbolItem.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/app-context.js";

const SymbolItem = (props) => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const song = {
        name: props.name,
        image: props.image,
    };
    return (
        <li className="">
            <div className="">
                    <h3>{props.image}</h3>
            </div>
        </li>
    );
};
export default SymbolItem;
