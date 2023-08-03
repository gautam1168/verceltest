import "./navbar.css";

import { Link } from "react-router-dom";

import { ReactComponent as HarborLogo } from "../Icons/Harbor logo.svg";
import Icon from "./icon";

export default function Navbar()
{
  return (
    <div className="navbar-root">
      <div className="left">
        <HarborLogo />
        <span className="tab typography-medium-14">
          <Icon name="projects" color="faded-1" size="medium"></Icon>
          <Link to={'projects'}>
            Projects
          </Link>
        </span>
        <span className="tab typography-medium-14">
          <Icon name="docs" color="faded-1" size="medium"></Icon>
          <Link to={'docs'}>
            Docs
          </Link>
        </span>
        <span className="tab typography-medium-14">
          <Icon name="cheatsheet" color="faded-1" size="medium"></Icon>
          <Link to={'cheatsheet'}>
            Command Cheatsheet
          </Link>
        </span>
      </div>
      <div className="right">
        <span className="tab typography-medium-14">
          <Icon name="userkey" color="faded-1" size="medium"></Icon>
          <a href="#">
            Your user key
          </a>
        </span>
        <span className="userbubble">
          <Icon name="members" color="faded-1" size="regular"></Icon>
        </span>
      </div>
    </div>
  );
}