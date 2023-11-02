import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "../components/Product";
import { useParams } from "react-router-dom";

function CategoryProducts() {
  const [categories, setCategories] = useState([]);
  const { categoryName } = useParams();

  const fetchData = () => {
    axios
      .get("https://fakestoreapi.com/products/category/" + categoryName)
      .then((response) => setCategories(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [categoryName]);
  return (
    <div>
      <div>
        <div class="row">
          {categories.map((product) => (
            <Product data={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default CategoryProducts;
