import { createRoute } from "@tanstack/react-router";

import { HomeScreen } from "../components/home-screen";
import { Route as rootRoute } from "./__root";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomeRoute
});

function HomeRoute() {
  return <HomeScreen />;
}
