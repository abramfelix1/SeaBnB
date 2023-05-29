import { useParams } from "react-router-dom/";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSpotDetails } from "../../store/spots";
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
            ★ {spot.avgRating} · <span>{spot.numReviews} reviews</span>
            {""}
            <span className="period"> . </span>
            {""}
            <span>
              {spot.city}, {spot.state}, {spot.country}
            </span>
          </p>
          <div className="details-sub-header-buttons">
            <button>
              <i class="fa-solid fa-arrow-up-from-bracket"></i> <p>Share</p>
            </button>
            <button>
              <i class="fa-regular fa-heart"></i>
              <p>Save</p>
            </button>
          </div>
        </div>
      </div>
      <div className="details-images"></div>
      <div className="details-description"></div>
      <div className="details-reviews"></div>
    </div>
  );
}
