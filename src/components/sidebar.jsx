import "./sidebar.css";

import { Link } from "react-router-dom";
import { useCallback } from "react";
import classNames from "classnames";

import Icon from "./icon";
import Badge from "./badge";

export default function Sidebar({ state })
{
  const noOp = useCallback(() => {alert("This feature is not implemented!")});

  const menuItems = state.sidebarItems.map(it => {
    let menuClassNames = classNames({
      "menuitem": true,
      "level-2": it.level === 2,
      "typography-semibold-16": it.level === 1,
      "typography-semibold-14": it.level === 2,
      "active": it.selected,
      "typography-link": it.selected
    });

    return (
      <div className={menuClassNames} onClick={noOp} key={it.label}>
        <div className="left">
          <Icon name={it.prefixIcon} size="regular" color={it.selected ? 'linkblue' : 'faded-1'} />
          {it.label}
          {it.count && <Badge>{it.count}</Badge>}
        </div>
        {it.suffixIcon &&
          (<div className="right">
            <Icon name={it.suffixIcon} size="medium" color="faded-1" />
          </div>)
        }
      </div>
    );
  });

  return (
    <div className="sidebar-root">
      <div className="cta typography-faded-1">
        <Link to={'/projects'}> 
          <Icon name="arrowleft" size="regular" color="faded-1"/>
          Back to all projects
        </Link>
      </div>
      <div className="separator"></div>
      <div className="menu">
        <div className="menuitem typography-semibold-16">
          <div className="left">
            <Icon name="star" size="regular" color="faded-1"/>
            Acme frontend
          </div>
        </div>
        {menuItems}
      </div>
    </div>
  );
}