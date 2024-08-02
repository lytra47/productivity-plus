export default function Form({ children, onSubmit, btnName, formName }) {
  return (
    <div className="subcontainer">
      <h2>{formName}</h2>
      <form className="form" onSubmit={onSubmit}>
        <div>{children}</div>
        <button className="button btn-alone">{btnName}</button>
      </form>
    </div>
  );
}
