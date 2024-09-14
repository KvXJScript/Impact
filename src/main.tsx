import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    RouterProvider,
} from "react-router-dom";
import { AppProvider } from "src/context";
import { router } from "src/routes";


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
