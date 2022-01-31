import React from "react";
import TimeLineCard from "../../../utilities/TimeLineCard/TimeLineCard";
import timeLineData from "./timeLineData";
import GalleyList from "../../../utilities/Gallery/GalleyList";
import "./WorkShopsPage.css";
import { v4 as uuidv4 } from "uuid";

function WorkShopsPage() {
  function creatTimeLine() {
    return timeLineData.map((step, index) => {
      return (
        <div key={uuidv4()}>
          <TimeLineCard
            img={step.imgURL}
            content={step.content}
            classMatch={step.classMatch}
            last={index === timeLineData.length - 1 ? true : false}
          />
        </div>
      );
    });
  }

  return (
    <div>
      <div className="steps_container">{creatTimeLine()}</div>
      <div>
        <GalleyList />
      </div>
    </div>
  );
}

export default WorkShopsPage;
