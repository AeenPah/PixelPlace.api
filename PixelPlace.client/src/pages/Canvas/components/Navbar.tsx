import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";

function Navbar() {
  const username = localStorage.getItem("pp-username");

  return (
    <nav className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
      <Link to="/" className="text-xl font-bold">
        Pixel Place
      </Link>

      {username ? (
        <span className="font-medium">{username}</span>
      ) : (
        <Button asChild>
          <Link to="/auth/login">Login</Link>
        </Button>
      )}
    </nav>
  );
}

export default Navbar;
