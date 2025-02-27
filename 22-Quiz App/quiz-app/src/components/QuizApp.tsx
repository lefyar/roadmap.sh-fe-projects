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

  if (!hasStarted) {
    return <StartScreen startQuiz={startQuiz} />;
  }

  if (showResults) {
    return (
      <div className="bg-[#1b1b1b] text-[#f1f1f1] flex flex-col items-center justify-between p-10 border-2 border-[#2c2c2c] hover:border-[#f1f1f1] rounded-md text-center w-150 h-70 transition-colors">
        <h1 className="text-2xl font-bold">Results</h1>
        <p className="text-lg text-[#777]">
          You scored {score} out of {Quizzes.length}
        </p>
        <button
          onClick={restartQuiz}
          className="border-2 border-[#2c2c2c] hover:bg-[#f1f1f1] hover:text-[#1b1b1b] py-2 px-4 rounded cursor-pointer transition-colors"
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  return <QuizCard quiz={Quizzes[currentIndex]} selectedAnswer={selectedAnswer} handleAnswerClick={handleAnswerClick} />
}
