import { createStore } from "@xstate/store";

export const uiStore = createStore({
  context: {
    sidebarOpen: false,
    counter: 0,
  },
  on: {
    toggleSidebar: (context) => ({
      ...context,
      sidebarOpen: !context.sidebarOpen,
    }),
    increment: (context, event: { by?: number }) => ({
      ...context,
      counter: context.counter + (event.by ?? 1),
    }),
    resetCounter: (context) => ({
      ...context,
      counter: 0,
    }),
  },
});
