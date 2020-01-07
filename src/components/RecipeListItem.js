import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const RecipeListItem = ({ id, title, description, createdAt }) => (
  <div className="list-item">
    <div className="list-item__image">
      <Link to={`/edit/${id}`}>
        <img src="/images/recipe.jpg" alt="Recipe Image" />
      </Link>
    </div>
    <div className="list-item__content">
      <h3 className="list-item__title">{title}</h3>
      <span className="list-item__subtitle">{description}</span>
    </div>
  </div>
);

export default RecipeListItem;
