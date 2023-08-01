import { useLoaderData } from "react-router-dom";
import Sidebar from "../components/sidebar";
import "./projects.css";

export default function Projects()
{
  const { projects } = useLoaderData();
  let cards = "loading..."; 
  if (projects.testnet)
  {
    cards = Object.values(projects.testnet).map(item => <div key={item.id}>{item.name}</div>);
  }

  return (<div className="projects-root">
    <Sidebar />
    <div>
      {cards}
    </div>
  </div>);
}