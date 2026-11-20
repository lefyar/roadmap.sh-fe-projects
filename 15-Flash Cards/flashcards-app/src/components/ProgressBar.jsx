import PropTypes from "prop-types";

function ProgressBar({ current, total }) {
  const progressPercentage = Math.max(0, Math.min(100, (current / total) * 100));

  return (
    <div
      className="progress-bar"
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label="Flashcard progress"
    >
      <div
        className="progress-bar-fill"
        style={{ width: `${progressPercentage}%` }}
      />
      <span className="progress-bar-text">{current}/{total}</span>
    </div>
  );
}

ProgressBar.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default ProgressBar;
