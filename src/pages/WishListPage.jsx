import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";

import Product from "../components/Product";
import wishlistEmpty from "../images/wishlistEmpty.png";

function WishListPage() {
  const { wishList } = useSelector((state) => state.wishList);
  return (
    <>
      <Navbar />
      <div>
        {wishList.length > 0 ? (
          <div class="row">
            {wishList.map((product) => (
              <Product data={product} />
            ))}
          </div>
        ) : (
          <div className="wishMessage">
            <p>Your wish list is empty</p>
            <img src={wishlistEmpty} alt="" />
          </div>
        )}
      </div>
    </>
  );
}

export default WishListPage;
