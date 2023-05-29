import { useParams } from "react-router-dom/";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSpotDetails } from "../../store/spots";
import PhotoGrid from "./PhotoGrid";
import "./spotDetails.css";

export default function SpotDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const spot = useSelector((state) => state.spots);
  console.log(spot);

  useEffect(() => {
    console.log("SPOT DETAILS");
    dispatch(getSpotDetails(id));
  }, [dispatch, id]);

  return (
    <div className="details-container">
      <div className="details-header">
        <h1>{spot.name}</h1>
        <div className="details-sub-header">
          <p>
            <i className="fa-solid fa-star"></i> {spot.avgRating} ·{" "}
            <span>{spot.numReviews} reviews</span>
            {""}
            <span className="period"> . </span>
            {""}
            <span>
              {spot.city}, {spot.state}, {spot.country}
            </span>
          </p>
          <div className="details-sub-header-buttons">
            <button>
              <i className="fa-solid fa-arrow-up-from-bracket"></i> <p>Share</p>
            </button>
            <button>
              <i class="fa-regular fa-heart"></i>
              <p>Save</p>
            </button>
          </div>
        </div>
      </div>
      <div className="details-images-container">
        <PhotoGrid />
      </div>
      <div className="details-description"></div>
      <div className="details-reviews"></div>
    </div>
  );
}
