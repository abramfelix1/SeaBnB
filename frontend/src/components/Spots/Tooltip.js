import React, { useState } from "react";

const Tooltip = ({ text, children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const tooltipRef = document.getElementById("tooltip");
    const tooltipWidth = tooltipRef?.offsetWidth || 0;
    setPosition({ x: e.clientX - tooltipWidth / 2 + 3, y: e.clientY + 32 });
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
          id="tooltip"
          className="tooltip"
          style={{ left: position.x, top: position.y }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
