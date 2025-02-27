import { useState } from "react";
import { Quizzes } from "../data/quizzes";

export default function useQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const startQuiz = () => {
    setTimeout(() => {
      setHasStarted(true);
    }, 300);
  };

  const handleAnswerClick = (option: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(option);

    if (option === Quizzes[currentIndex].answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentIndex + 1 < Quizzes.length) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
      } else {
        setShowResults(true);
      }
    }, 1000);
  };

  const restartQuiz = () => {
    setTimeout(() => {
      setCurrentIndex(0);
      setScore(0);
      setSelectedAnswer(null);
      setShowResults(false);
      setHasStarted(false);
    }, 300);
  };

  return {
    currentIndex,
    score,
    selectedAnswer,
    showResults,
    hasStarted,
    startQuiz,
    handleAnswerClick,
    restartQuiz,
  };
}
