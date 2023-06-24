import React, { useContext } from "react";
import { productContext } from "../../contexts/products.context";
import "./categories-preview.styles.scss";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/category.selector";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  return (
    <>
      {Object.keys(categoriesMap).map((title) => {
        const product = categoriesMap[title];
        return <CategoryPreview key={title} title={title} products={product} />;
      })}
    </>
  );
};

export default CategoriesPreview;
