import { useLoaderData } from "react-router-dom";
import Sidebar from "../components/sidebar";
import "./projects.css";

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
    let classNames = "typography-semibold";
    if (status == "RUNNING")
    {
      classNames += " typography-success-green-dark";
    }

    return (
      <span className={classNames}>
        {status}
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
          <div>
            <span className="typography-h2">{item.name}</span>
            <span className="typography-semibold typography-gray9">
              5321
            </span>
            { getStatus(item.status) }
            <span className="typography-semibold typography-link-lightblue">Settings</span>
          </div>
          <div>
            <span>{item.testnet_off_chain_actors.length} off chain actors</span>
            <span>{item.testnet_chains.length} Blockchain</span>
            { item.testnet_chains.map(getChainImage) }
            <span>Modified {diffPhrase}</span>
          </div>
        </div>
      );
    });
  }

  return (<div className="projects-root">
    <Sidebar />
    <div className="projects-body">
      <div className="typography-h2">
        Testnets (8)
      </div>
      <div className="cards-container">{cards}</div>
    </div>
  </div>);
}