import { Quizzes } from "../data/quizzes";

export default function QuizCard() {
  return (
    <>
      <div className="quiz-card">
        <div className="quiz-card-question">
          <p>{Quizzes[0].question}</p>
        </div>
        <div className="quiz-card-options">
          <p>{Quizzes[0].options[0]}</p>
          <p>{Quizzes[0].options[1]}</p>
          <p>{Quizzes[0].options[2]}</p>
          <p>{Quizzes[0].options[3]}</p>
        </div>
      </div>
    </>
  );
}
