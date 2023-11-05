import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import Navbar from "../components/Navbar";
import "../styles/cart.css";
import OrderSummary from "../components/OrderSummary";
import cartEmpty from "../images/cartEmpty.png";
function CartPage() {
  const { cart } = useSelector((state) => state.cart);

  const getTotalQuantity = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity;
    });
    return total;
  };

  return (
    <>
      <Navbar />

      <div className="cart">
        <h2>Order Summary</h2>
        <div className="cartss">
          <div className="cart">
            {cart?.map((item) => (
              <CartItem data={item} />
            ))}
          </div>
          {getTotalQuantity() > 0 ? (
            <div className="checkout">
              <OrderSummary />
            </div>
          ) : (
            <div className="cartMessage">
              <p> Your Shopping Cart is Empty</p>
              <img src={cartEmpty} alt="image" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default CartPage;
