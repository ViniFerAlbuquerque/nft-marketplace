
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";

import Home from "../pages/Home";
import NFTDetails from "../pages/NFTDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import OrderConfirmation from "../pages/OrderConfirmation";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Wallets from "../pages/Wallets";
import Header from "../components/layout/Header";




const rootRoute = createRootRoute({
  component: () => (
    <>
      <Header />
      <Outlet />
    </>
  ),
});


const routes = [
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Home,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/nft/$nftId",
    component: NFTDetails,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/cart",
    component: Cart,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/checkout",
    component: Checkout,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/orders/$orderId",
    component: OrderConfirmation,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/login",
    component: Login,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/register",
    component: Register,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/profile",
    component: Profile,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/wallets",
    component: Wallets,
  }),
];

const routeTree = rootRoute.addChildren(routes);

export const router = createRouter({
  routeTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}