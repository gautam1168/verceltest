import { useReducer } from "react";
import { useLoaderData } from "react-router-dom";

export const filterOptions = [
  { value: "ALL", label: "All", icon: "all", color: "linkblue" },
  { value: "RUNNING", label: "Running", icon: "tick", color: "success" },
  { value: "STANDING", label: "Standing up", icon: "standinghourglass", color: "warning" },
  { value: "PENDING", label: "Updating", icon: "standinghourglass", color: "warning" },
  { value: "FAILED", label: "Failed", icon: "failed", color: "failed" },
  { value: "STOPPED", label: "Killed", icon: "killed", color: "faded-1" },
  { value: "CLONING", label: "Cloning", icon: "cloning", color: "whimsy" }
];

export const sortOptions = [
  { value: "name", sense: "ASC", label: "Name A-Z" },
  { value: "name", sense: "DEC", label: "Name Z-A" },
  { value: "status", sense: "ASC", label: "Status" },
  { value: "created_at", sense: "DEC", label: "Date created" },
  { value: "updated_at", sense: "DEC", label: "Last modified" },
];

function initializer({projects, filterOptions, sortOptions})
{
  const shownIndices = sortAndFilterIndices(filterOptions[0], sortOptions[0], projects.testnet);
  for (let net of projects.testnet)
  {
    net.created_at = new Date(net.created_at);
    net.updated_at = new Date(net.updated_at);
  }

  return {
    sidebarItems: [
      { label: "Testnets", prefixIcon: "testnets", count: projects.testnet.length, suffixIcon: "add", selected: true, level: 2 },
      { label: "Members", prefixIcon: "members", count: 1, suffixIcon: "add", level: 2 },
      { label: "Project Key", prefixIcon: "projectkey", suffixIcon: "cloning", level: 2 },
    ],
    testnet: projects.testnet,
    shownIndices,
    selectedFilter: filterOptions[0],
    selectedSort: sortOptions[0]
  };
}

function sortAndFilterIndices(filterconf, sortconf, testnet)
{
  let newIndices = new Array(testnet.length).fill(0).map((it, i) => i);
  if (filterconf.value !== "ALL") {
    newIndices = newIndices.filter(it => testnet[it].status == filterconf.value);
  }

  if (sortconf.sense == "ASC") {
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

export function useProjectStore()
{
  const { projects } = useLoaderData();
  const store = useReducer(
    testnetReducer,
    { projects, filterOptions, sortOptions },
    initializer
  );
  return store;
}