import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { RoutePath } from "src/routes";
import { Cart, Category, Main, NotFound } from "src/components";
import { AppProvider } from "src/context";

const router = createBrowserRouter([
    {
        path: RoutePath.Main,
        element: <Main />,
    },
    {
        path: `${RoutePath.Category}/:categoryName`,
        element: <Category />,
    },
    {
        path: RoutePath.Cart,
        element: <Cart />,
    },
    {
        path: RoutePath.NotFound,
        element: <NotFound />,
    }
]);


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <AppProvider>
            <ToastContainer/>
            <RouterProvider router={router} />
        </AppProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
