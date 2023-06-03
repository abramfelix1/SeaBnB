import SpotInfo from "./SpotsInfo";
import SpotPreview from "./SpotPreview";
import "./spots.css";

export default function SpotsCard({ spot, startRender }) {
  return (
    <div
      className="spot-card"
      onClick={(e) => {
        e.stopPropagation();
        startRender(false);
      }}
    >
      <SpotPreview image={spot.previewImage} />
      <SpotInfo spot={spot} />
    </div>
  );
}
