import moment from "moment";
import selectRecipes from "../../selectors/recipes";
import recipes from "../fixtures/recipes";

test("should filter by text value", () => {
  const filters = {
    text: "c",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined
  };

  const result = selectRecipes(recipes, filters);

  expect(result).toEqual([recipes[0], recipes[1]]);
});

test("should filter by startDate", () => {
  const filters = {
    text: "",
    sortBy: "date",
    startDate: moment(0),
    endDate: undefined
  };

  const result = selectRecipes(recipes, filters);

  expect(result).toEqual([recipes[2], recipes[0]]);
});

test("should filter by endDate", () => {
  const filters = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: moment(0).add(2, "days")
  };

  const result = selectRecipes(recipes, filters);

  expect(result).toEqual([recipes[0], recipes[1]]);
});

test("should sort by date", () => {
  const filters = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined
  };

  const result = selectRecipes(recipes, filters);

  expect(result).toEqual([recipes[2], recipes[0], recipes[1]]);
});
