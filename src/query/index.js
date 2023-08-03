export async function getProjects()
{
  const projects = await fetch("/data.json").then(res => res.json());
  return { projects };
}