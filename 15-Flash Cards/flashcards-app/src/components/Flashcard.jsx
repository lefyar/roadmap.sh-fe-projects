import { useState } from "react";
import PropTypes from "prop-types";

function Flashcard({ question, answer }) {
  const [flipped, setFlipped] = useState(false);

  const toggle = () => setFlipped((value) => !value);

  const onKey = (event) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      toggle();
    }
  };

  return (
    <div
      className={`flashcard ${flipped ? "flipped" : ""}`}
      onClick={toggle}
      onKeyDown={onKey}
      tabIndex={0}
      role="button"
      aria-expanded={flipped}
      aria-label={flipped ? `Answer: ${answer}` : `Question: ${question}`}
    >
      <h2>{flipped ? answer : question}</h2>
      <p>{flipped ? "Click to show question" : "Click to show answer"}</p>
    </div>
  );
}

Flashcard.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};

export default Flashcard;
