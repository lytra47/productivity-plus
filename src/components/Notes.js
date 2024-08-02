import { useState } from "react";
import Form from "./Form";
import Button from "./Button";

const initialNotes = [
  {
    id: 1,
    heading: "What's this?",
    note: "This",
  },
  { id: 2, heading: "Do that now!", note: "That" },
  {
    id: 3,
    heading: "Do something",
    note: "Wow",
  },
];

export default function Notes() {
  const [notesList, setNotesList] = useState(initialNotes);

  function handleAddNote(newNote) {
    setNotesList((currNotes) => [...currNotes, newNote]);
  }
  function handleDeleteNote(id) {
    setNotesList((currNotes) => currNotes.filter((note) => note.id !== id));
  }

  return (
    <div className="container">
      <CreateNote onAddNote={handleAddNote} />
      <DisplayNotes notesList={notesList} onDeleteNote={handleDeleteNote} />
    </div>
  );
}

function CreateNote({ onAddNote }) {
  const [heading, setHeading] = useState("");
  const [note, setNote] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (heading === "" || note === "") return;
    const newNote = { id: Date.now(), heading, note };
    onAddNote(newNote);
    setHeading("");
    setNote("");
  }
  return (
    <Form formName="Add new note" btnName="Add note" onSubmit={handleSubmit}>
      <label>Note heading:</label>
      <input
        value={heading}
        onChange={(e) => setHeading(e.target.value)}
        type="text"
      />
      <label>Note :</label>
      <input
        value={note}
        onChange={(e) => setNote(e.target.value)}
        type="text"
      />
    </Form>
  );
}

function DisplayNotes({ notesList, onDeleteNote }) {
  return (
    <div className="subcontainer">
      <h3>Notes</h3>
      <ul>
        {notesList.map((note) => (
          <li className="displayListItem" key={note.id}>
            <h4>{note.heading}</h4>
            <p>{note.note}</p>
            <Button
              onClick={() => onDeleteNote(note.id)}
              addonClass="btn-alone"
            >
              X
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
