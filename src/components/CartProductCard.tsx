import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { addProduct, removeOneProduct } from "../features/cart/cartSlice";

interface PropTypes {
  id: number;
}

interface ProductDataType {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

const CartProductCard = (props: PropTypes) => {
  const dispatch = useDispatch();
  const [productData, setProductData] = React.useState<ProductDataType | null>(
    null,
  );
  const [productCount, setProductCount] = React.useState(0);

  const cart = useSelector((state: RootState) => state.cart);

  const fetchProductFromProductId = React.useMemo(async () => {
    let data: ProductDataType | null = null;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PRODUCT_API_BASE_URL}/${props.id}`,
      );
      data = await response.json();
    } catch (error) {
      alert(`Unable to fetch product with id ${props.id}`);
    }
    return data;
  }, []);

  const addOne = () => {
    if (!productData) return;

    dispatch(
      addProduct({ productId: productData.id, price: productData.price }),
    );
  };

  const removeOne = () => {
    if (!productData) return;
    console.log({ productId: productData.id, price: productData.price });

    dispatch(
      removeOneProduct({ productId: props.id, price: productData.price }),
    );
  };

  React.useEffect(() => {
    fetchProductFromProductId
      .then((data) => setProductData(data))
      .catch(() => {
        // alert(`Unable to fetch product data for id ${props.id}`);
        console.error(`Unable to fetch product data for id ${props.id}`);
      });
    setProductCount(
      cart.products.filter((element) => element === productData?.id).length,
    );
  });

  React.useEffect(() => {
    setProductCount(
      cart.products.filter((element) => element === productData?.id).length,
    );
  }, [cart.products]);

  if (productData === null) return null;

  return (
    <div className="card card-side bg-base-100 shadow-xl px-2 my-2">
      <figure>
        <img
          className="w-20"
          src={productData.image}
          alt="Movie"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {productData.title} {productData.id}
          <span className="text-primary">x{productCount}</span>
        </h2>
        <p className="max-w-[1200px]">{productData.description}</p>
        <div className="flex justify-between">
          <h2 className="text-xl text-green-600">$ {productData.price}</h2>
          <div className="card-actions justify-end">
            <button className="btn" onClick={addOne}>+1</button>
            <button className="btn" onClick={removeOne}>-1</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
