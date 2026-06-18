import "./Header.css";
import { Link } from "react-router-dom";
import NavLinks from "../navlinks/NavLinks";

const Header = () => {
    let title = "Alphabet"
  return (
    <header className="">
      <h1 className="">
        <Link to="/symbols">{title}</Link>
      </h1>
      <nav className="">
        <NavLinks />
      </nav>
    </header>
  );
};

export default Header;
