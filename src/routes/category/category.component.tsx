import React, { useContext, useEffect, useState } from "react";
import "./category.styles.scss";
import { useParams } from "react-router-dom";
import { productContext } from "../../contexts/products.context";
import ProductCard from "../../components/product-card/product-card.component";
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from "../../store/categories/category.selector";
import { useSelector } from "react-redux";
import Spinner from "../../components/spinner/spinner.component";
import { CartItem } from "../../store/cart/cart.types";

type CategoryRouteParams = {
  category: string;
};
const Category = () => {
  const { category } = useParams<
    keyof CategoryRouteParams
  >() as CategoryRouteParams;
  const categoriesMap = useSelector(selectCategoriesMap);
  const [prdcts, setPrdcts] = useState(categoriesMap[category]);
  const isLoading = useSelector(selectCategoriesIsLoading);
  useEffect(() => {
    setPrdcts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
      <h2 className="category-title">{category}</h2>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="category-container">
          {prdcts &&
            prdcts.map((product: CartItem) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </>
  );
};

export default Category;
