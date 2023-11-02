import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
} from "../redux/cartSlice";
import deleete from "../images/deleete.png";

import { useDispatch } from "react-redux";
import "../styles/cart.css";

function CartItem(props) {
  const { id, title, image, price, quantity = 0 } = props.data;
  const dispatch = useDispatch();

  return (
    <div className="cartItem">
      <img className="cart" src={image} alt="item" />
      <div className="description">
        <div className="truncate">
          <p>{title}</p>
        </div>
        <div className="cartPrice">
          {" "}
          <p> Price: ${price}</p>
        </div>

        <div className="countRemove">
          <div className="countHandler">
            <button onClick={() => dispatch(decrementQuantity(id))}> - </button>

            <p className="quantity_input">{quantity}</p>
            <button onClick={() => dispatch(incrementQuantity(id))}> + </button>
          </div>
          <img
            className="cartItem_removeButton"
            alt=""
            src={deleete}
            onClick={() => dispatch(removeItem(id))}></img>
        </div>
      </div>
    </div>
  );
}
export default CartItem;
