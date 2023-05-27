import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpots } from "../../store/spots";

export default function SpotsList() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => Object.values(state.spots));

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  return (
    <>
      <h1>AAAAA</h1>
      {spots.map((spot) => {
        return <div key={spot.id}>[SPOT PLACEHOLDER]</div>;
      })}
    </>
  );
}
