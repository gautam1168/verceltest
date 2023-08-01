import Button from "./button";
import Icon from "./icon";
import "./sidebar.css";
export default function Sidebar()
{
  return (
    <div className="sidebar-root">
      <Button size="regular" variant="secondary">
        <Icon name="arrowleft" size="regular"/>
        Back to all projects
      </Button>
      <div className="separator"></div>
      <div className="menu">
        <div>
          <Icon name="star" size="regular"/>
          Acme frontend
        </div>
        <div>
          <Icon name="testnets" size="regular"/> 
          Testnets
        </div>
        <div>
          <Icon name="members" size="regular"/> 
          Members
        </div>
        <div>
          <Icon name="projectkey" size="regular"/>
          Project Key
        </div>
      </div>
    </div>
  );
}