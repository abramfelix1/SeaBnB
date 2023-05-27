import SpotInfo from "./SpotsInfo";
import SpotPreview from "./SpotPreview";
import "./spots.css";

export default function SpotsCard({ spot }) {
  return (
    <div className="spot-card">
      <SpotPreview image={spot.previewImage} />
      <SpotInfo spot={spot} />
    </div>
  );
}
