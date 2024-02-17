import { createBrowserRouter } from "react-router-dom";
import Products from "./pages/Products";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Products />,
  },
  {
    path: "/cart",
    element: <Products />,
  },
]);
