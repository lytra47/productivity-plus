export default function Button({ children, onClick, position, addonClass }) {
  return (
    <button onClick={onClick} className={`button ${position} ${addonClass}`}>
      <p> {children}</p>
    </button>
  );
}
