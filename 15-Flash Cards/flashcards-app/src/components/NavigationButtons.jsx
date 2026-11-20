import PropTypes from "prop-types";

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

NavigationButtons.propTypes = {
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  isPrevDisabled: PropTypes.bool.isRequired,
  isNextDisabled: PropTypes.bool.isRequired,
};

export default NavigationButtons;
