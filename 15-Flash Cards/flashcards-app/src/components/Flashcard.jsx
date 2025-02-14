import { useState } from "react";
import PropTypes from "prop-types";

function Flashcard({ question, answer }) {
    const [flipped, setFlipped] = useState(false);
  
    return (
      <div
        className={`flashcard ${flipped ? "flipped" : ""}`}
        onClick={() => setFlipped(!flipped)}
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
