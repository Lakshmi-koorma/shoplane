import { useSelector } from "react-redux";
import "../styles/cart.css";
import { Link } from "react-router-dom";

function OrderSummary() {
  const { cart } = useSelector((state) => state.cart);

  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    cart.forEach((item) => {
      totalQuantity += item.quantity;
      totalPrice += item.price * item.quantity;
    });
    return { totalPrice, totalQuantity };
  };

  return (
    <div className="total">
      <p>Price Details({getTotal().totalQuantity} items) </p>
      <p>
        Total MRP <strong>${getTotal().totalPrice}</strong>
      </p>
      <p>
        Convienience fee <strong>$20</strong>
      </p>
      <p>
        Total price<strong>${getTotal().totalPrice + 20}</strong>{" "}
      </p>
      <div className="btn-summary">
        <Link to={"/"}>
          <button className="btn btn-primary">Continue shopping</button>
        </Link>
        <button className="btn btn-primary">Checkout</button>
      </div>
    </div>
  );
}
export default OrderSummary;
