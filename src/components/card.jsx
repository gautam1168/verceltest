import "./card.css";

import classNames from "classnames";

import Badge from "../components/badge";
import Icon from "../components/icon";

function getAge(updatedAt)
{
  const timeDiff = Date.now() - updatedAt;

  let diffPhrase = "";
  if (timeDiff < 1000 * 60) {
    diffPhrase = "a few seconds";
  }
  else if (timeDiff < 1000 * 60 * 60) {
    diffPhrase = Math.floor(timeDiff / (1000 * 60)) + " minutes ago";
  }
  else if (timeDiff < 1000 * 60 * 60 * 24) {
    diffPhrase = Math.floor(timeDiff / (1000 * 60 * 60)) + " hours ago";
  }
  else if (timeDiff < 1000 * 60 * 60 * 24 * 30) {
    diffPhrase = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + " days ago";
  }
  else if (timeDiff < 1000 * 60 * 60 * 24 * 30 * 12) {
    diffPhrase = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30)) + " months ago";
  }
  else {
    diffPhrase = "More than a year ago";
  }

  return diffPhrase;
}

export default function Card({ config })
{
  const getChainImage = (data, index) => {
    let image = null;
    switch (data.chain) {
      case "alchemy":
        image = (<img src="/Blockchains/Alchemy.png"></img>);
        break;
      case "arbitrum":
        image = (<img src="/Blockchains/Arbitrum.png"></img>);
        break;
      case "ethereum":
        image = (<img src="/Blockchains/Ethereum.png"></img>);
        break;
      case "fantom":
        image = (<img src="/Blockchains/Fantom.png"></img>);
        break;
      case "optimism":
        image = (<img src="/Blockchains/Optimism.png"></img>);
        break;
      case "polygon":
        image = (<img src="/Blockchains/Polygon.png"></img>);
        break;
      default:
        image = data.chain;
    }

    return (
      <div
        style={{ left: (20 * index) + 'px' }}
        className="blockchain-logo"
        key={data.chain}
      >
        {image}
      </div>
    );
  };

  const getStatus = status => {
    let rootClassNames = classNames({
      "vertically-center": true, 
      "typography-semibold-14": true,
      "typography-success": status === "RUNNING",
      "typography-faded-1": status === "STOPPED",
      "typography-warning": status === "STANDING",
      "typography-failed": status === "FAILED",
      "typography-whimsy": status === "CLONING"
    });

    let icon = null;
    if (status == "RUNNING") {
      icon = <Icon name="tick" size="regular" color="success" />
    }
    else if (status == "STOPPED") {
      icon = <Icon name="killed" size="regular" color="faded-1" />;
    }
    else if (status == "PENDING" || status == "STANDING") {
      icon = <Icon name="standinghourglass" size="regular" color="warning" />
    }
    else if (status == "FAILED") {
      icon = <Icon name="failed" size="regular" color="failed" />
    }
    else if (status == "CLONING") {
      icon = <Icon name="cloning" size="regular" color="whimsy" />
    }

    let label = status;
    if (status == "STOPPED") {
      label = "KILLED";
    }
    else if (status == "PENDING") {
      label = "UPDATING";
    }

    return (
      <span className={rootClassNames}>
        {icon}{label}
      </span>
    );
  }
  const diffPhrase = getAge(config.updated_at);

  const numUpdatingOffChainActors = config.testnet_off_chain_actors.filter(it => it.status == "PENDING").length;
  const updatingOffchainPhrase = `${numUpdatingOffChainActors} off chain updating`;

  const numUpdatingChains = config.testnet_chains.filter(it => it.status == "PENDING").length;
  const updatingBlockchainPhrase = `${numUpdatingChains} Blockchain${numUpdatingChains == 1 ? '' : 's'} updating`;

  const numChainsPhrase = `${config.testnet_chains.length} Blockchain${config.testnet_chains.length == 1 ? '' : 's' }`;
  const offChainPhrase = `${config.testnet_off_chain_actors.length} off-chain actor${config.testnet_off_chain_actors.length == 1 ? '' : 's'}`;

  let rootClasses = "card-root";
  if (config.status == "STOPPED") {
    rootClasses += " killed";
  }
  else if (config.status == "FAILED") {
    rootClasses += " failed";
  }

  return (
    <div className={rootClasses} key={config.id}>
      <div className="card-itemrow">
        <div className="left">
          <span className="title typography-h2">{config.name}</span>
          <Badge>
            <span className="typography-semibold-14 typography-faded-1">
              5321
            </span>
          </Badge>

        </div>
        <div className="right">
          {getStatus(config.status)}
          <Icon name="dot" color="faded-1" size="extrasmall"></Icon>
          <span className="vertically-center typography-semibold-14 typography-link">
            <Icon name="gear" size="regular" color="linkblue"></Icon>
            Settings
          </span>
        </div>
      </div>
      <div className="card-itemrow">
        <div className="left">
          <span className="typography-medium-14">
            {offChainPhrase}
          </span>
          <Icon name="dot" color="faded-1" size="extrasmall"></Icon>
          <span className="typography-medium-14">
            {numChainsPhrase}
          </span>
          <span className="logo-group">
            {config.testnet_chains.map(getChainImage)}
          </span>
        </div>
        <div className="right">
          <Icon name="clock" size="regular" color="faded-1" />
          <span className="typography-faded-1 typography-medium-13">
            Modified {diffPhrase}
          </span>
        </div>
      </div>
      {
        config.status == "PENDING" && (<div className="card-itemrow">
          <div className="left">
            <Icon name="standinghourglass" color="warning" size="regular"></Icon>
            <span className="typography-warning typography-medium-14">{updatingOffchainPhrase}</span>
            <Icon name="dot" color="faded-1" size="extrasmall"></Icon>
            <Icon name="standinghourglass" color="warning" size="regular"></Icon>
            <span className="typography-warning typography-medium-14">{updatingBlockchainPhrase}</span>
          </div>
        </div>)
      }
    </div>
  );
}