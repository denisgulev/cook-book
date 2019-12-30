import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const RecipeListItem = ({ id, title, description, createdAt }) => (
  <Link className="list-item" to={`/edit/${id}`}>
    <div>
      <h3 className="list-item__title">{title}</h3>
      <span className="list-item__subtitle">{description}</span>
    </div>
    <h3 className="list-item__data">
      {moment(createdAt).format("MMMM Do, YYYY")}
    </h3>
  </Link>
);

export default RecipeListItem;
