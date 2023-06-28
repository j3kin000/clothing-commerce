import { createSelector } from "reselect";

const selectCategorySelector = (state) => state.category;

export const selectCategories = createSelector(
  [selectCategorySelector],
  (category) => {
    return category.categories;
  }
);
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategorySelector],
  (categories) => categories.isLoading
);

export const selectCategoriesError = createSelector(
  [selectCategorySelector],
  (categories) => categories.error
);
