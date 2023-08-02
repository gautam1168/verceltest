import { createElement } from "react";

import "./icon.css";

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

export default function Icon({ name, size, color })
{
  let classNames = "icon-root";
  if (size)
  {
    classNames += " " + size;
  }

  if (color)
  {
    classNames += " " + color;
  }

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
    dot: Dot
  };

  if (iconsComponents[name])
  {
    const iconNode = createElement(iconsComponents[name]);
    return (
      <span className={classNames}>
        {iconNode}
      </span>
    );
  }
  else
  {
    return null;
  }
}