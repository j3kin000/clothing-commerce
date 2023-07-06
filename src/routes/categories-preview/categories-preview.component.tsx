import React, { useContext } from "react";
import { productContext } from "../../contexts/products.context";
import "./categories-preview.styles.scss";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { useSelector } from "react-redux";
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from "../../store/categories/category.selector";
import Spinner from "../../components/spinner/spinner.component";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title) => {
          const product = categoriesMap[title];
          return (
            <CategoryPreview key={title} title={title} products={product} />
          );
        })
      )}
    </>
  );
};

export default CategoriesPreview;
