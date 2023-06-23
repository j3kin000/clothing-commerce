import React, { useContext } from "react";
import { productContext } from "../../contexts/products.context";
import "./categories-preview.styles.scss";
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
  const { products } = useContext(productContext);
  return (
    <>
      {Object.keys(products).map((title) => {
        const product = products[title];
        return <CategoryPreview key={title} title={title} products={product} />;
      })}
    </>
  );
};

export default CategoriesPreview;
