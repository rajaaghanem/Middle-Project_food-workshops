import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./FeedbackCard.css";
import axios from "axios";

function FeedbackCard(props) {
  const [errorMsg, setErrorMsg] = useState("");
  const [isOn, setIsOn] = useState(false);
  const [name, setName] = useState(props.name);
  const [content, setContent] = useState(props.content);
  const [image, setImage] = useState(props.img);
  const [country, setCountry] = useState(props.country);
  const { currentUser } = useAuth();
  const [sameUser, setSameUser] = useState(false);

  function handleUpdate() {
    setIsOn(!isOn);
  }

  //delete review by id from the api 
  async function handleDelete() {
    try {
      await axios.delete(
        `https://61d2c71db4c10c001712b5a8.mockapi.io/reviews/${props.id}`
      );
      return props.onDelete(props.id);
    } catch (e) {
      setErrorMsg(e.massage);
      console.log(errorMsg);
    }
  }

  //update review card depends on the user input
  function handleUpdateChange(e) {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "content":
        setContent(e.target.value);
        break;
      case "country":
        setCountry(e.target.value);
        break;
      case "image":
        setImage(e.target.value);
        break;
      default:
        break;
    }
  }

  //check if the review is match the user
  useEffect(() => {
    handlecurrentUser();
  }, [currentUser, handlecurrentUser]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handlecurrentUser() {
    if (currentUser) {
      if (currentUser.multiFactor.user.uid === props.uid) {
        setSameUser(true);
      }
    }
  }

  //display delete button only for the logged in user 
  function sameUserAddDelete() {
    return (
      <button className="feedback-card_delete" onClick={handleDelete}></button>
    );
  }

  //display update button only for the logged in user 
  function sameUserAddUpdate() {
    return (
      <button className="feedback-card_update" onClick={handleUpdate}></button>
    );
  }

  //display crud card on screen
  function openUpdateCard() {
    return (
      <div className="update-card">
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            name="name"
            onChange={handleUpdateChange}
          />
        </div>
        <div>
          <label>Review:</label>
          <textarea
            rows="5"
            type="textarea"
            value={content}
            name="content"
            onChange={handleUpdateChange}
          />
        </div>
        <div>
          <label>country:</label>
          <input
            type="text"
            value={country}
            name="country"
            onChange={handleUpdateChange}
          />
        </div>
        <div>
          <label>imgUrl:</label>
          <input
            type="text"
            value={image}
            name="image"
            onChange={handleUpdateChange}
          />
        </div>
        <button onClick={handleUpdateClick}>UPDATE</button>
        <button onClick={handleUpdate}>CANCEL</button>
      </div>
    );
  }

  // update review on the api 
  async function handleUpdateClick() {
    const newReview = {
      name: name,
      content: content,
      imgURL: image,
      country: country,
    };
    try {
      await axios.put(
        `https://61d2c71db4c10c001712b5a8.mockapi.io/reviews/${props.id}`,
        newReview
      );
      setIsOn(false);
      return props.onUpdate(props.id, name, image, content, country);
    } catch (e) {
      setErrorMsg(e.massage);
    }
  }

  return (
    <>
      <div className="feedback-card_container">
        <img alt="img" src={props.img} className="feedback-card_img" />
        {sameUser && sameUserAddUpdate()}
        <div className="feedback-card_content">
          <h3>{props.name}</h3>
          <p>{props.content}</p>
          <h4>{props.country}</h4>
        </div>
        {sameUser && sameUserAddDelete()}
        {isOn && openUpdateCard()}
      </div>
    </>
  );
}

export default FeedbackCard;
