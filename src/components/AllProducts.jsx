import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "./Product";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const fetchData = () => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div class="row" style={{ padding: "25px" }}>
        {products.map((product) => (
          <Product data={product} />
        ))}
      </div>
    </div>
  );
}
export default AllProducts;
