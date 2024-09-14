import { createBrowserRouter } from "react-router-dom";
import { RoutePath } from "./routes.types.ts";
import { Cart, Category, Main, NotFound } from "src/components";

export const router = createBrowserRouter([
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