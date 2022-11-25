import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesReducerObject) => categoriesReducerObject.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    console.log("selector fired");
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesReducerObject) => categoriesReducerObject.isLoading
);
