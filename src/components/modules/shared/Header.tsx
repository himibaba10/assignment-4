import { Link } from "react-router";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="section">
      <div className="flex items-center justify-between">
        <span>
          <Link to="/" className="font-semibold">
            Reactive Library
          </Link>
        </span>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
