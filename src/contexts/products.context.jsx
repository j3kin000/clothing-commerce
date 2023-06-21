import { createContext, useState } from "react";
import PRODUCTS from "../shop-data.json";

export const productContext = createContext({
  prducts: [],
  // setProducts: () => null,
});

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products };
  return (
    <productContext.Provider value={value}>{children}</productContext.Provider>
  );
};
