import { useLoaderData } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Button from "../components/button";
import Icon from "../components/icon";
import "./projects.css";
import Dropdown from "../components/dropdown";
import { useEffect, useState } from "react";
import Card from "../components/card";

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
  const { testnet, shownIndices, setShownIndices } = useTestnet();
  let cards = "loading..."; 
  if (testnet)
  {
    cards = shownIndices.map(index => {
      const item = testnet[index];
      return (<Card config={item}></Card>);
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
            Testnets ({testnet.length})
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
      <div className="cards-container">
        {cards}
      </div>
    </div>
  </div>);
}