import { useEffect, useState } from "react";
import ReviewsList from "../Reviews/ReviewsList";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentBookings } from "../../store/booking";

export default function ManageBooking() {
  const dispatch = useDispatch();
  const [startRender, setStartRender] = useState(false);
  const bookings = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(getCurrentBookings());
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartRender(true);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {!startRender && (
        <div className="spot-loader">
          <div className="blinking-dots" />
        </div>
      )}
      <div className="manage-container">
        <div className="manage-header ">
          <h1>Manage Bookings</h1>
        </div>
        <div className="bookings-list-container"></div>
      </div>
    </>
  );
}
