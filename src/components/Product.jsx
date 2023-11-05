import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeItem } from "../redux/cartSlice";
import wishListIcon from "../images/wishListIcon.png";
import redheart from "../images/redheart.png";
import { addToWishList, removeFromWishList } from "../redux/wishListSlice";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = (props) => {
  const { id, title, image, price, rating } = props.data;
  const dispatch = useDispatch();
  const product = {
    id: id,
    title: title,
    image: image,
    price: price,
    rating: rating,
  };

  const { wishList } = useSelector((state) => state.wishList);
  const { cart } = useSelector((state) => state.cart);

  const [inWish, setInWish] = useState("");
  const [inCart, setInCart] = useState("");

  const onAddToCartHandler = () => {
    let flag = false;
    cart.forEach((item) => {
      if (item.id == id) {
        flag = true;
      }
    });
    if (flag) {
      dispatch(removeItem(id));
      toast.success("Product removed from cart!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: "toast-message",
        autoClose: 1500,
      });
    } else {
      dispatch(addToCart(product));
      toast.success("Product successfully added to cart!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: "toast-message",
        autoClose: 1500,
      });
    }
  };

  const wishListHandler = () => {
    let flag = false;
    wishList.forEach((item) => {
      if (item.id == id) {
        flag = true;
      }
    });
    if (flag) {
      dispatch(removeFromWishList(product));
    } else {
      dispatch(addToWishList(product));
    }
  };

  const wishListIds = wishList.map((item) => item.id);
  useEffect(() => {
    if (wishListIds.includes(product.id)) {
      setInWish(true);
    } else {
      setInWish(false);
    }
  }, [wishList, wishListIds, id]);
  console.log(wishList);

  const cartIds = cart.map((item) => item.id);
  useEffect(() => {
    if (cartIds.includes(product.id)) {
      setInCart(true);
    } else {
      setInCart(false);
    }
  }, [cart, cartIds, id]);

  return (
    <div
      class="col-sm-3"
      style={{ backgroundColor: "white", marginBottom: "20px" }}>
      <div class="card">
        <Link
          to={"/products/detail/" + id}
          style={{
            textAlign: "center",
            paddingTop: "5px",
            paddingBottom: "5px",
          }}>
          <img
            src={image}
            alt=""
            className="card-top-img center-block"
            style={{
              height: "250px",
            }}
          />
        </Link>
        <span className="dis" key={product.id}>
          <img
            src={!inWish ? wishListIcon : redheart}
            onClick={() => wishListHandler()}
            style={{
              width: "25px",
              height: "25px",
            }}
          />
        </span>
        <div class="card-body">
          <h5 class="card-title truncate">{title}</h5>
          <div>
            <span class="ratting">
              <i data-star={rating.rate}></i>
            </span>{" "}
            <span class="ratting-count">({rating.count})</span>
          </div>

          <div className="price-btn">
            <p className="price">
              <span>$</span> {price}
            </p>

            <button
              onClick={onAddToCartHandler}
              className={
                inCart ? "btn btn-danger addbtn" : "btn btn-primary addbtn"
              }>
              {inCart ? "Remove from cart" : "Add to cart"}
            </button>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Product;
