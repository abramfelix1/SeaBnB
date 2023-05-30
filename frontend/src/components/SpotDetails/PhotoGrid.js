import "./photoGrid.css";
import dog1 from "../../images/placeholders/dog1.png";
import dog2 from "../../images/placeholders/dog2.png";
import dog3 from "../../images/placeholders/dog3.png";
import dog4 from "../../images/placeholders/dog4.png";
import dog5 from "../../images/placeholders/dog5.png";

export default function PhotoGrid({ images }) {
  const preview = images.find(({ preview }) => preview === true);
  const imageList = images.filter(({ preview }) => preview === false);
  return (
    <div className="photo-container">
      <div className="photo-big">
        <img className="c1" src={preview ? preview.url : dog1} alt="a" />
      </div>
      <div className="photo-grid">
        <div className="c2r1-container">
          <img
            className="c2r1"
            src={imageList[0] ? imageList[0].url : dog2}
            alt="a"
          />
        </div>
        <div className="c2r2-container">
          <img
            className="c2r2"
            src={imageList[1] ? imageList[1].url : dog3}
            alt="a"
          />
        </div>
        <div className="c3r1-container">
          <img
            className="c3r1"
            src={imageList[2] ? imageList[2].url : dog4}
            alt="a"
          />
        </div>
        <div className="c3r2-container">
          <img
            className="c3r2"
            src={imageList[3] ? imageList[3].url : dog5}
            alt="a"
          />
        </div>
      </div>
    </div>
  );
}
