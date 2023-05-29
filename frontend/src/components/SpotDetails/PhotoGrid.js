import "./photoGrid.css";

export default function PhotoGrid() {
  return (
    <div className="photo-container">
      <div className="photo-big">
        <img className="c1" src="https://i.imgur.com/YbZxziA.jpeg" alt="a" />
      </div>
      <div className="photo-grid">
        <div className="c2r1-container">
          <img
            className="c2r1"
            src="https://i.imgur.com/YbZxziA.jpeg"
            alt="a"
          />
        </div>
        <div className="c2r2-container">
          <img
            className="c2r2"
            src="https://i.imgur.com/YbZxziA.jpeg"
            alt="a"
          />
        </div>
        <div className="c3r1-container">
          <img
            className="c3r1"
            src="https://i.imgur.com/YbZxziA.jpeg"
            alt="a"
          />
        </div>
        <div className="c3r2-container">
          <img
            className="c3r2"
            src="https://i.imgur.com/YbZxziA.jpeg"
            alt="a"
          />
        </div>
      </div>
    </div>
  );
}
