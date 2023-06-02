import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpots, getCurrentSpots } from "../../store/spots";
import { NavLink } from "react-router-dom/";
import SpotsCard from "./SpotsCard";
import "./spots.css";

export default function SpotsList({ userId }) {
  const dispatch = useDispatch();
  const [startRender, setStartRender] = useState(false);
  const spots = useSelector((state) => Object.values(state.spots));

  useEffect(() => {
    if (!userId) dispatch(getSpots());
    if (userId) dispatch(getCurrentSpots());
    const timer = setTimeout(() => {
      setStartRender(true);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, userId]);

  return !startRender ? (
    <div className="spot-loader">
      <h1>. . .</h1>
    </div>
  ) : (
    <div className="spot-container">
      <div className="spot-list">
        {spots.length > 0 &&
          spots.map((spot) => (
            <div
              key={spot.id}
              onClick={(e) => {
                e.stopPropagation();
                setStartRender(false);
              }}
            >
              <NavLink to={`/spots/${spot.id}`}>
                <SpotsCard spot={spot} />
              </NavLink>
              {userId && (
                <div className="current-buttons-container">
                  <button onClick={(e) => e.stopPropagation()}>Update</button>
                  <button onClick={(e) => e.stopPropagation()}>Delete</button>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
