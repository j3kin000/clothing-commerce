import React, { useContext, useEffect, useState } from "react";
import "./category.styles.scss";
import { useParams } from "react-router-dom";
import { productContext } from "../../contexts/products.context";
import ProductCard from "../../components/product-card/product-card.component";
import { selectCategoriesMap } from "../../store/categories/category.selector";
import { useSelector } from "react-redux";
const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const [prdcts, setPrdcts] = useState(categoriesMap[category]);

  useEffect(() => {
    setPrdcts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
      <h2 className="category-title">{category}</h2>
      <div className="category-container">
        {prdcts &&
          prdcts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </>
  );
};

export default Category;
