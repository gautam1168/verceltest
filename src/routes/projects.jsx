import "./projects.css";
import { useLoaderData } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Button from "../components/button";
import Icon from "../components/icon";
import Dropdown from "../components/dropdown";
import { useReducer } from "react";
import Card from "../components/card";

const filterOptions = [
  { value: "ALL", label: "All", icon: "all", color: "linkblue" },
  { value: "RUNNING", label: "Running", icon: "tick", color: "success" },
  { value: "STANDING", label: "Standing up", icon: "standinghourglass", color: "warning" },
  { value: "PENDING", label: "Updating", icon: "standinghourglass", color: "warning" },
  { value: "FAILED", label: "Failed", icon: "failed", color: "failed" },
  { value: "STOPPED", label: "Killed", icon: "killed", color: "faded" },
  { value: "CLONING", label: "Cloning", icon: "cloning", color: "purple" }
];

const sortOptions = [
  { value: "name", sense: "ASC", label: "Name A-Z" },
  { value: "name", sense: "DEC", label: "Name Z-A" },
  { value: "status", sense: "ASC", label: "Status" },
  { value: "created_at", sense: "ASC", label: "Date created" },
  { value: "updated_at", sense: "ASC", label: "Last modified" },
];

function sortAndFilterIndices(filterconf, sortconf, testnet)
{
  let newIndices = new Array(testnet.length).fill(0).map((it, i) => i);
  if (filterconf.value !== "ALL") {
    newIndices = newIndices.filter(it => testnet[it].status == filterconf.value);
  }

  // TODO store the dates as dates to remove this if branch
  if (sortconf.value.endsWith("_at")) {
    newIndices.sort((a, b) => {
      return new Date(testnet[a][sortconf.value]) < new Date(testnet[b][sortconf.value]) ? -1 : 1;
    });
  }
  else if (sortconf.sense == "ASC") {
    newIndices.sort((a, b) => {
      return testnet[a][sortconf.value] < testnet[b][sortconf.value] ? -1 : 1;
    });
  }
  else if (sortconf.sense == "DEC") {
    newIndices.sort((a, b) => {
      return testnet[a][sortconf.value] > testnet[b][sortconf.value] ? -1 : 1;
    });
  }
  return newIndices;
}

function initializer({projects, filterOptions, sortOptions})
{
  const shownIndices = sortAndFilterIndices(filterOptions[0], sortOptions[0], projects.testnet);
  return {
    testnet: projects.testnet,
    shownIndices,
    selectedFilter: filterOptions[0],
    selectedSort: sortOptions[0]
  };
}

function testnetReducer(state, action) 
{
  switch(action.type)
  {
    case "SET_SORT":
      {
        const newIndices = sortAndFilterIndices(state.selectedFilter, action.payload, state.testnet);
        return {
          ...state,
          selectedSort: action.payload,
          shownIndices: newIndices
        };
      }
      break;
    case "SET_FILTER":
      {
        const newIndices = sortAndFilterIndices(action.payload, state.selectedSort, state.testnet);
        return {
          ...state,
          selectedFilter: action.payload,
          shownIndices: newIndices
        };
      }
      break;
    default:
      throw new Error("Unrecognized action type: " + action.type);
  }
}

function useProjectStore()
{
  const { projects } = useLoaderData();
  const store = useReducer(testnetReducer,
    { projects, filterOptions, sortOptions },
    initializer);
  return store;
}

export default function Projects()
{
  const [state, dispatch] = useProjectStore();

  return (<div className="projects-root">
    <Sidebar />
    <div className="projects-body">
      <div className="project-data-controls">
        <div className="left">
          <div className="typography-h2">
            Testnets ({state.testnet.length})
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
            selectedValue={state.selectedFilter}
            onChange={(filterconf) => dispatch({ type: "SET_FILTER", payload: filterconf})}
          />
          <Icon name="dot" color="faded" size="extrasmall"></Icon>
          <Dropdown 
            label="Sort by:" 
            options={sortOptions} 
            selectedValue={state.selectedSort}
            onChange={(sortconf) => dispatch({ type: "SET_SORT", payload: sortconf})}
          />
        </div>
      </div>
      <div className="cards-container">
        {
          state.shownIndices.map(index => {
            const conf = state.testnet[index];
            return (<Card key={conf.id} config={conf}></Card>);
          })
        }
      </div>
    </div>
  </div>);
}