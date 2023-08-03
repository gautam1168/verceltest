import { useCallback, forwardRef } from "react";
import "./button.css";

export default forwardRef(function Button({children, variant, size, onClick }, ref)
{
  const noOpHandler = useCallback(() => { alert("This functionality is not implemented!") });
  const clickHandler = onClick || noOpHandler;
  let buttonClasses = "button-root";
  if (size == "regular")
  {
    buttonClasses += " typography-semibold-14";
  }
  else if (size == "large")
  {
    buttonClasses += " typography-semibold-16";
  }

  if (variant == "primary")
  {
    buttonClasses += " typography-link";
  }
  else if (variant == "secondary")
  {
    buttonClasses += " typography-faded-1";
  }

  return (
    <button className={buttonClasses} onClick={clickHandler} ref={ref}>
      {children}
    </button>
  );
})