import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {RootState} from '../store'

const CartFloatingActionButton = () =>{
const cartCount = useSelector((state: RootState)=> state.cart.products.length)

  return (
    <>
      <Link to="/cart" className='btn btn-accent w-52 fixed bottom-4 right-10 z-50 backdrop-blur-md text-white hover:text-black'>
        Cart
        <div className="badge">{cartCount<=99 ? cartCount : "99+"}</div>
      </Link>
    </>
  )
}

export default CartFloatingActionButton;
