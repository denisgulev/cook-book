import moment from "moment";

// get visibleRecipes
const getVisibleRecipes = (recipes, { text, sortBy, startDate, endDate }) => {
  return recipes
    .filter(recipe => {
      const createdAtMoment = moment(recipe.createdAt);
      const startDateMatch = startDate
        ? startDate.isSameOrBefore(createdAtMoment, "day")
        : true;
      const endDateMatch = endDate
        ? endDate.isSameOrAfter(createdAtMoment, "day")
        : true;
      const textMatch = recipe.title.toLowerCase().includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") return a.createdAt < b.createdAt ? 1 : -1;
      else if (sortBy === "amount") return a.amount < b.amount ? 1 : -1;
    });
};

export default getVisibleRecipes;
