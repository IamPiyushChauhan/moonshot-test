import React from "react";

function Avatar({ name }) {
  return (
    <div className="circle-icon">
      <span className="circle-letter">{name && name.toUpperCase()[0]}</span>
    </div>
  );
}

export default Avatar;
