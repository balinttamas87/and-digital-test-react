import React from "react";
import PropTypes from "prop-types";
import "./Story.css";

const Story = ({ title, score, by, onClick }) => (
  <div className="story" onClick={onClick}>
    <div className="story-title-wrapper">
      <p className="story-title">{title}</p>
    </div>
    <div className="story-details-wrapper">
      <p className="story-details">{`${score} points by ${by}`}</p>
    </div>
  </div>
);

Story.propTypes = {
  title: PropTypes.string,
  score: PropTypes.number,
  by: PropTypes.string,
  onClick: PropTypes.func
};

export default Story;
