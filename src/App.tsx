import { Route, Routes, Navigate } from "react-router-dom";
import Gallery from "./pages/Gallery";
import { NotificationContainer } from "react-notifications";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Balances from "./balances";

const router = createBrowserRouter([
  {
    path: "/balances",
    element: <Balances />,
  },
]);

function App() {
    return (
        <div className="App"> 
        <RouterProvider router={router}></RouterProvider>
            <Routes>
                <Route path="/" element={<Gallery />} />
                <Route path="/address/:address" element={<Gallery />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
         
            <NotificationContainer />
        </div>
    );
}

export default App;
