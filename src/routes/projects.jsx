import { useLoaderData } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Button from "../components/button";
import Icon from "../components/icon";
import "./projects.css";
import Dropdown from "../components/dropdown";
import Badge from "../components/badge";

export default function Projects()
{
  const getChainImage = data => {
    switch(data.chain)
    {
      case "alchemy":
        return <img className="blockchain-logo" key={data.chain} src="/Blockchains/Alchemy.png"></img>;
      case "arbitrum":
        return <img className="blockchain-logo" key={data.chain} src="/Blockchains/Arbitrum.png"></img>;
      case "ethereum":
        return <img className="blockchain-logo" key={data.chain} src="/Blockchains/Ethereum.png"></img>;
      case "fantom":
        return <img className="blockchain-logo" key={data.chain} src="/Blockchains/Fantom.png"></img>;
      case "optimism":
        return <img className="blockchain-logo" key={data.chain} src="/Blockchains/Optimism.png"></img>;
      case "polygon":
        return <img className="blockchain-logo" key={data.chain} src="/Blockchains/Polygon.png"></img>;
      default:
        return null;
    }
  };

  const getStatus = status => {
    let classNames = "vertically-center typography-semibold-14";
    let icon = null;
    if (status == "RUNNING")
    {
      classNames += " typography-success-green-dark";
      icon = <Icon name="tick" size="regular" color="success"/>
    }
    else if (status == "STOPPED")
    {
      classNames += " typography-graya";
      icon = <Icon name="killed" size="regular" color="faded" />;
    }
    else if (status == "PENDING")
    {
      classNames += " typography-warning-yellow";
      icon = <Icon name="standinghourglass" size="regular" color="warning" />
    }

    return (
      <span className={classNames}>
        {icon}{status}
      </span>
    );
  }

  const { projects } = useLoaderData();
  let cards = "loading..."; 
  if (projects.testnet)
  {
    cards = Object.values(projects.testnet).map(item => {
      const updatedAt = new Date(item.updated_at);
      const timeDiff = Date.now() - updatedAt;

      let diffPhrase = "";
      if (timeDiff < 1000 * 60)
      {
        diffPhrase = "a few seconds";
      }
      else if (timeDiff < 1000 * 60 * 60)
      {
        diffPhrase = Math.floor(timeDiff/(1000 * 60)) + " minutes ago";
      }
      else if (timeDiff < 1000 * 60 * 60 * 24)
      {
        diffPhrase = Math.floor(timeDiff/(1000 * 60 * 60)) + " hours ago";
      }
      else if (timeDiff < 1000 * 60 * 60 * 24 * 30)
      {
        diffPhrase = Math.floor(timeDiff/(1000 * 60 * 60 * 24)) + " days ago";
      }
      else if (timeDiff < 1000 * 60 * 60 * 24 * 30 * 12)
      {
        diffPhrase = Math.floor(timeDiff/ (1000 * 60 * 60 * 24 * 30)) + "months ago";
      }
      else
      {
        diffPhrase = "more than a year ago";
      }

      return (
        <div className="card-root" key={item.id}>
          <div className="card-itemrow">
            <div className="left">
              <span className="typography-h2">{item.name}</span>
              <Badge>
                <span className="typography-semibold-14 typography-gray9">
                  5321
                </span>
              </Badge>
              
            </div>
            <div className="right">
              { getStatus(item.status) }
              <span className="vertically-center typography-semibold-14 typography-link-lightblue">
                <Icon name="gear" size="regular" color="linkblue"></Icon>
                Settings
              </span>
            </div>
          </div>
          <div className="card-itemrow">
            <div className="left">
            <span>{item.testnet_off_chain_actors.length} off chain actors</span>
            <span>{item.testnet_chains.length} Blockchain</span>
            { item.testnet_chains.map(getChainImage) }
            </div>
            <div className="right">
              <Icon name="clock" size="regular" color="faded" />
              <span className="typography-graya">Modified {diffPhrase}</span>
            </div>
          </div>
        </div>
      );
    });
  }

  const filterOptions = [
    { label: "All", icon: "all", color: "linkblue"  },
    { label: "Running", icon: "tick", color: "success" },
    { label: "Standing up", icon: "standinghourglass", color: "warning" },
    { label: "Updating", icon: "standinghourglass", color: "warning" },
    { label: "Failed", icon: "failed", color: "failed" },
    { label: "Killed", icon: "killed", color: "faded" }
  ];

  const sortOptions = [
    { label: "Name A-Z" },
    { label: "Name Z-A" },
    { label: "Status" },
    { label: "Date created" },
    { label: "Last modified" },
  ];

  return (<div className="projects-root">
    <Sidebar />
    <div className="projects-body">
      <div className="project-data-controls">
        <div className="left">
          <div className="typography-h2">
            Testnets (8)
          </div>
          <Button variant="primary" size="large">+ New Testnet</Button>
        </div>
        <div className="right">
          <Dropdown 
            label="Filter by:" 
            options={filterOptions}
          />
          <Dropdown 
            label="Sort by:" 
            options={sortOptions} 
          />
        </div>
      </div>
      <div className="cards-container">{cards}</div>
    </div>
  </div>);
}