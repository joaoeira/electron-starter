import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <main className="min-h-screen p-6 sm:p-10">
      <div className="mx-auto max-w-5xl rounded-xl border border-border/60 bg-card/95 p-6 shadow-2xl backdrop-blur">
        <Outlet />
      </div>
    </main>
  );
}
