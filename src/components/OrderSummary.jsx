import { useSelector } from "react-redux";
import "../styles/cart.css";

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
      <p>Total ({getTotal().totalQuantity} items) :</p>
      <div>
        <p className="total__p">
          <strong>${getTotal().totalPrice}</strong>
        </p>
      </div>
    </div>
  );
}
export default OrderSummary;
