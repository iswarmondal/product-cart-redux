import React from "react";
import ProductCard from "../components/ProductCard";
import CartFloatingActionButton from "../components/CartFloatingActionButton";

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

  const fetchProductData = React.useMemo(async () => {
    const response = await fetch(import.meta.env.VITE_PRODUCT_API_BASE_URL);
    const data: Array<ProductDataType> = await response.json();
    return data;
  }, []);

  React.useEffect(() => {
    fetchProductData
      .then((data) => {
        console.log(data);
        setProductList(data);
      })
      .catch((e) => {
        alert("Error happend while fetching the product list " + e.message);
      });
  });

  return (
    <>
      <CartFloatingActionButton />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
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
