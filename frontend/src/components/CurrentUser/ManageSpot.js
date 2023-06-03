import { useSelector } from "react-redux";
import SpotsList from "../Spots/SpotsList";
import { NavLink } from "react-router-dom/";
import { useEffect, useState } from "react";

export default function SpotCurrent() {
  const [startRender, setStartRender] = useState(false);
  const userId = useSelector((state) => state.session.user.id);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartRender(true);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {startRender && (
        <div className="manage-container">
          <div className="manage-header ">
            <h1>Manage Spots</h1>
            <button>
              <NavLink to="/spots/new">Create a new Spot</NavLink>
            </button>
          </div>
        </div>
      )}
      <SpotsList userId={userId} manage={true} />
    </>
  );
}
