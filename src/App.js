import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import FlashCards from "./components/FlashCards";
import Notes from "./components/Notes";

export default function App() {
  const [currentPage, setCurrentPage] = useState("notes");
  function handleSetPage(pageId) {
    setCurrentPage(pageId);
  }
  return (
    <div className="app">
      <Header currentPage={currentPage} onPageSet={handleSetPage} />
      {currentPage === "tasks" && <Tasks />}
      {currentPage === "flash" && <FlashCards />}
      {currentPage === "notes" && <Notes />}
      <Footer />
    </div>
  );
}
