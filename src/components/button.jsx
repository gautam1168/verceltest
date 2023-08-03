import "./button.css";

import classNames from "classnames";
import { useCallback, forwardRef } from "react";

export default forwardRef(function Button({children, variant, size, onClick }, ref)
{
  const noOpHandler = useCallback(() => { alert("This functionality is not implemented!") });
  const clickHandler = onClick || noOpHandler;
  let buttonClasses = classNames({
    "button-root": true,
    "typography-semibold-14": size === "regular",
    "typography-semibold-16": size === "large",
    "typography-link": variant === "primary",
    "typography-faded-1": variant === "secondary"
  })

  return (
    <button className={buttonClasses} onClick={clickHandler} ref={ref}>
      {children}
    </button>
  );
})