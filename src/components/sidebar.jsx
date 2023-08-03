import Icon from "./icon";
import Badge from "./badge";
import "./sidebar.css";
export default function Sidebar()
{
  return (
    <div className="sidebar-root">
      <div className="cta typography-faded-1">
        <Icon name="arrowleft" size="regular" color="faded-1"/>
        Back to all projects
      </div>
      <div className="separator"></div>
      <div className="menu">
        <div className="menuitem typography-semibold-16">
          <div className="left">
            <Icon name="star" size="regular" color="faded-1"/>
            Acme frontend
          </div>
        </div>
        <div className="menuitem level-2 typography-semibold-14 typography-link active">
          <div className="left">
            <Icon name="testnets" size="regular" color="linkblue" />
            Testnets
            <Badge>8</Badge>
          </div>
          <div className="right">
            <Icon name="add" size="regular" color="faded-1" />
          </div>
        </div>
        <div className="menuitem level-2 typography-semibold-14">
          <div className="left">
            <Icon name="members" size="regular"/> 
            Members
            <Badge>1</Badge>
          </div>
          <div className="right">
            <Icon name="add" size="regular" color="faded-1"/>
          </div>
        </div>
        <div className="menuitem level-2 typography-semibold-14">
          <div className="left">
            <Icon name="projectkey" size="regular"/>
            Project Key
          </div>
          <div className="right">
            <Icon name="cloning" size="regular" color="faded-1"/>
          </div>
        </div>
      </div>
    </div>
  );
}