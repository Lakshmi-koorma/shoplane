import "../styles/navbar.css";
import { useEffect, useState } from "react";

import cartLogo from "../images/cartLogo.png";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(false);
  const { cart } = useSelector((state) => state.cart);

  const fetchData = () => {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((response) => setCategory(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      setLoginStatus(false);
    } else {
      setLoginStatus(true);
    }
  }, [loginStatus]);

  const onLogoutHandler = () => {
    localStorage.clear();
    setLoginStatus(false);
    // navigate("/");
  };

  const getTotalQuantity = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity;
    });
    return total;
  };
  return (
    <div class="header">
      <div className="top-menu">
        <div>
          <Link to={"/"} className="name text-decoration-none">
            <span className="first-name">SHOP</span>
            <span className="last-name">LANE</span>
          </Link>
        </div>

        <div className="left-head">
          {loginStatus ? (
            <Link
              to={"/"}
              className="btn btn-outline-danger"
              onClick={onLogoutHandler}>
              Logout
            </Link>
          ) : (
            <Link className="btn btn-outline-primary" to="/login">
              Login
            </Link>
          )}
          <Link to={"/cart"}>
            {" "}
            <img className="logo" src={cartLogo} alt="logo" />
          </Link>
          <span className="badge badge-dark " style={{ height: "30px" }}>
            {getTotalQuantity()}
          </span>
        </div>
      </div>

      <hr />

      <nav className="nav-bar">
        <ul className="nav-links">
          <li className="nav-link">
            <Link to={"/"}>All</Link>
          </li>
          {category.map((eachCat) => (
            <li className="nav-link">
              <Link
                to={"/each/" + eachCat}
                className="CategoryNames"
                style={{ textTransform: "capitalize" }}>
                {eachCat}
              </Link>
            </li>
          ))}

          <li className="nav-link">
            <Link to={"/wishlist"}>Wish list</Link>
          </li>
        </ul>
      </nav>
      <hr />
    </div>
  );
}
export default Navbar;
