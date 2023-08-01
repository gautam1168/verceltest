import { Link } from "react-router-dom";
import "./navbar.css";
export default function Navbar()
{
  return (
    <div className="navbar-root">
      <span><Link to={'projects'}>Projects</Link></span>
      <span><Link to={'docs'}>Docs</Link></span>
      <span><Link to={'cheatsheet'}>Command Cheatsheet</Link></span>
    </div>
  );
}