import { useState, useEffect } from "react";
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
  const [editSelect, setEditSelect] = useState(null);

  function handleAddNote(newNote) {
    setNotesList((currNotes) => [...currNotes, newNote]);
  }
  function handleDeleteNote(id) {
    handleCancelNote();
    setNotesList((currNotes) => currNotes.filter((note) => note.id !== id));
  }
  function handleUpdateNote(updatedNote) {
    setNotesList((currList) =>
      currList.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  }
  function handleSetEditNote(id) {
    setEditSelect(id);
  }
  function handleCancelNote() {
    setEditSelect(null);
  }

  return (
    <div className="container">
      {editSelect ? (
        <EditNote
          notesList={notesList}
          editSelect={editSelect}
          onCancelEdit={handleCancelNote}
          onUpdateNote={handleUpdateNote}
        />
      ) : (
        <CreateNote onAddNote={handleAddNote} />
      )}
      <DisplayNotes
        notesList={notesList}
        onDeleteNote={handleDeleteNote}
        onEditNote={handleSetEditNote}
      />
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
    <Form formName="Add new note" onSubmit={handleSubmit}>
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
      <button className="button btn-alone">Add Note</button>
    </Form>
  );
}

function EditNote({ notesList, editSelect, onCancelEdit, onUpdateNote }) {
  const [editedHeading, setEditedHeading] = useState("");
  const [editedNote, setEditedNote] = useState("");

  useEffect(
    function () {
      const heading = notesList.find((note) => note.id === editSelect).heading;
      const note = notesList.find((note) => note.id === editSelect).note;

      setEditedHeading(heading);
      setEditedNote(note);
    },
    [notesList, editSelect]
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (editedHeading === "" || editedNote === "") return;
    const updatedTask = {
      id: editSelect,
      heading: editedHeading,
      note: editedNote,
    };
    onUpdateNote(updatedTask);

    onCancelEdit();
    setEditedHeading("");
    setEditedNote("");
  }
  return (
    <Form onSubmit={handleSubmit} formName={`Edit Note ${editSelect}`}>
      {" "}
      <label>Edit Heading:</label>
      <input
        value={editedHeading}
        type="text"
        onChange={(e) => setEditedHeading(e.target.value)}
      />
      <br />
      <label>Edit Note:</label>
      <input
        value={editedNote}
        type="text"
        onChange={(e) => setEditedNote(e.target.value)}
      />
      <button type="submit" className="button btn-left">
        Update Note
      </button>
      <button
        className="button btn-right"
        onClick={(e) => {
          e.preventDefault();
          onCancelEdit();
        }}
      >
        Cancel
      </button>
    </Form>
  );
}

function DisplayNotes({ notesList, onDeleteNote, onEditNote }) {
  return (
    <div className="subcontainer">
      <h3>Notes</h3>
      <ul>
        {notesList.map((note) => (
          <li className="display-notes" key={note.id}>
            <h4>{note.heading}</h4>
            <hr />
            <div className="note-block">
              <p>{note.note}</p>
            </div>

            <div className="card-back-options">
              <Button
                addonClass="btn-card-delete"
                position="btn-left"
                onClick={() => onEditNote(note.id)}
              >
                Edit
              </Button>
              <Button
                addonClass="btn-card-delete"
                position="btn-right"
                onClick={() => onDeleteNote(note.id)}
              >
                delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
