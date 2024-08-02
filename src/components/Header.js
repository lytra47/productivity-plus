import Button from "./Button";

export default function Header({ currentPage, onPageSet }) {
  return (
    <header className="header">
      <div className="logo">Productivity+</div>
      <div>
        <Button
          position="btn-left"
          onClick={() => onPageSet("tasks")}
          addonClass={`${currentPage === "tasks" ? "btn-active" : ""}`}
        >
          tasks
        </Button>
        <Button
          onClick={() => onPageSet("flash")}
          addonClass={`${currentPage === "flash" ? "btn-active" : ""}`}
        >
          flash cards
        </Button>
        <Button
          onClick={() => onPageSet("notes")}
          position="btn-right"
          addonClass={`${currentPage === "notes" ? "btn-active" : ""}`}
        >
          notes
        </Button>
      </div>
    </header>
  );
}
