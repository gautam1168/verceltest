import { useEffect } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";

export default function Project() 
{
  const location = useLocation();
  let links = null;
  if (location.pathname == "/projects")
  {
    links = (<div>
      All projects
      <ul>
        <li> 
          <Link to={'/projects/acme-project'}>Acme project</Link>
        </li>
      </ul>
      </div>);
  }
  useEffect(() => {
    console.log("Location: ", location)
  });

  return (<>{links}<Outlet></Outlet></>);
}