import Button from "./Button";

export default function Header({ currentPage, onPageSet }) {
  return (
    <header className="header">
      <div className="logo">Productivity Plus</div>
      <div>
        <Button
          position="btn-left"
          onClick={onPageSet}
          value={"tasks"}
          addonClass={`${currentPage === "tasks" ? "btn-active" : ""}`}
        >
          tasks
        </Button>
        <Button
          onClick={onPageSet}
          addonClass={`${currentPage === "flash" ? "btn-active" : ""}`}
          value={"flash"}
        >
          flash cards
        </Button>
        <Button
          onClick={onPageSet}
          position="btn-right"
          addonClass={`${currentPage === "notes" ? "btn-active" : ""}`}
          value={"notes"}
        >
          notes
        </Button>
      </div>
    </header>
  );
}
