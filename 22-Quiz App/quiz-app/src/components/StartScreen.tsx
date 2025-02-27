import { useState } from "react";

type StartScreenProps = {
  startQuiz: () => void;
};

export default function StartScreen({ startQuiz }: StartScreenProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    startQuiz();
  };

  return (
    <div className="flex flex-col items-center p-6 border-2 border-[#f1f1f1] rounded-lg text-center w-full max-w-xl mx-4 md:mx-0 bg-[#1b1b1b] text-[#f1f1f1] shadow-lg gap-4">
      <h1 className="text-2xl font-bold">Welcome to my Quiz App!</h1>
      <p className="md:text-lg text-[#777]">
        I will test your knowledge about Indonesia, please click the button
        below to start the quiz.
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
        Start Quiz
      </button>
    </div>
  );
}
