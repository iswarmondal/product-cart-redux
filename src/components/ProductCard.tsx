import { RootState } from "../store.ts";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "../features/cart/cartSlice.ts";

interface PropTypes {
  productId: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

const ProductCard = (props: PropTypes) => {
  const cart = useSelector((state: RootState) => state.cart.products);
  const dispatch = useDispatch();

  const [isAddedToCart, setIsAddedToCart] = React.useState(false);

  const handleAddToCart = React.useCallback((id: number, price: number) => {
    dispatch(addProduct({ productId: id, price }));
    setIsAddedToCart(true);
  }, []);

  const handleRemoveFromCart = React.useCallback(
    (id: number, price: number) => {
      dispatch(removeProduct({ productId: id, price }));
      setIsAddedToCart(false);
    },
    [],
  );

  React.useEffect(() => {
    const isAlreadyAddedToCart = cart.includes(props.productId);

    isAlreadyAddedToCart ? setIsAddedToCart(true) : null;
  });
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img height="300px" src={props.image} alt={props.title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{props.title}</h2>
        <h3 className="primary">${props.price}</h3>
        <p>{props.description.slice(0, 100)}...</p>
        <div className="card-actions justify-end">
          {isAddedToCart
            ? (
              <button
                className="btn btn-primary bg-gray-300 hover:bg-gray-400"
                onClick={() =>
                  handleRemoveFromCart(props.productId, props.price)}
              >
                Remove from Cart
              </button>
            )
            : (
              <button
                className="btn text-white btn-primary"
                onClick={() => handleAddToCart(props.productId, props.price)}
              >
                Add to Cart
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
