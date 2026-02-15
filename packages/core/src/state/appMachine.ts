import { assign, fromPromise, setup } from "xstate";

export type AppMachineEvents = { type: "BOOT" } | { type: "RETRY" };

type AppMachineContext = {
  message: string | null;
  error: string | null;
};

const bootstrapActor = fromPromise(async () => {
  return "Starter runtime initialized";
});

export const appMachine = setup({
  types: {
    context: {} as AppMachineContext,
    events: {} as AppMachineEvents,
  },
  actors: {
    bootstrapActor,
  },
}).createMachine({
  id: "appBoot",
  initial: "idle",
  context: {
    message: null,
    error: null,
  },
  states: {
    idle: {
      on: {
        BOOT: "loading",
      },
    },
    loading: {
      invoke: {
        src: "bootstrapActor",
        onDone: {
          target: "ready",
          actions: assign({
            message: ({ event }) => event.output,
            error: () => null,
          }),
        },
        onError: {
          target: "error",
          actions: assign({
            error: ({ event }) => String(event.error),
            message: () => null,
          }),
        },
      },
    },
    ready: {
      on: {
        BOOT: "loading",
      },
    },
    error: {
      on: {
        RETRY: "loading",
      },
    },
  },
});
