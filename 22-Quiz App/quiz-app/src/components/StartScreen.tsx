type StartScreenProps = {
    startQuiz: () => void;
};

export default function StartScreen({ startQuiz }: StartScreenProps) {
    return (
        <div className="bg-[#1b1b1b] text-[#f1f1f1] flex flex-col items-center justify-between p-10 border-2 border-[#f1f1f1] rounded-md text-center w-150 h-70">
            <h1 className="text-2xl font-bold">Welcome to my Quiz App!</h1>
            <p className="text-lg text-[#777]">I will test you about Indonesia, please click the button below to start the quiz.</p>
            <button onClick={startQuiz} className="border-2 border-[#2c2c2c] hover:bg-[#f1f1f1] hover:text-[#1b1b1b] py-2 px-4 rounded cursor-pointer transition-colors">Start Quiz</button>
        </div>
    )
}