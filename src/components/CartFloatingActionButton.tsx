import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {RootState} from '../store'

const CartFloatingActionButton = () =>{
const cartCount = useSelector((state: RootState)=> state.cart.products.length)

  return (
    <>
      <Link to="/cart" className='btn btn-accent fixed bottom-2 right-20 z-50'>
        Cart
        <div className="badge badge-secondary">{cartCount<=99 ? cartCount : "99+"}</div>
      </Link>
    </>
  )
}

export default CartFloatingActionButton;
