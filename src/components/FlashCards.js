import { useState, useEffect } from "react";
import Form from "./Form";
import Button from "./Button";

const initialCards = [
  {
    id: 1,
    question: "What's this?",
    answer:
      "Oppo is preparing the flagship Find X8 family, comprising of the vanilla X8, the X8 Pro, and the X8 Ultra, and today the battery capacities.comprising of the vanilla X8, the X8 Pro, and the X",
  },
  { id: 2, question: "Do that now!", answer: "That" },
  {
    id: 3,
    question: "Do something",
    answer: "Wow",
  },
];

export default function FlashCards() {
  const [cardList, setCardList] = useState(initialCards);
  const [editSelect, setEditSelect] = useState(null);

  function handleAddCard(newCard) {
    setCardList((currCards) => [...currCards, newCard]);
  }
  function handleDeleteCard(id) {
    handleCancelEdit();
    setCardList((currCards) => currCards.filter((card) => card.id !== id));
  }
  function handleUpdateCard(updatedCard) {
    setCardList((currList) =>
      currList.map((card) => (card.id === updatedCard.id ? updatedCard : card))
    );
  }
  function handleSetEditTask(id) {
    setEditSelect(id);
  }
  function handleCancelEdit() {
    setEditSelect(null);
  }
  return (
    <div className="container">
      {editSelect ? (
        <EditCard
          cardList={cardList}
          editSelect={editSelect}
          onCancelEdit={handleCancelEdit}
          onUpdateCard={handleUpdateCard}
        />
      ) : (
        <CreateFlashCard cardList={cardList} onAddCard={handleAddCard} />
      )}
      <DisplayCardList
        cardList={cardList}
        onDeleteCard={handleDeleteCard}
        onEditCard={handleSetEditTask}
      />
    </div>
  );
}

function CreateFlashCard({ onAddCard }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (answer === "" || question === "") return;
    const newCard = {
      id: Date.now(),
      question,
      answer,
    };
    onAddCard(newCard);
    setQuestion("");
    setAnswer("");
  }
  return (
    <Form formName="Create New Flash Card" onSubmit={handleSubmit}>
      <label>Question:</label>
      <input
        value={question}
        type="text"
        onChange={(e) => setQuestion(e.target.value)}
      />
      <br />
      <label>Answer:</label>
      <input
        value={answer}
        type="text"
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button className="button btn-alone">Add Card</button>
    </Form>
  );
}

function EditCard({ cardList, editSelect, onCancelEdit, onUpdateCard }) {
  const [editedQuestion, setEditedQuestion] = useState("");
  const [editedAnswer, setEditedAnswer] = useState("");

  useEffect(
    function () {
      setEditedQuestion(
        cardList.find((card) => card.id === editSelect).question
      );
      setEditedAnswer(cardList.find((card) => card.id === editSelect).answer);
    },
    [cardList, editSelect]
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (editedQuestion === "" || editedAnswer === "") return;
    const updatedTask = {
      id: editSelect,
      question: editedQuestion,
      answer: editedAnswer,
    };
    onUpdateCard(updatedTask);

    onCancelEdit();
    setEditedQuestion("");
    setEditedAnswer("");
  }
  return (
    <Form onSubmit={handleSubmit} formName={`Edit card ${editSelect}`}>
      {" "}
      <label>Edit Question:</label>
      <input
        value={editedQuestion}
        type="text"
        onChange={(e) => setEditedQuestion(e.target.value)}
      />
      <br />
      <label>Edit Answer:</label>
      <input
        value={editedAnswer}
        type="text"
        onChange={(e) => setEditedAnswer(e.target.value)}
      />
      <button type="submit" className="button btn-left">
        Update Card
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

function DisplayCardList({ cardList, onDeleteCard, onEditCard }) {
  const [selected, setSelected] = useState(null);

  function handleSelection(id) {
    setSelected((cur) => (cur === id ? null : id));
  }
  return (
    <div className="subcontainer">
      <h3>Flash Cards</h3>
      <ul>
        {cardList.map((card) => (
          <li
            onClick={() => handleSelection(card.id)}
            key={card.id}
            className="display-flash-cards"
          >
            {selected === card.id ? (
              <>
                <p className="card-answer">{card.answer}</p>
                <div className="card-back-options">
                  <Button
                    addonClass="btn-card-delete"
                    position="btn-left"
                    onClick={() => onEditCard(card.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    addonClass="btn-card-delete"
                    position="btn-right"
                    onClick={() => onDeleteCard(card.id)}
                  >
                    delete
                  </Button>
                </div>
              </>
            ) : (
              <h4 className="card-front">{card.question}</h4>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
