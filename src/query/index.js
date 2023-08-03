export async function getProjects({params})
{
  console.log("Loading project for: ", params);
  const projects = await fetch("/data.json").then(res => res.json());
  return { projects };
}