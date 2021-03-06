// get visibleRecipes - 2nd argument is "filterReducerState"
const getVisibleRecipes = (recipes, {text, sortBy, category}) => {
    return recipes
        .filter(recipe => {
            const textMatch = recipe.title.toLowerCase().includes(text.toLowerCase());
            if (recipe.category !== undefined) {
                if (category.toLowerCase() === 'tutte') {
                    // show all recipes
                    return true && textMatch;
                } else {
                    // show recipe with category = searched category
                    const categoryMatch =
                        recipe.category.toLowerCase() === category.toLowerCase();

                    return categoryMatch && textMatch;
                }
            } else {
                return false;
            }
        });
        //.sort((a, b) => (a.title < b.title ? -1 : 1));
};

export default getVisibleRecipes;
