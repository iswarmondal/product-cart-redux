import { useSelector } from "react-redux";
import { RootState } from "../store";

const CartCalculations = () =>{
  const cart = useSelector((state: RootState)=>state.cart)
  return(
    <div className="ml-4 p-4 flex flex-col justify-start max-h-screen bg-white">

      <h2 className="text-2xl">Total {cart.products.length} products are in the cart</h2>

      <br/>

      <h2 className="text-2xl">Total amount is {Math.abs(cart.totalAmount).toFixed(2)}</h2>
    </div>
  )
}

export default CartCalculations;
