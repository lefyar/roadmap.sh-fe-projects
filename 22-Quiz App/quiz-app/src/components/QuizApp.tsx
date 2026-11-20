import { useEffect, useState } from "react";
import useQuiz from "../hook/useQuiz";
import QuizCard from "./QuizCard";
import StartScreen from "./StartScreen";
import { Quizzes } from "../data/quizzes";

export default function Quiz() {
  const {
    currentIndex,
    score,
    selectedAnswer,
    showResults,
    hasStarted,
    startQuiz,
    handleAnswerClick,
    restartQuiz,
  } = useQuiz();

  const [isClicked, setIsClicked] = useState(false);
  const currentQuiz = Quizzes[currentIndex];

  const handleKey = (event: KeyboardEvent) => {
    if (!hasStarted || showResults || selectedAnswer || !currentQuiz) return;
    const keyIndex = event.key.toUpperCase().charCodeAt(0) - "A".charCodeAt(0);
    if (keyIndex >= 0 && keyIndex < currentQuiz.options.length) {
      event.preventDefault();
      handleAnswerClick(currentQuiz.options[keyIndex]);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [hasStarted, showResults, selectedAnswer, currentQuiz]);

  const handleClick = () => {
    setIsClicked(true);
    restartQuiz();
  };

  if (!hasStarted) {
    return <StartScreen startQuiz={startQuiz} />;
  }

  if (showResults) {
    return (
      <div className="flex flex-col items-center p-6 border-2 border-[#f1f1f1] rounded-lg text-center w-full max-w-xl mx-4 md:mx-0 bg-[#1b1b1b] text-[#f1f1f1] shadow-lg gap-4">
        <h1 className="text-2xl font-bold">Results</h1>
        <p className="text-lg">
          You scored {score} out of {Quizzes.length} questions.
        </p>
        <ul className="flex flex-col gap-2 w-full text-left text-sm">
          {Quizzes.map((quiz) => (
            <li key={quiz.id} className="border-b border-[#333] pb-2">
              <span>
                {quiz.id}. {quiz.question}
              </span>{" "}
              <span className="text-[#ffce78]">— {quiz.answer}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={handleClick}
          className={`border-2 border-[#2c2c2c] py-2 px-4 rounded cursor-pointer transition-colors 
            ${
              isClicked
                ? "bg-[#f1f1f1] text-[#1b1b1b]"
                : "hover:bg-[#f1f1f1] hover:text-[#1b1b1b]"
            }
          `}
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  return (
    <QuizCard
      quiz={Quizzes[currentIndex]}
      selectedAnswer={selectedAnswer}
      handleAnswerClick={handleAnswerClick}
    />
  );
}
