import { takeLatest, all, call, put } from "redux-saga/effects"; //side effect generator files is must when working with redux saga
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./category.action";
import { CATEGORIES_ACTION_TYPES } from "./category.type";

export function* fetchCategoiesAsync() {
  try {
    const categoriesArray = yield call(getCategoriesAndDocuments, "categories"); //yield and await is similar which wait until it gets back data from api
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoiesAsync
  );
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
