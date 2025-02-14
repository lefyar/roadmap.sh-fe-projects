import { useState } from "react";
import Flashcard from "./components/Flashcard";
import ProgressBar from "./components/ProgressBar";
import NavigationButtons from "./components/NavigationButtons";
import data from "./data/data.json";
import "./index.css";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < data.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

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
        <p>Loading flashcards...</p>
      )}
    </div>
  );
}

export default App;
