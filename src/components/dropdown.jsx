import Button from "./button";
import "./dropdown.css";
import Icon from "./icon";

export default function Dropdown({label})
{
  return (
    <div className=".dropdown-root">
      <span>{label}</span>
      <Button>Selected value</Button>
      <Icon name="chevdown" size="small"></Icon>
    </div>
  );
}