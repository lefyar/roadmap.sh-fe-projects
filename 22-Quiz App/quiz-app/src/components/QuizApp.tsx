import { useEffect, useRef, useState } from "react";
import { Quizzes } from "../data/quizzes";

type Phase = "start" | "quiz" | "results";

export default function QuizApp() {
  const [phase, setPhase] = useState<Phase>("start");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const heading = useRef<HTMLHeadingElement>(null);
  const quiz = Quizzes[index];
  const answer = answers[index];
  const correct = quiz.answer === answer;

  useEffect(() => { if (phase !== "start") heading.current?.focus(); }, [phase, index]);

  function select(option: string) {
    setAnswers(previous => previous.length === index ? [...previous, option] : previous);
  }

  return (
    <section className="quiz-card" aria-labelledby="quiz-title">
      {phase === "start" && <>
        <h1 id="quiz-title">Indonesia Quiz</h1>
        <p>Test your knowledge with {Quizzes.length} questions about Indonesian history and geography.</p>
        <button className="primary" onClick={() => setPhase("quiz")}>Start quiz</button>
      </>}
      {phase === "quiz" && <>
        <p className="quiz-progress">Question {index + 1} of {Quizzes.length}</p>
        <h1 id="quiz-title" tabIndex={-1} ref={heading}>{quiz.question}</h1>
        <div className="quiz-options">
          {quiz.options.map(option => <button key={option} onClick={() => select(option)}
            className={answer && option === quiz.answer ? "correct" : answer === option ? "incorrect" : undefined}
            aria-disabled={answer !== undefined} aria-pressed={answer === option}>
            {option}
          </button>)}
        </div>
        <p role="status">{answer && (correct ? "Correct." : `Correct answer: ${quiz.answer}.`)}</p>
        <button className="primary" disabled={!answer} onClick={() => {
          if (index === Quizzes.length - 1) setPhase("results");
          else setIndex(index + 1);
        }}>{index === Quizzes.length - 1 ? "See results" : "Next question"}</button>
      </>}
      {phase === "results" && <>
        <h1 id="quiz-title" tabIndex={-1} ref={heading}>Results</h1>
        <p>You got {Quizzes.filter((item, i) => item.answer === answers[i]).length} of {Quizzes.length} correct.</p>
        <ol className="quiz-review">
          {Quizzes.map((item, i) => <li key={item.id}>
            <strong>{item.question}</strong>
            <p>{answers[i] === item.answer ? `Correct: ${item.answer}` : `You chose ${answers[i]}. Correct answer: ${item.answer}.`}</p>
          </li>)}
        </ol>
        <button className="primary" onClick={() => { setAnswers([]); setIndex(0); setPhase("quiz"); }}>Try again</button>
      </>}
    </section>
  );
}
