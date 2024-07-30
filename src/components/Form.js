export default function Form({ children, onSubmit, btnName, formName }) {
  return (
    <div className="subcontainer">
      <h3>{formName}</h3>
      <form onSubmit={onSubmit}>
        <div>{children}</div>
        <button className="button btn-alone">{btnName}</button>
      </form>
    </div>
  );
}
