import React from "react";
import PropTypes from "prop-types";
import "./Story.css";

const Story = ({ title, score, by, handleClick, commentIds }) => (
  <div className="story" onClick={() => handleClick(commentIds)}>
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
  handleClick: PropTypes.func,
  commentIds: PropTypes.array
};

export default Story;
