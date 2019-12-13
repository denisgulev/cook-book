import React from "react";
import { Link } from "react-router-dom";

const RecipeListItem = ({ id, title, description, createdAt }) => (
  <div>
    <Link to={`/edit/${id}`}>
      <h3>{title}</h3>
    </Link>
    <p>
      {description} - {createdAt}
    </p>
  </div>
);

export default RecipeListItem;
