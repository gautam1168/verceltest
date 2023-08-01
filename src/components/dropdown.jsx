import Button from "./button";
import "./dropdown.css";

export default function Dropdown({label})
{
  return (
    <div className=".dropdown-root">
      <span>{label}</span>
      <Button>Selected value</Button>
      <span>chev</span>
    </div>
  );
}