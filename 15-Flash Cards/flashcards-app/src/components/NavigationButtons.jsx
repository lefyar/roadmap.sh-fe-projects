import PropTypes from "prop-types";

function NavigationButtons({ onPrev, onNext, isPrevDisabled, isNextDisabled }) {
  return (
    <div className="navigation-buttons">
      <button onClick={onPrev} disabled={isPrevDisabled}>
        Previous
      </button>
      <button onClick={onNext} disabled={isNextDisabled}>
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
