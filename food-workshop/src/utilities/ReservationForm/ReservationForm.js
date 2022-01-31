import React, { useState } from "react";
import "./ReservationForm.css";
import axios from "axios";

function ReservationForm(props) {
  const [userName, setuUserName] = useState("");
  const [partNum, setpartNum] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userNote, setUserNote] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showForm, setShowForm] = useState(true);

  function handleChange(e) {
    switch (e.target.name) {
      case "name":
        setuUserName(e.target.value);
        break;
      case "participants":
        setpartNum(e.target.value);
        break;
      case "phone":
        setUserPhone(e.target.value);
        break;
      case "note":
        setUserNote(e.target.value);
        break;
      default:
        break;
    }
  }

  const handleSendClick = async () => {
    const obj = {
      date: props.date,
      name: userName,
      participants: partNum,
      phone: userPhone,
      note: userNote,
    };
    try {
      await axios.post(
        `https://61d2c71db4c10c001712b5a8.mockapi.io/reservation`,
        obj
      );
      setShowForm(false);
    } catch (e) {
      setErrorMsg(e.message);
      console.log(errorMsg);
    }
  };

  function handleExitClick() {
    setShowForm(false);
  }

  return (
    <div
      className={`${showForm ? "" : "disaple-none"} reservation-form_container`}
    >
      <button className="exit-form" onClick={handleExitClick}></button>
      <h1>Add your reservation details</h1>
      <h1>And we will call you back</h1>
      <div className="chosen-date">{props.date}</div>
      <div>
        <label>Your Name: </label>
        <input
          type="text"
          onChange={handleChange}
          name="name"
          value={userName}
        />
      </div>
      <div>
        <label>Number of Participants: </label>
        <input
          type="text"
          onChange={handleChange}
          name="participants"
          value={partNum}
        />
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="text"
          onChange={handleChange}
          name="phone"
          value={userPhone}
        />
      </div>
      <div>
        <label>Note:</label>
        <input
          type="text"
          onChange={handleChange}
          name="note"
          value={userNote}
        />
      </div>
      <button onClick={handleSendClick}>SEND</button>
    </div>
  );
}

export default ReservationForm;
