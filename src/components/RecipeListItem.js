import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const RecipeListItem = ({ id, title, description, createdAt, imageUrl }) => (
  <div className="list-item">
    <div className="list-item__image">
      <img src={imageUrl} alt="Recipe Image" />
    </div>
    <div className="list-item__content">
      <h3 className="list-item__title">{title}</h3>
      <span className="list-item__subtitle">{description}</span>
      <Link to={`/recipe/${id}`}>
        <button className="button">VIEW</button>
      </Link>
    </div>
  </div>
);

export default RecipeListItem;
