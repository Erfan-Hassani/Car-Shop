
interface IContainer{
    children:React.ReactNode
}
export default function Container ({children}:IContainer) {
  return (
    <div className="w-9/12 mx-auto"> {children}</div>
  );
}