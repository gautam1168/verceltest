// TODO: Make all import orders same in all files
// TODO: All css files should have similar scheme
// TOTO: Add library so manual handling of className is not needed
// TODO: Fix the toggling of dropdown
// TODO: Final pass on styling
// TODO: Add parameter in router and activate back to all project button and sidebar buttons
// TODO: Maybe add logrocket
// TODO: Maybe add alerts on no-op of button
// TODO: Color of cloning in dropdown
// TODO: Verify time calculation on cards

import "./projects.css";
import Sidebar from "../components/sidebar";
import Button from "../components/button";
import Icon from "../components/icon";
import Dropdown from "../components/dropdown";
import Card from "../components/card";

import { useProjectStore, filterOptions, sortOptions } from "../store";

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