import { useSelector, useDispatch } from "react-redux";
import { getCurrentSpots } from "../../store/spots";
import { NavLink } from "react-router-dom/";
import { useEffect, useState } from "react";
import SpotsList from "../Spots/SpotsList";

export default function SpotCurrent() {
  const dispatch = useDispatch();

  const [startRender, setStartRender] = useState(false);
  const userId = useSelector((state) => state.session.user.id);
  const spots = useSelector((state) => Object.values(state.spots));

  useEffect(() => {
    dispatch(getCurrentSpots());
    const timer = setTimeout(() => {
      setStartRender(true);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [dispatch]);

  return (
    <>
      {startRender && (
        <div className="manage-container">
          <div className="manage-header ">
            <h1>Manage Spots</h1>
            {spots.length === 0 && (
              <button>
                <NavLink to="/spots/new">Create a new Spot</NavLink>
              </button>
            )}
          </div>
        </div>
      )}
      <SpotsList userId={userId} manage={true} />
    </>
  );
}
