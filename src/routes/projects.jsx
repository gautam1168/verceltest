import { useLoaderData } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Button from "../components/button";
import Icon from "../components/icon";
import "./projects.css";
import Dropdown from "../components/dropdown";
import Badge from "../components/badge";
import { useEffect, useState } from "react";

function useTestnet()
{
  const { projects } = useLoaderData();
  const numTestnets = Object.keys(projects.testnet).length;
  const [shownIndices, setShownIndices] = useState(new Array(numTestnets).fill(0).map((it, i) => i));
  return {
    testnet: projects.testnet,
    shownIndices,
    setShownIndices
  };
}

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
    else if (status == "FAILED")
    {
      classNames += " typography-failed-red";
      icon = <Icon name="failed" size="regular" color="failed" />
    }

    if (status == "STOPPED")
    {
      status = "KILLED";
    }

    return (
      <span className={classNames}>
        {icon}{status}
      </span>
    );
  }

  const { testnet, shownIndices, setShownIndices } = useTestnet();
  let cards = "loading..."; 
  if (testnet)
  {
    cards = shownIndices.map(index => {
      const item = testnet[index];
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

      let rootClasses = "card-root";
      if (item.status == "STOPPED") 
      {
        rootClasses += " killed";
      }
      else if (item.status == "FAILED")
      {
        rootClasses += " failed";
      }

      return (
        <div className={rootClasses} key={item.id}>
          <div className="card-itemrow">
            <div className="left">
              <span className="title typography-h2">{item.name}</span>
              <Badge>
                <span className="typography-semibold-14 typography-gray9">
                  5321
                </span>
              </Badge>
              
            </div>
            <div className="right">
              { getStatus(item.status) }
              <Icon name="dot" color="faded" size="extrasmall"></Icon>
              <span className="vertically-center typography-semibold-14 typography-link-lightblue">
                <Icon name="gear" size="regular" color="linkblue"></Icon>
                Settings
              </span>
            </div>
          </div>
          <div className="card-itemrow">
            <div className="left">
              <span>{item.testnet_off_chain_actors.length} off chain actors</span>
              <Icon name="dot" color="faded" size="extrasmall"></Icon>
              <span>{item.testnet_chains.length} Blockchain</span>
              {item.testnet_chains.map(getChainImage)}
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
    { value: "ALL", label: "All", icon: "all", color: "linkblue"  },
    { value: "RUNNING", label: "Running", icon: "tick", color: "success" },
    { value: "STANDING", label: "Standing up", icon: "standinghourglass", color: "warning" },
    { value: "PENDING", label: "Updating", icon: "standinghourglass", color: "warning" },
    { value: "FAILED", label: "Failed", icon: "failed", color: "failed" },
    { value: "STOPPED", label: "Killed", icon: "killed", color: "faded" }
  ];

  const sortOptions = [
    { value: "name", sense: "ASC", label: "Name A-Z" },
    { value: "name", sense: "DEC", label: "Name Z-A" },
    { value: "status", sense: "ASC", label: "Status" },
    { value: "created_at", sense: "ASC", label: "Date created" },
    { value: "updated_at", sense: "ASC", label: "Last modified" },
  ];

  const [selectedFilter, setSelectedFilter] = useState();
  const [selectedSort, setSelectedSort] = useState();


  const handleFilter = (filter) => {
    setSelectedFilter(filter);
    const newIndices = new Array(testnet.length).fill(0).map((it, i) => i);
    if (filter.value == "ALL")
    {
      setShownIndices(newIndices)
    }
    else 
    {
      const filteredIndices = newIndices.filter(it => 
        testnet[it].status == filter.value 
      );
      setShownIndices(filteredIndices);
    }
  };

  const handleSort = (sort) => {
    debugger
    setSelectedSort(sort);
    let newIndices = new Array(testnet.length).fill(0).map((it, i) => i);
    const filter = selectedFilter;
    if (filter.value !== "ALL")
    {
      newIndices = newIndices.filter(it => testnet[it].status == filter.value);
    }

    if (sort.value.endsWith("_at"))
    {
      newIndices.sort((a, b) => {
        return new Date(testnet[a][sort.value]) < new Date(testnet[b][sort.value]) ? -1 : 1;
      });
    }
    else if (sort.sense == "ASC")
    {
      newIndices.sort((a, b) => {
        return testnet[a][sort.value] < testnet[b][sort.value] ? -1 : 1;
      });
    }
    else if (sort.sense == "DEC")
    {
      newIndices.sort((a, b) => {
        return testnet[a][sort.value] > testnet[b][sort.value] ? -1 : 1;
      });
    }
    setShownIndices(newIndices);
  }
  
  useEffect(() => {
    if (!selectedFilter)
    {
      setSelectedFilter(filterOptions[0]);
    }

    if (!selectedSort)
    {
      setSelectedSort(sortOptions[0]);
    }
  }, []);

  return (<div className="projects-root">
    <Sidebar />
    <div className="projects-body">
      <div className="project-data-controls">
        <div className="left">
          <div className="typography-h2">
            Testnets (8)
          </div>
          <Button variant="primary" size="large"> 
            <div className="addtestnet-content">
              <Icon name="add" color="linkblue" size="regular"></Icon>
              New Testnet
            </div>
          </Button>
        </div>
        <div className="right">
          <Dropdown 
            label="Filter by:" 
            options={filterOptions}
            selectedValue={selectedFilter}
            onChange={handleFilter}
          />
          <Icon name="dot" color="faded" size="extrasmall"></Icon>
          <Dropdown 
            label="Sort by:" 
            options={sortOptions} 
            selectedValue={selectedSort}
            onChange={handleSort}
          />
        </div>
      </div>
      <div className="cards-container">{cards}</div>
    </div>
  </div>);
}