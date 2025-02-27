import { Quizzes } from "../data/quizzes";

type QuizCardProps = {
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
}: QuizCardProps) {
  return (
    <div className="flex flex-col items-center p-6 border-2 border-[#f1f1f1] rounded-lg text-center w-full max-w-xl mx-4 md:mx-0 bg-[#1b1b1b] text-[#f1f1f1] shadow-lg">
      <h1 className="text-xl md:text-2xl font-bold break-words">
        {quiz.question}
      </h1>
      <div className="flex flex-col md:flex-row flex-wrap justify-center gap-3 w-full mt-6">
        {quiz.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(option)}
            className={`w-full md:w-48 px-4 py-2 rounded text-[#f1f1f1] font-semibold transition cursor-pointer text-sm md:text-base ${
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
      <p className="text-xs md:text-sm text-[#777] mt-4">
        {quiz.id} of {Quizzes.length} questions
      </p>
    </div>
  );
}
