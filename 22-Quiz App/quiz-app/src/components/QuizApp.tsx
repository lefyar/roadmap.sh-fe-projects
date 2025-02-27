import { useState } from "react";
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
        <p className="text-lg text-[#f1f1f1]">
          You scored {score} out of {Quizzes.length}
        </p>
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
