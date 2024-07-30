export default function Button({
  children,
  onClick,
  position,
  addonClass,
  value,
}) {
  function handleClick() {
    onClick(value);
  }
  return (
    <button
      onClick={handleClick}
      className={`button ${position} ${addonClass}`}
    >
      <p> {children}</p>
    </button>
  );
}
