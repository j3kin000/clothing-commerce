import { Route, Routes } from "react-router-dom";
import "./shop.styles.scss";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { getCollectionAndDocuments } from "../../utils/firebase/firebase.utils";
import {
  fetchCategoriesAsync,
  fetchCategoriesStart,
  setCategories,
} from "../../store/categories/category.action";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getCategoriesMap = async () => {
      // dispatch(fetchCategoriesAsync());
      dispatch(fetchCategoriesStart());
    };
    getCategoriesMap();
  }, []);
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
