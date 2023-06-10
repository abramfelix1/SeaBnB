import { useEffect, useState } from "react";
import ReviewsList from "../Reviews/ReviewsList";

export default function ManageReview() {
  const [startRender, setStartRender] = useState(false);

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
          <h1>Manage Reviews</h1>
        </div>
        <ReviewsList
          manage={true}
          startRender={startRender}
          setStartRender={setStartRender}
        />
      </div>
    </>
  );
}
