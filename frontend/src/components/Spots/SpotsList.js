import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpots, getCurrentSpots, deleteSpot } from "../../store/spots";
import { NavLink } from "react-router-dom/";
import SpotsCard from "./SpotsCard";
import Modal from "../Modals/Modal";
import "./spots.css";

export default function SpotsList({ userId }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const [startRender, setStartRender] = useState(false);
  const spots = useSelector((state) => Object.values(state.spots));

  useEffect(() => {
    console.log(showDeleteModal);
    if (!userId) dispatch(getSpots());
    if (userId) dispatch(getCurrentSpots());
    const timer = setTimeout(() => {
      setStartRender(true);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, userId, showDeleteModal]);

  return !startRender ? (
    <div className="spot-loader">
      <h1>. . .</h1>
    </div>
  ) : (
    <>
      {showDeleteModal && (
        <Modal closeModal={setShowDeleteModal} type={"delete"} />
      )}
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
                    {/* <button
                      className="update-button"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <NavLink
                        className="update-button-link"
                        to={`/spots/${spot.id}/edit`}
                      >
                        Update
                      </NavLink>
                    </button> */}
                    <NavLink
                      to={`/spots/${spot.id}/edit`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button>Update</button>
                    </NavLink>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDeleteModal(!showDeleteModal);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
