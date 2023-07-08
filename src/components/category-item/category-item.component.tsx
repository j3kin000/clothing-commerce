import React, { FC } from "react";
import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from "./category-item.styles";
import { useNavigate } from "react-router-dom";

type Category = {
  category: { imageUrl: string; title: string; route: string };
};
const CategoryItem: FC<Category> = ({ category }) => {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);
  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default CategoryItem;
