import Navbar from "../components/Navbar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeItem } from "../redux/cartSlice";

import { useParams } from "react-router-dom";

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { cart } = useSelector((state) => state.cart);
  const [inCart, setInCart] = useState("");

  const dispatch = useDispatch();

  const fetchData = () => {
    axios
      .get("https://fakestoreapi.com/products/" + id)
      .then((response) => setProduct(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onAddToCartHandler = () => {
    let flag = false;
    cart.forEach((item) => {
      if (item.id == product.id) {
        flag = true;
      }
    });
    if (flag) {
      dispatch(removeItem(product.id));
    } else {
      dispatch(addToCart(product));
    }
  };
  const cartIds = cart.map((item) => item.id);
  useEffect(() => {
    if (cartIds.includes(product.id)) {
      setInCart(true);
    } else {
      setInCart(false);
    }
  }, [cart, cartIds, id]);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div
          style={{
            backgroundColor: "#fff",
            padding: "40px",

            marginTop: "80px",
            marginLeft: "250px",
            borderRadius: "10px",
          }}>
          <div className="row detail">
            <div className="col-md-3">
              <img
                src={product.image}
                alt=""
                className="img-fluid"
                style={{ height: "300px", width: "200px" }}
              />
            </div>
            <div className="col-md-6">
              <h5>{product.title}</h5>

              <p>{product.description}</p>
              <h2>
                <span>$</span>
                {product.price}
                <span
                  style={{
                    fontSize: "22px",
                    marginLeft: "10px",
                    color: "#888",
                  }}></span>
              </h2>

              <br />

              <button
                className={
                  inCart ? "btn btn-danger addbtn" : "btn btn-primary addbtn"
                }
                onClick={onAddToCartHandler}>
                {inCart ? "Remove from cart" : "Add to cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductDetailPage;
