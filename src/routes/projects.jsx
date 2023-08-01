import { useLoaderData } from "react-router-dom";

export default function Projects()
{
  const { projects } = useLoaderData();
  let cards = "loading..."; 
  if (projects.testnet)
  {
    cards = Object.values(projects.testnet).map(item => <div key={item.id}>{item.name}</div>);
  }

  return (<div>
    Projects list
    {cards}
  </div>);
}