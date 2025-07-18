import React, { createContext, useState, useContext } from "react";

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const addProduct = (product) => {
    setProducts((prev) => [...prev, product]);
  };

  const removeProduct = (index) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, removeProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
