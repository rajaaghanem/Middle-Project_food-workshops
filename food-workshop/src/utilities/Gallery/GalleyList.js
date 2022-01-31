import React from "react";
import galleryImg from "./galleryImg";
import GalleryItem from "./GalleryItem";
import { v4 as uuidv4 } from "uuid";
import "./GalleryList.css";

function GalleyList() {
  const images = galleryImg.map((image) => {
    return <GalleryItem key={uuidv4()} img={image} />;
  });
  return <div className="image-list">{images}</div>;
}

export default GalleyList;
