import "./icon.css";

import { createElement, useCallback } from "react";
import classNames from "classnames";


import { ReactComponent as Testnets } from "../Icons/Testnets.svg";
import { ReactComponent as Star } from "../Icons/Star in project.svg";
import { ReactComponent as Members } from "../Icons/Members.svg";
import { ReactComponent as Projectkey } from "../Icons/Project key.svg";
import { ReactComponent as Add } from "../Icons/Add.svg";
import { ReactComponent as Chevdown } from "../Icons/Arrow down short.svg"
import { ReactComponent as Chevright } from "../Icons/Arrow right short.svg";
import { ReactComponent as Arrowleft } from "../Icons/Arrow left long.svg";
import { ReactComponent as Arrowright } from "../Icons/Arrow right long.svg";
import { ReactComponent as Gear } from "../Icons/Settings.svg";
import { ReactComponent as Tick } from "../Icons/Running tick.svg";
import { ReactComponent as Standinghourglass } from "../Icons/Standing up hour glass.svg";
import { ReactComponent as Cloning } from "../Icons/Cloning.svg";
import { ReactComponent as Killed } from "../Icons/Killed.svg";
import { ReactComponent as Failed } from "../Icons/Failed.svg";
import { ReactComponent as Clock } from "../Icons/Clock.svg";
import { ReactComponent as All } from "../Icons/All status.svg";
import { ReactComponent as Dot } from "../Icons/Dot.svg";
import { ReactComponent as Projects } from "../Icons/Projects.svg";
import { ReactComponent as Docs } from "../Icons/Docs.svg";
import { ReactComponent as CheatSheet } from "../Icons/Command sheet.svg";
import { ReactComponent as UserKey } from "../Icons/User key.svg";


export default function Icon({ name, size, color, onClick })
{
  let iconClassNames = classNames({
    "icon-root": true,
    [size]: true,
    [color]: true,
    "clickable": onClick
  });

  const iconsComponents = {
    testnets: Testnets,
    star: Star,
    members: Members,
    projectkey: Projectkey,
    add: Add,
    chevdown: Chevdown,
    chevright: Chevright,
    arrowleft: Arrowleft,
    arrowright: Arrowright,
    gear: Gear,
    tick: Tick,
    standinghourglass: Standinghourglass,
    cloning: Cloning,
    killed: Killed,
    failed: Failed,
    clock: Clock,
    all: All,
    dot: Dot,
    projects: Projects,
    docs: Docs,
    cheatsheet: CheatSheet,
    userkey: UserKey
  };

  let clickHandler = useCallback(() => {});
  if (onClick)
  {
    clickHandler = onClick;
  }

  if (iconsComponents[name])
  {
    const iconNode = createElement(iconsComponents[name]);
    return (
      <span className={iconClassNames} onClick={clickHandler}>
        {iconNode}
      </span>
    );
  }
  else
  {
    return null;
  }
}