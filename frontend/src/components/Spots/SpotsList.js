import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpots } from "../../store/spots";
import { NavLink } from "react-router-dom/";
import SpotsCard from "./SpotsCard";
import "./spots.css";

export default function SpotsList() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => Object.values(state.spots));

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  return (
    <div className="spot-container">
      <div className="spot-list">
        {spots.length > 0 &&
          spots.map((spot) => (
            <NavLink key={spot.id} to={`/spots/${spot.id}`}>
              <SpotsCard spot={spot} />
            </NavLink>
          ))}
      </div>
    </div>
  );
}
