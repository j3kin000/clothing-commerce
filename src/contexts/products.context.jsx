import { createContext, useEffect, useState } from "react";
import { SHOP_DATA } from "../shop-data";
import { getCollectionAndDocuments } from "../utils/firebase/firebase.utils";

export const productContext = createContext({
  products: {},
  // setProducts: () => null,
});

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState({});
  const value = { products };

  return (
    <productContext.Provider value={value}>{children}</productContext.Provider>
  );
};
