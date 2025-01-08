import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import PrivateRoute from "./utils/PrivateRoute";
import { Bounce, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import useUserStore from "./store/userStore";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <PrivateRoute element={<Home />} />,
  },
]);

function App() {
  const { user, fetchLocal } = useUserStore();

  useEffect(() => {
    if (!user) {
      fetchLocal();
    }
  }, [user]);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
