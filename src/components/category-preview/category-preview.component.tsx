import React from "react";
import "./category-preview.styles.scss";
import ProductCard from "../product-card/product-card.component";
import { Link } from "react-router-dom";
import { CategoryItem } from "../../store/categories/category.types";
import { CartItem } from "../../store/cart/cart.types";

export type CategoryPreviewProps = {
  title: string;
  products: CategoryItem;
};
const CategoryPreview = ({ title, products }: CategoryPreviewProps) => {
  return (
    <div className="category-preview-container">
      <h2>
        <Link className="title" to={title}>
          {title.toUpperCase()}
        </Link>
      </h2>
      <div className="preview">
        {products
          .filter((_: any, index: number) => index < 4)
          .map((product: CartItem, index: React.Key | null | undefined) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
