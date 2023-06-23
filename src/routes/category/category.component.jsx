import React, { useContext, useEffect, useState } from "react";
import "./category.styles.scss";
import { useParams } from "react-router-dom";
import { productContext } from "../../contexts/products.context";
import ProductCard from "../../components/product-card/product-card.component";
const Category = () => {
  const { category } = useParams();
  const { products } = useContext(productContext);
  const [prdcts, setPrdcts] = useState(products[category]);

  useEffect(() => {
    setPrdcts(products[category]);
  }, [category, products]);

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
