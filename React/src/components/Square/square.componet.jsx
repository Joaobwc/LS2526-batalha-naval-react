import React from "react";
import "./square.css";

function Square({ className = "cell--unknown", label }) {
  return (
    <button
      type="button"
      className={`cell ${className}`}
      aria-label={`Cell ${label}`}
    />
  );
}

export default Square;
