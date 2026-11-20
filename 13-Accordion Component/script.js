const questions = [...document.querySelectorAll("summary")];
questions.forEach((question, index) => {
  question.addEventListener("keydown", event => {
    const target = {
      ArrowUp: (index + questions.length - 1) % questions.length,
      ArrowDown: (index + 1) % questions.length,
      Home: 0,
      End: questions.length - 1,
    }[event.key];
    if (target === undefined) return;
    event.preventDefault();
    questions[target].focus();
  });
});
