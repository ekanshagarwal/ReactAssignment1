import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SecondPage from "./pages/second-page";
import Form from "./component/form";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Form />,
  },
  {
    path: "/second",
    element: <SecondPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
