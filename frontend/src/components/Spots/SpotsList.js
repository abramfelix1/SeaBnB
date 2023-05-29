import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpots } from "../../store/spots";
import { NavLink } from "react-router-dom/";
import SpotsCard from "./SpotsCard";
import "./spots.css";

export default function SpotsList() {
  const dispatch = useDispatch();
  const [startRender, setStartRender] = useState(false);
  const spots = useSelector((state) => Object.values(state.spots));

  useEffect(() => {
    dispatch(getSpots());
    const timer = setTimeout(() => {
      setStartRender(true);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [dispatch]);

  return !startRender ? (
    <div className="spot-loader">
      <h1>. . .</h1>
    </div>
  ) : (
    <div className="spot-container">
      <div className="spot-list">
        {spots.length > 0 &&
          spots.map((spot) => (
            <div key={spot.id} onClick={() => setStartRender(false)}>
              <NavLink to={`/spots/${spot.id}`}>
                <SpotsCard spot={spot} />
              </NavLink>
            </div>
          ))}
      </div>
    </div>
  );
}
