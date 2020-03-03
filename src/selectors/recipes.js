import moment from "moment";

// get visibleRecipes - 2nd argument is "filterReducerState"
const getVisibleRecipes = (recipes, { text, sortBy, startDate, endDate, category }) => {
  return recipes
    .filter(recipe => {
      const textMatch = recipe.title.toLowerCase().includes(text.toLowerCase());
      if (sortBy === "date") {
        const createdAtMoment = moment(recipe.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, "day") : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, "day") : true;

        return startDateMatch && endDateMatch && textMatch;
      } else if (sortBy === "category") {
        if (recipe.category !== undefined) {
          if (category.toLowerCase() === "all") {
            // show all recipes
            return true && textMatch;
          } else {
            // show recipe with category = searched category
            const categoryMatch = recipe.category.toLowerCase() === category.toLowerCase();

            return categoryMatch && textMatch;
          }
        } else {
          return false;
        }
      }
    })
    .sort((a, b) => {
      if (sortBy === "date") return a.createdAt < b.createdAt ? 1 : -1;
      else if (sortBy === "category") return a.title < b.title ? -1 : 1;
    });
};

export default getVisibleRecipes;
