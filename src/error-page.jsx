import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage()
{
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <Link to={"projects"}>Home</Link>
      <h1>Not found</h1>
      <p>{error.statusText || error.message}</p>
    </div>
  );
}