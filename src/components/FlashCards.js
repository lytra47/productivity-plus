import { useState } from "react";
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

  function handleAddCard(newCard) {
    setCardList((currCards) => [...currCards, newCard]);
  }
  function handleDeleteCard(id) {
    setCardList((currCards) => currCards.filter((card) => card.id !== id));
  }
  return (
    <div className="container">
      <CreateFlashCard onAddCard={handleAddCard} />
      <DisplayCardList cardList={cardList} onDeleteCard={handleDeleteCard} />
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
    <Form
      formName="Create New Flash Card"
      btnName="Add Flash Card"
      onSubmit={handleSubmit}
    >
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
    </Form>
  );
}

function DisplayCardList({ cardList, onDeleteCard }) {
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
                  <Button addonClass="btn-card-delete" position="btn-left">
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
