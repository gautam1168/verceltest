import Button from "./button";
import "./sidebar.css";
export default function Sidebar()
{
  return (
    <div className="sidebar-root">
      <Button size="regular" variant="secondary">
        - Back to all projects
      </Button>
      <div className="separator"></div>
      <div className="menu">
        <div>Acme frontend</div>
        <div>Testnets</div>
        <div>Members</div>
        <div>Project Key</div>
      </div>
    </div>
  );
}