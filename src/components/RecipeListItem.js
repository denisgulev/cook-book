import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const RecipeListItem = ({ id, title, description, createdAt }) => (
  <div>
    <Link to={`/edit/${id}`}>
      <h3>{title}</h3>
    </Link>
    <p>
      {description}
      ---
      {moment(createdAt).format("MMMM Do, YYYY")}
    </p>
  </div>
);

export default RecipeListItem;
