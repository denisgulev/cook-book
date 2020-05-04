import React from "react";
import { Link } from "react-router-dom";

const RecipeListItem = ({ id, title, description, imageUrl }) => (
  <div className="list-item">
    <div className="list-item__image">
			<Link to={`/recipe/${id}`}>
				<img src={imageUrl} alt="Recipe Image" />
      </Link>
    </div>
    <div className="list-item__content">
      <div className="list-item__heading">
        <span className="list-item__title">{title}</span>
        <span className="list-item__subtitle">{description}</span>
      </div>
    </div>
  </div>
);

export default RecipeListItem;
