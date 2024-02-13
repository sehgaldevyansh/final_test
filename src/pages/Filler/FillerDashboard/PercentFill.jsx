import React from 'react';
import './PercentFill.css';

const PercentFill = ({ necessaryPercentage, unnecessaryPercentage,necessary,unnecessary }) => {
  return (
    <div className="horizontal-progress-bar-container">
      <div
        className="progress-bar necessary"
        style={{ width: `${necessaryPercentage}%` }}
      >
        <span className="progress-label"> {necessary} N</span>
      </div>
      <div
        className="progress-bar unnecessary"
        style={{ width: `${unnecessaryPercentage}%` }}
      >
        <span className="progress-label"> {unnecessary} UN</span>
      </div>
    </div>
  );
};

export default PercentFill;
