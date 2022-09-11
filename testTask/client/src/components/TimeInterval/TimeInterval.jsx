import React, { useState } from "react";

import { socket } from "../../App";

import styles from "./TimeInterval.module.scss";

const TimeInterval = () => {
  const [timeInterval, setTimeInterval] = useState(5);

  return (
    <div className={styles.timeInterval}>
      <div className={styles.title}>
        Here you can set time interval for display price tickers
      </div>
      <div className={styles.timeIntervalContainer}>
        <input
          type="number"
          value={timeInterval}
          onChange={e => setTimeInterval(e.target.value)}
        />
        <button
          onClick={() => {
            socket.emit("setTimeout", timeInterval);
          }}
        >
          Set
        </button>
      </div>
    </div>
  );
};

export default TimeInterval;
