import React from "react";
import {Link} from "react-router-dom";

const RecipeListItem = ({title, description, imageUrl, index}) => (
    <Link to={`/recipe/${index}`}>
        <div className="list-item" style={{backgroundImage: `url(${imageUrl})`}}>
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
