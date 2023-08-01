import "./badge.css";
export default function Badge({children})
{
  return (
    <div className="badge-root">
      {children}
    </div>
  );
}