import React from "react";
import PropTypes from "prop-types";

const Story = ({ title, score, by }) => (
  <div className="story">
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
  by: PropTypes.string
};

export default Story;
