import React from "react";
import "./CategoryCrad.css";

function CategoryCrad(props) {
  return (
    <div className={`category-card_container ${props.ctaegoryClass}`}>
      <h1 className="category-card_title">{props.name}</h1>
    </div>
  );
}

export default CategoryCrad;
