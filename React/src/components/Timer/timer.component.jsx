import { useState, useEffect } from "react";

function Timer({ timeout, onTimer }) {
  const [seconds, setSeconds] = useState(timeout);
  useEffect(() => {
    if (seconds <= 0) {
      if (onTimer) onTimer(0);
      return;
    }
    onTimer(seconds);

    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, onTimer]);
  return <>{seconds}</>;
}
export default Timer;
