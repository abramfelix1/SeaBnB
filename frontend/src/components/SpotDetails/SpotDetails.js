import { useParams } from "react-router-dom/";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getSpotDetails } from "../../store/spots";
import { getSpotReviews } from "../../store/reviews";
import SpotDetailsHeader from "./SpotDetailsHeader";
import PhotoGrid from "./PhotoGrid";
import SpotDetailsDescription from "./SpotDetailsDescription";
import SpotReviews from "./SpotReviews";
import "./spotDetails.css";

export default function SpotDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [startRender, setStartRender] = useState(false);
  const spot = useSelector((state) => state.spots);

  useEffect(() => {
    dispatch(getSpotDetails(id));
    dispatch(getSpotReviews(id));
    const timer = setTimeout(() => {
      setStartRender(true);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, id]);

  return !startRender ? (
    <div className="spot-loader">
      <h1>. . .</h1>
    </div>
  ) : (
    <div className="details-container">
      <div className="details-header">
        <SpotDetailsHeader spot={spot} />
      </div>
      <div className="details-images-container">
        <PhotoGrid images={spot.SpotImages} />
      </div>
      <div className="details-description-container">
        <SpotDetailsDescription spot={spot} />
        <div className="booking-card-container">
          <h1>BOOKING CARD HERE</h1>
        </div>
      </div>
      <div className="details-reviews-container">
        <SpotReviews spot={spot} />
      </div>
    </div>
  );
}
