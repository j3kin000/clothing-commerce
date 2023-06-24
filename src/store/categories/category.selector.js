import { createSelector } from "reselect";

const selectCategorySelector = (state) => state.category;

export const selectCategories = createSelector(
  [selectCategorySelector],
  (categoriesSlice) => categoriesSlice.categories
);
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    console.log("fired");
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);
