import { useSelector } from "react-redux";
import { RootState } from "../store";
import CartProductCard from "../components/CartProductCard";
import CartCalculations from "../components/CartCalculations";

const Cart = () => {
  const cartData = useSelector((state: RootState) => state.cart);

  return (
    <div className="p-2 min-h-screen flex justify-space-between bg-gradient-to-r from-blue-100/50 to-zinc-100">
      <div className="w-3/4">
      {cartData.products.length === 0
        ? (
          <div className="h-sceen flex justify-center align-center">
            <h2>No products in the cart</h2>
          </div>
        )
        : cartData.products.filter((value, index, array)=> array.indexOf(value) === index).map((element) => {
          return <CartProductCard id={element} />;
        })}
        </div>
        <div className="w-1/4">
          <CartCalculations />
        </div>
    </div>
  );
};

export default Cart;
