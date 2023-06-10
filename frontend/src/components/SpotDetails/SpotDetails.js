import { useParams } from "react-router-dom/";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getSpotDetails } from "../../store/spots";
import { getSpotReviews } from "../../store/reviews";
import SpotDetailsHeader from "./SpotDetailsHeader";
import PhotoGrid from "./PhotoGrid";
import SpotDetailsDescription from "./SpotDetailsDescription";
import SpotReviews from "./SpotReviews";
import SpotBookingCard from "./SpotBookingCard";
import "./spotDetails.css";

export default function SpotDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [startRender, setStartRender] = useState(false);
  const [startRenderPage, setStartRenderPage] = useState(false);
  const spot = useSelector((state) => state.spots);

  useEffect(() => {
    dispatch(getSpotDetails(id));
    dispatch(getSpotReviews(id));
    const timer = setTimeout(() => {
      setStartRender(true);
    }, 1000);
    const timer2 = setTimeout(() => {
      setStartRenderPage(true);
    }, 900);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [dispatch, id]);

  return (
    <>
      {!startRender && (
        <div className="spot-loader">
          <div className="blinking-dots" />
        </div>
      )}
      {startRenderPage && (
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
              <SpotBookingCard spot={spot} />
            </div>
          </div>
          <div className="details-reviews-container">
            <SpotReviews spot={spot} />
          </div>
        </div>
      )}
    </>
  );
}
