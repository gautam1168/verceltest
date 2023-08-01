import { Link } from "react-router-dom";
import "./navbar.css";
import Icon from "./icon";
import { ReactComponent as HarborLogo } from "../Icons/Harbor logo.svg";
export default function Navbar()
{
  return (
    <div className="navbar-root">
      <div className="left">
        <HarborLogo />
        <span><Link to={'projects'}>Projects</Link></span>
        <span><Link to={'docs'}>Docs</Link></span>
        <span><Link to={'cheatsheet'}>Command Cheatsheet</Link></span>
      </div>
      <div className="right">
        <span><a href="#">Your user key</a></span>
        <span><a href="#">U</a></span>
      </div>
    </div>
  );
}