import { createSelector } from "reselect";
import { CategoriesState } from "./category.reducer";
import { CategoryMap } from "./category.types";
import { RootState } from "../store";

const selectCategorySelector = (state: RootState): CategoriesState =>
  state.category;

export const selectCategories = createSelector(
  [selectCategorySelector],
  (category) => {
    return category.categories;
  }
);
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): CategoryMap =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategorySelector],
  (categories) => categories.isLoading
);

export const selectCategoriesError = createSelector(
  [selectCategorySelector],
  (categories) => categories.error
);
