import { useState, useEffect } from "react";
import Flashcard from "./components/Flashcard";
import ProgressBar from "./components/ProgressBar";
import NavigationButtons from "./components/NavigationButtons";
import data from "./data/data.json";
import "./index.css";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((index) => Math.min(index + 1, data.length - 1));
  };

  const handlePrev = () => {
    setCurrentIndex((index) => Math.max(index - 1, 0));
  };

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "ArrowRight") handleNext();
      else if (event.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [data.length]);

  return (
    <div className="container">
      <h1>Flashcards App</h1>
      {data.length > 0 ? (
        <>
          <ProgressBar current={currentIndex + 1} total={data.length} />
          <Flashcard
            question={data[currentIndex].question}
            answer={data[currentIndex].answer}
          />
          <NavigationButtons
            onPrev={handlePrev}
            onNext={handleNext}
            isPrevDisabled={currentIndex === 0}
            isNextDisabled={currentIndex === data.length - 1}
          />
        </>
      ) : (
        <p>No flashcards to show yet.</p>
      )}
    </div>
  );
}

export default App;
