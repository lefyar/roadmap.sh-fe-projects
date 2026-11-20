export default function Flashcard({ question, answer, showAnswer, onToggle }) {
  return (
    <section className="flashcard" aria-labelledby="card-question">
      <h2 id="card-question" aria-live="polite">{question}</h2>
      <button type="button" aria-expanded={showAnswer} aria-controls="card-answer" onClick={onToggle}>
        {showAnswer ? "Hide answer" : "Show answer"}
      </button>
      <p id="card-answer" hidden={!showAnswer}>{answer}</p>
    </section>
  );
}
