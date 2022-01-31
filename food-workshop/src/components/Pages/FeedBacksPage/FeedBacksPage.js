import React, { useState, useEffect } from "react";
import FeedbackCard from "../../../utilities/FeedbackCard/FeedbackCard";
import { useAuth } from "../../../contexts/AuthContext";
import "./FeedBacksPage.css";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

function FeedBacksPage() {
  const [reviewsArray, setReviewsArray] = useState([]);

  const [isOn, setIsOn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userReview, setUserReview] = useState("");
  const [userImg, setUserImg] = useState("");
  const [userCountry, setUserCountry] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { currentUser } = useAuth();

  useEffect(() => {
    const addToApi = async () => {
      try {
        const response = await axios.get(
          `https://61d2c71db4c10c001712b5a8.mockapi.io/reviews`
        );
        setReviewsArray(response.data);
      } catch (e) {
        setErrorMsg(e.message);
      }
    };
    addToApi();
  }, []);

  //add reviews to the reviewpage
  function createReview() {
    return reviewsArray.map((review) => {
      return (
        <FeedbackCard
          key={uuidv4()}
          name={review.name}
          img={review.imgURL}
          content={review.content}
          country={review.country}
          id={review.id}
          onDelete={handleDeleteCard}
          onUpdate={handleUpdateCard}
          currentuser={currentUser}
          uid={review.uid}
        />
      );
    });
  }

  //update review
  function handleUpdateCard(
    cardId,
    cardName,
    cardImage,
    cardContent,
    cardCountry
  ) {
    const newReviews = reviewsArray;
    const review = newReviews.find((review) => review.id === cardId);
    const editeReview = {
      ...review,
      name: cardName,
      content: cardContent,
      imgURL: cardImage,
      country: cardCountry,
    };
    setReviewsArray(
      newReviews.map((review) => {
        return review.id === cardId ? editeReview : review;
      })
    );
  }

  //delete review
  function handleDeleteCard(cardId) {
    const filteredList = reviewsArray.filter((review) => {
      return review.id !== cardId;
    });
    setReviewsArray(filteredList);
  }

  // control the user input in crud card
  function handleChange(e) {
    switch (e.target.name) {
      case "name":
        setUserName(e.target.value);
        break;
      case "review":
        setUserReview(e.target.value);
        break;
      case "image":
        setUserImg(e.target.value);
        break;
      case "country":
        setUserCountry(e.target.value);
        break;
      default:
        break;
    }
  }

  // toggle the add button
  function handleClickAdd() {
    setIsOn(!isOn);
    resetCrudState();
  }

  // add new review to the reviewsArray
  const handleAddReview = async () => {
    const newReview = {
      name: userName,
      content: userReview,
      imgURL: userImg,
      country: userCountry,
      uid: currentUser.multiFactor.user.uid,
    };

    try {
      const response = await axios.post(
        `https://61d2c71db4c10c001712b5a8.mockapi.io/reviews`,
        newReview
      );
      const newData = [...reviewsArray, response.data];
      setReviewsArray(newData);
      setIsOn(!isOn);

      console.log(response.data);
    } catch (e) {
      setErrorMsg(e.message);
      console.log(errorMsg);
    }
  };

  //reset satate elements
  function resetCrudState() {
    setUserCountry("");
    setUserName("");
    setUserReview("");
    setUserImg("");
  }

  //open crud card
  function createCrud() {
    return (
      <div>
        <div className="crud-card">
          <div>
            <label>Your Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={userName}
            />
          </div>
          <div>
            <label>Your Review</label>
            <textarea
              type="textarea"
              rows="7"
              name="review"
              onChange={handleChange}
              value={userReview}
            />
          </div>
          <div>
            <label>Your Country</label>
            <input
              type="text"
              name="country"
              onChange={handleChange}
              value={userCountry}
            />
          </div>
          <div>
            <label>Your Img URL</label>
            <input
              type="text"
              name="image"
              onChange={handleChange}
              value={userImg}
            />
          </div>
          <button onClick={handleAddReview}>ADD</button>
        </div>
      </div>
    );
  }

  return (
    <div className="reviews-container">
      {createReview()}
      <button
        disabled={!currentUser}
        className={`reviews-container_add ${
          isOn ? "reviews-container_remove" : ""
        }`}
        onClick={() => handleClickAdd()}
      ></button>
      <div>{isOn && createCrud()}</div>
    </div>
  );
}

export default FeedBacksPage;
