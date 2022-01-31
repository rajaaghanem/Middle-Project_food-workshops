import React from "react";
import CategoryCrad from "../../../utilities/CategoryCrad/CategoryCrad";
import { Link } from "react-router-dom";
import "./HomePage.css";
import "../../../utilities/Link-design.css";
import Calendar from "../../Calendar/Calendar";
import { v4 as uuidv4 } from "uuid";

function HomePage() {
  const categoryName = [
    {
      name: "Cooking Workshops",
      Cateclass: "workshops",
      linked: "/food-workshops",
    },
    { name: "About Us", Cateclass: "about-us", linked: "/about-us" },
    { name: "Reviews", Cateclass: "reviews", linked: "/feedbacks" },
  ];

  //add categories links to the homepage
  function createCategory() {
    return categoryName.map((category) => {
      return (
        <Link key={uuidv4()} className="link-design" to={category.linked}>
          <CategoryCrad
            name={category.name}
            ctaegoryClass={category.Cateclass}
          />
        </Link>
      );
    });
  }

  return (
    <div className="homapage-container">
      <div className="homapage-container_category">{createCategory()}</div>
      <div className="homapage-container_calendar">
        <Calendar />
      </div>
    </div>
  );
}

export default HomePage;
