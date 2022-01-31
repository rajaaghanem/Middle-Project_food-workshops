import React, { useState, useEffect } from "react";
import "./Calendar.css";
import moment from "moment";
import buildCalendar from "./buildCalendar";
import { v4 as uuidv4 } from "uuid";
import ReservationForm from "../../utilities/ReservationForm/ReservationForm";

function Calendar() {
  const dates = [
    "2022-05-02",
    "2022-04-01",
    "2022-01-07",
    "2022-01-18",
    "2022-02-02",
    "2022-02-14",
  ];
  const [calendar, setCalendar] = useState([]);
  const [value, setValue] = useState(moment());
  const [dateToken, setDateToken] = useState(false);
  const [dateFree, setDateFree] = useState(false);
  const [chosenDate, setChosenDate] = useState("");

  useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value]);

  //current month full name
  function currentMonthName() {
    return value.format("MMMM");
  }

  //current year
  function currentYear() {
    return value.format("Y");
  }

  //previous month
  function preMonth() {
    return value.clone().subtract(1, "month");
  }

  //next month
  function nextMonth() {
    return value.clone().add(1, "month");
  }

  //check if the date is already saved 
  function handleSavedDate() {
    setDateToken(!dateToken);
  }

  //display a "date taken" message on screen 
  function playDateTakenMassage() {
    return (
      <div className="date-token">
        <h1>Sorry,</h1>
        <h2>this date is already taken</h2>
        <button className="date-taken-exit_btn" onClick={handleExitDateTaken}>OK</button>
      </div>
    );
  }

  //hide "date taken" message from screen
  function handleExitDateTaken() {
    setDateToken(!dateToken);
  }

  //check if the chosen date is free or taken
  function handleFreeDate(e) {
    const name = e.target.getAttribute("name");
    if (name === "free") {
      setDateToken(false);
      setDateFree(!dateFree);
      setChosenDate(e.target.getAttribute("id"));
    } else if(name === "saved"){
      setDateToken(!dateToken);
      setDateFree(false);
    }
  }

  //open form reservation with the chosen date
  function openReservationForm() {
    return (
      <div className="reservation-form">
        <ReservationForm date={chosenDate} />
      </div>
    );
  }

  //check if the chosen date is taken and add saved a backgroung to it
  function matchDate(day) {
    return dates.map((date) => {
      if (moment(day).isSame(date)) {
        return (
          <div
            key={uuidv4()}
            className="save-date"
            onClick={() => handleSavedDate()}
            name="saved"
          ></div>
        );
      }
      return null;
    });
  }

  return (
    <div className="calendar-container">
      <div className="calendar-container_header">
        <button
          className="calendar-container_header_arrow"
          onClick={() => setValue(preMonth())}
        >
          &lt;
        </button>
        <div>
          {currentMonthName()} {currentYear()}
        </div>
        <button
          className="calendar-container_header_arrow"
          onClick={() => setValue(nextMonth())}
        >
          &gt;
        </button>
      </div>
      <div className="calendar-container_content">
        {calendar.map((week) => (
          <div key={uuidv4()}>
            {week.map((day) => (
              <div
                key={uuidv4()}
                className={`calendar-container_day`}
                onClick={handleFreeDate}
                name="free"
                id={day.format("DD-MM-YYYY").toString()}
              >
                <h3>{day.format("D").toString()}</h3>
                {matchDate(day)}
              </div>
            ))}
          </div>
        ))}
      </div>
      {dateToken && playDateTakenMassage()}
      {dateFree && openReservationForm()}
    </div>
  );
}

export default Calendar;
