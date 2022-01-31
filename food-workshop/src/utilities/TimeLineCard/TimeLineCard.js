import React from "react";
import "./TimeLineCard.css";

function TimeLineCard(props) {
  return (
    <div className="time-line_wrap">
      <div className="time-line_container">
        <div className={`time-line_circle ${props.classMatch}`}></div>
        <div className={`time-line_arrow ${props.last? "display-none":""}`}>
          <i className="fas fa-arrow-right fa-4x"></i>
        </div>
      </div>
      <div className="time-line_content">
        <p>{props.content}</p>
      </div>
    </div>
  );
}

export default TimeLineCard;
