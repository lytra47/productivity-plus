export default function Form({ children, onSubmit, formName }) {
  return (
    <div className="subcontainer">
      <h2>{formName}</h2>
      <form className="form" onSubmit={onSubmit}>
        <div>{children}</div>
      </form>
    </div>
  );
}
