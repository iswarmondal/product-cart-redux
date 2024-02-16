import "./App.css";
import React from "react";

function App() {
  React.useEffect(
    () => {
      const fetchProductData = async () => {
        const response = await fetch("https://fakestoreapi.com/products");

        console.log(await response.json());
      };

      fetchProductData();
    },
    [],
  );
  return (
    <>
      Hello
    </>
  );
}

export default App;
