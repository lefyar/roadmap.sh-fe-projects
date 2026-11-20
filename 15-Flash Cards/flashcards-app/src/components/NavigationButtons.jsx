function NavigationButtons({ onPrev, onNext, isPrevDisabled, isNextDisabled }) {
  return (
    <div className="navigation-buttons" role="group" aria-label="Flashcard navigation">
      <button type="button" onClick={onPrev} disabled={isPrevDisabled} aria-label="Previous flashcard">
        Previous
      </button>
      <button type="button" onClick={onNext} disabled={isNextDisabled} aria-label="Next flashcard">
        Next
      </button>
    </div>
  );
}

export default NavigationButtons;
