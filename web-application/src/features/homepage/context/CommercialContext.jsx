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

  const getRandomProducts = (num) => {
    const shuffledProducts = [...products].sort(() => 0.5 - Math.random());
    return shuffledProducts.slice(0, num);
  }; /// ใช่สุ่มของมาโชว์

  return (
    <div>
      <CommercialContext.Provider value={{ products, getRandomProducts }}>
        {children}
      </CommercialContext.Provider>
    </div>
  );
}
