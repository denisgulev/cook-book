import React from "react";
import { Link } from "react-router-dom";

const RecipeListItem = ({ id, title, description, imageUrl }) => (
	<Link to={`/recipe/${id}`}>
		<div className="list-item" style={{ backgroundImage: `url(${imageUrl})`}}>
			<div className="list-item__content">
				<div className="list-item__heading">
					<span className="list-item__title">{title}</span>
					<span className="list-item__subtitle">{description}</span>
				</div>
			</div>
		</div>
	</Link>
);

export default RecipeListItem;
