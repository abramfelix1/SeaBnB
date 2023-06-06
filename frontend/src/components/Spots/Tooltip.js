import React, { useState } from "react";

const Tooltip = ({ text, children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="tooltip-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
    >
      {children}
      {position.x !== 0 && position.y !== 0 && (
        <div
          className="tooltip"
          style={{ left: position.x - 55, top: position.y + 35 }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
