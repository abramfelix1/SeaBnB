import "./spots.css";
import dog1 from "../../images/placeholders/dog1.png";

export default function SpotPreview({ image }) {
  return (
    <img
      className="spot-preview-img"
      src={image !== "Preview Image Unavailable" ? image : dog1}
      alt="Prview"
    />
  );
}
