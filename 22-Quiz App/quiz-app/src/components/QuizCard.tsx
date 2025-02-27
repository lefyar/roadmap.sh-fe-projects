type quzCardsProps = {
  quiz: {
    id: number;
    question: string;
    options: string[];
    answer: string;
  };
  selectedAnswer: string | null;
  handleAnswerClick: (option: string) => void;
};

export default function QuizCard({
  quiz,
  selectedAnswer,
  handleAnswerClick,
}: quzCardsProps) {
  return (
    <div className="bg-[#1b1b1b] text-[#f1f1f1] flex flex-col items-center justify-between p-10 border-2 border-[#f1f1f1] rounded-md text-center w-150 h-70">
      <h1 className="text-2xl font-bold">{quiz.question}</h1>
      <div className="flex flex-wrap justify-center gap-2">
        {quiz.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(option)}
            className={`w-50 px-4 py-2 rounded text-[#f1f1f1] font-semibold transition cursor-pointer ${
              selectedAnswer
                ? option === quiz.answer
                  ? "bg-green-500"
                  : option === selectedAnswer
                  ? "bg-red-500"
                  : "bg-[#2c2c2c]"
                : "bg-[#2c2c2c] hover:bg-[#222222]"
            }`}
            disabled={!!selectedAnswer}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
