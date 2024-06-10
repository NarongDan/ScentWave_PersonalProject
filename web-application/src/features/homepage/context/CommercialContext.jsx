import productApi from "../../../apis/product";

import { useState, createContext, useEffect } from "react";

export const CommercialContext = createContext();

export default function CommercialContextProvider({ children }) {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await productApi.getAllProducts();
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <CommercialContext.Provider value={{ products }}>
        {children}
      </CommercialContext.Provider>
    </div>
  );
}
