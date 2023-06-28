import { takeLatest, all, call, put } from "redux-saga/effects";
import {
  createUserDocumentFromAuth,
  getCollectionAndDocuments,
} from "../../utils/firebase/firebase.utils";
import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./category.action";
import { CATEGORIES_ACTION_TYPES } from "./category.types";

// export const fetchCategoriesAsync = () => async (dispatch) => {
//   dispatch(fetchCategoriesStart);
//   try {
//     const categoriesArray = await getCollectionAndDocuments();
//     dispatch(fetchCategoriesSuccess(categoriesArray));
//   } catch (error) {
//     dispatch(fetchCategoriesFailed(error));
//   }
// };

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCollectionAndDocuments); // yield is similar to await but you need to use generator effect used call
    // yield call(getCollectionAndDocuments,'collection','anotherparam'); this is how you write when theres a parameterin your function
    yield put(fetchCategoriesSuccess(categoriesArray)); // instead of dispatch we call put
  } catch (error) {
    yield put(fetchCategoriesFailed(error)); // instead of dispatch we call put
  }
}
export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  ); //take latest cancel all the previous one and take the latest
}
export function* categoriesSaga() {
  yield all([call(onFetchCategories)]); //all means run everything inside  and only complete when all is done before we continue the code below
}
