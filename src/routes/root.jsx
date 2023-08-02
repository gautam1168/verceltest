import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

export default function Root() {
  return (
    <>
      <Navbar />
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