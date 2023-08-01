import Icon from "./icon";
import Badge from "./badge";
import "./sidebar.css";
export default function Sidebar()
{
  return (
    <div className="sidebar-root">
      <div className="cta typography-gray9">
        <Icon name="arrowleft" size="regular" color="faded"/>
        Back to all projects
      </div>
      <div className="separator"></div>
      <div className="menu">
        <div className="menuitem typography-semibold-16">
          <div className="left">
            <Icon name="star" size="regular" color="faded"/>
            Acme frontend
          </div>
        </div>
        <div className="menuitem level-2 typography-semibold-14 typography-link-lightblue active">
          <div className="left">
            <Icon name="testnets" size="regular" color="linkblue" />
            Testnets
            <Badge>8</Badge>
          </div>
          <div className="right">
            <Icon name="add" size="regular" color="faded" />
          </div>
        </div>
        <div className="menuitem level-2 typography-semibold-14">
          <div className="left">
            <Icon name="members" size="regular"/> 
            Members
            <Badge>1</Badge>
          </div>
          <div className="right">
            <Icon name="add" size="regular" color="faded"/>
          </div>
        </div>
        <div className="menuitem level-2 typography-semibold-14">
          <div className="left">
            <Icon name="projectkey" size="regular"/>
            Project Key
          </div>
          <div className="right">
            <Icon name="cloning" size="regular" color="faded"/>
          </div>
        </div>
      </div>
    </div>
  );
}