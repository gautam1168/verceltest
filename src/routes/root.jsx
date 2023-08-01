import { Outlet, Link } from "react-router-dom";
export default function Root() {
  return (
    <>
      <div>
        <ul>
          <li>
            <Link to={'projects'}>Projects</Link>
          </li>
          <li>
            <Link to={'docs'}>Docs</Link>
          </li>
          <li>
            <Link to={'cheatsheet'}>Command Cheatsheet</Link>
          </li>
        </ul>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

export async function loader()
{
  const projects = await fetch("/data.json").then(res => res.json());
  return { projects };
}