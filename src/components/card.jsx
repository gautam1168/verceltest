import "./card.css";
import Badge from "../components/badge";
import Icon from "../components/icon";

function getAge(updated_at)
{
  const updatedAt = new Date(updated_at);
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
    let classNames = "vertically-center typography-semibold-14";
    let icon = null;
    if (status == "RUNNING") {
      classNames += " typography-success-green-dark";
      icon = <Icon name="tick" size="regular" color="success" />
    }
    else if (status == "STOPPED") {
      classNames += " typography-graya";
      icon = <Icon name="killed" size="regular" color="faded" />;
    }
    else if (status == "PENDING" || status == "STANDING") {
      classNames += " typography-warning-yellow";
      icon = <Icon name="standinghourglass" size="regular" color="warning" />
    }
    else if (status == "FAILED") {
      classNames += " typography-failed-red";
      icon = <Icon name="failed" size="regular" color="failed" />
    }
    else if (status == "CLONING") {
      classNames += " typography-cloning-purple";
      icon = <Icon name="cloning" size="regular" color="purple" />
    }

    if (status == "STOPPED") {
      status = "KILLED";
    }
    else if (status == "PENDING") {
      status = "UPDATING";
    }

    return (
      <span className={classNames}>
        {icon}{status}
      </span>
    );
  }
  const diffPhrase = getAge(config.updated_at);

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
            <span className="typography-semibold-14 typography-gray9">
              5321
            </span>
          </Badge>

        </div>
        <div className="right">
          {getStatus(config.status)}
          <Icon name="dot" color="faded" size="extrasmall"></Icon>
          <span className="vertically-center typography-semibold-14 typography-link-lightblue">
            <Icon name="gear" size="regular" color="linkblue"></Icon>
            Settings
          </span>
        </div>
      </div>
      <div className="card-itemrow">
        <div className="left">
          <span className="typography-medium-14">
            {config.testnet_off_chain_actors.length} off-chain actors
          </span>
          <Icon name="dot" color="faded" size="extrasmall"></Icon>
          <span className="typography-medium-14">
            {config.testnet_chains.length} Blockchain
          </span>
          <span className="logo-group">
            {config.testnet_chains.map(getChainImage)}
          </span>
        </div>
        <div className="right">
          <Icon name="clock" size="regular" color="faded" />
          <span className="typography-graya typography-medium-13">
            Modified {diffPhrase}
          </span>
        </div>
      </div>
      {
        config.status == "PENDING" && (<div className="card-itemrow">
          <div className="left">
            <Icon name="standinghourglass" color="warning" size="regular"></Icon>
            <span className="typography-warning-yellow typography-medium-14">{config.testnet_off_chain_actors.length} off chain updating</span>
            <Icon name="dot" color="faded" size="extrasmall"></Icon>
            <Icon name="standinghourglass" color="warning" size="regular"></Icon>
            <span className="typography-warning-yellow typography-medium-14">{config.testnet_chains.length} Blockchains updating</span>
          </div>
        </div>)
      }
    </div>
  );
}