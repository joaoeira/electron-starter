import { createFileRoute } from "@tanstack/react-router";

import { HomeScreen } from "../components/home-screen";
export const Route = createFileRoute("/")({
  component: HomeRoute,
});

function HomeRoute() {
  return <HomeScreen />;
}
