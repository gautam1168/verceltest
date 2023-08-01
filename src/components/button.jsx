import "./button.css";

export default function Button({children, variant, size })
{
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
    buttonClasses += " typography-link-lightblue";
  }
  else if (variant == "secondary")
  {
    buttonClasses += " typography-gray9";
  }

  return (
    <button className={buttonClasses}>
      {children}
    </button>
  );
}