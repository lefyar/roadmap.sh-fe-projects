export default function ProgressBar({ current, total }) {
  return (
    <div className="progress-bar">
      <label htmlFor="card-progress">Card {current} of {total}</label>
      <progress id="card-progress" value={current} max={total} />
    </div>
  );
}
