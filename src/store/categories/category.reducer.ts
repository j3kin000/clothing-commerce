import {
  CategoryAction,
  fetchCategoriesFailed,
  fetchCategoriesStart,
  fetchCategoriesSuccess,
} from "./category.action";
import { CATEGORIES_ACTION_TYPES, Category } from "./category.types";
import { AnyAction } from "redux";
export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

// export default (state = INITIAL_STATE, action = {} as AnyAction) => {
//   switch (action.type) {
//     case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
//       return { ...state, isLoading: true };

//     case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
//       return { ...state, categories: action.payload, isLoading: false };

//     case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
//       return { ...state, isLoading: false, error: action.payload };

//     default:
//       return state;
//   }
// };

export default (
  state = INITIAL_STATE,
  action = {} as AnyAction
): CategoriesState => {
  if (fetchCategoriesStart.match(action)) {
    return { ...state, isLoading: true };
  }
  if (fetchCategoriesSuccess.match(action)) {
    return { ...state, categories: action.payload, isLoading: false };
  }
  if (fetchCategoriesFailed.match(action)) {
    return { ...state, isLoading: false, error: action.payload };
  }
  return state;
};
