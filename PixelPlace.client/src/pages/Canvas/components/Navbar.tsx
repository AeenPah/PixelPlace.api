import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";

function Navbar() {
  const username = localStorage.getItem("pp-username");

  return (
    <nav className="flex h-16 items-center justify-between border-b border-border bg-card/80 px-6 shadow-[0_1px_0_rgba(31,35,40,0.04)] backdrop-blur-sm">
      <Link to="/" className="text-lg font-semibold tracking-[0.2em] text-foreground uppercase">
        Pixel Place
      </Link>

      {username ? (
        <span className="font-medium text-muted-foreground">{username}</span>
      ) : (
        <Button asChild>
          <Link to="/auth/login">Login</Link>
        </Button>
      )}
    </nav>
  );
}

export default Navbar;
