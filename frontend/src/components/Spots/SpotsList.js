import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpots, getCurrentSpots } from "../../store/spots";
import { NavLink } from "react-router-dom/";
import SpotsCard from "./SpotsCard";
import Modal from "../Modals/Modal";
import Tooltip from "./Tooltip";
import "./spots.css";

export default function SpotsList({ userId, manage }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const [startRender, setStartRender] = useState(false);
  const [spotId, setSpotId] = useState(null);
  const spots = useSelector((state) => Object.values(state.spots));

  useEffect(() => {
    if (!manage) dispatch(getSpots());
    if (manage) dispatch(getCurrentSpots());
    const timer = setTimeout(() => {
      setStartRender(true);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, manage, showDeleteModal]);

  return !startRender ? (
    <div className="spot-loader">
      <div className="blinking-dots" />
    </div>
  ) : (
    <>
      {showDeleteModal && (
        <Modal closeModal={setShowDeleteModal} type={"delete"} id={spotId} />
      )}
      <div className="spot-container-container">
        <div className="spot-container">
          <div className={`spot-list ${manage ? "manage" : ""}`}>
            {spots.length > 0 &&
              spots.map((spot) => (
                <Tooltip text={spot.name}>
                  <div key={spot.id}>
                    <NavLink
                      to={`/spots/${spot.id}`}
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                    >
                      <SpotsCard spot={spot} startRender={setStartRender} />
                    </NavLink>
                    {userId && (
                      <div className="current-buttons-container">
                        <button>
                          <NavLink
                            to={`/spots/${spot.id}/edit`}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            Update
                          </NavLink>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowDeleteModal(!showDeleteModal);
                            setSpotId(spot.id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </Tooltip>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
