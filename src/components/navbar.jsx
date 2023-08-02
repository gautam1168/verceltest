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
        <span className="tab typography-medium-14">
          <Icon name="projects" color="faded" size="medium"></Icon>
          <Link to={'projects'}>
            Projects
          </Link>
        </span>
        <span className="tab typography-medium-14">
          <Icon name="docs" color="faded" size="medium"></Icon>
          <Link to={'docs'}>
            Docs
          </Link>
        </span>
        <span className="tab typography-medium-14">
          <Icon name="cheatsheet" color="faded" size="medium"></Icon>
          <Link to={'cheatsheet'}>
            Command Cheatsheet
          </Link>
        </span>
      </div>
      <div className="right">
        <span className="tab typography-medium-14">
          <Icon name="userkey" color="faded" size="medium"></Icon>
          <a href="#">
            Your user key
          </a>
        </span>
        <span><a href="#">U</a></span>
      </div>
    </div>
  );
}