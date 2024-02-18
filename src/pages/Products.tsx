import React from "react";
import ProductCard from "../components/ProductCard";
import CartFloatingActionButton from "../components/CartFloatingActionButton";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface ProductDataType {
  title: string;
  description: string;
  image: string;
  price: number;
  id: number;
}

const Products = () => {
  const [productList, setProductList] = React.useState<Array<ProductDataType>>(
    [],
  );
  const cart = useSelector((state: RootState)=> state.cart)

  const fetchProductData = React.useMemo(async () => {
    const response = await fetch(import.meta.env.VITE_PRODUCT_API_BASE_URL);
    const data: Array<ProductDataType> = await response.json();
    return data;
  }, []);

  React.useEffect(() => {
    fetchProductData
      .then((data) => {
        setProductList(data);
      })
      .catch((e) => {
        alert("Error happend while fetching the product list " + e.message);
      });
  });

  return (
    <>
      {
        cart.totalAmount > 0 && <CartFloatingActionButton /> 
      }
      <div className="py-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 justify-items-center bg-gradient-to-r from-blue-100/50 to-zinc-100">
        {productList.map((value) => {
          return (
            <ProductCard
              title={value.title}
              description={value.description}
              image={value.image}
              price={value.price}
              productId={value.id}
              key={value.id}
            />
          );
        })}
      </div>
    </>
  );
};

export default Products;
