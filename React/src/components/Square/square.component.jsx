import React from "react";
import "./square.css";

function Square({ className = "cell--unknown", label, click }) {
  return (
    <button
      type="button"
      className={`cell ${className}`}
      aria-label={`Cell ${label}`}
      onClick={click} // Quando se clica numa célula, chama a função recebida
    />
  );
}

export default Square;
