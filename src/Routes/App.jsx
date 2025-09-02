import LogIn from "./LogIn";
import SignUp from "./SignUp";
import UserProfile from "../assets/UserProfile";
import CreateMenu from "./CreateMenu";
import Cart from "../assets/Cart";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Protected } from "./Protected";

import { AuthContext } from "../Context/AuthContext";
import HomePage from "../HomePage";
import AdminLandPage from "./AdminLandPage";
import { ProtectedAdmin } from "./ProtectedAdmin";
import EditProfile from "../assets/EditProfile";
import Products from "../assets/Products";
import { CartContext, CartProvider } from "../Context/CartContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LogIn></LogIn>,
    },
    {
      path: "/UserProfile",
      element: <Protected><UserProfile></UserProfile></Protected>,
    },
    {
      path: "/SignUp",
      element: <SignUp></SignUp>,
    },
    {
      path: "/home",
      element:<Protected><HomePage></HomePage></Protected>,
    },
    {
      path: "/createmenu",
      element:<ProtectedAdmin><CreateMenu></CreateMenu></ProtectedAdmin>,
    },
    {
      path: "/adminhome",
      element:<ProtectedAdmin><AdminLandPage></AdminLandPage></ProtectedAdmin>,
    },
    {
      path: "/EditProfile",
      element: <Protected><EditProfile></EditProfile></Protected>,
    },
    {
      path: "/Productos",
      element: <Protected><Products></Products></Protected>,
    },
    {
      path: "/Cart", 
      element: <Protected><Cart></Cart></Protected>,
    }
  ]);

  return (
    <AuthContext>
      <CartProvider>
      <RouterProvider router={router}></RouterProvider>
      </CartProvider>
    </AuthContext>
  );
}


export default App;
