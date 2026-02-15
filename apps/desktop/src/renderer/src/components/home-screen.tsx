import { useEffect, useMemo, useState } from "react";

import { appMachine, uiStore } from "@starter/app-core";
import { SilkButton } from "@starter/ui";
import { createActor } from "xstate";

import { createIpc } from "../lib/ipc";

type BootstrapData = {
  appName: string;
  message: string;
  timestamp: string;
};

export function HomeScreen() {
  const [bootstrapData, setBootstrapData] = useState<BootstrapData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [counter, setCounter] = useState(uiStore.getSnapshot().context.counter);
  const actor = useMemo(() => createActor(appMachine), []);
  const ipc = useMemo(() => createIpc(window.desktopApi), []);

  useEffect(() => {
    const subscription = uiStore.subscribe((snapshot) => {
      setCounter(snapshot.context.counter);
    });

    actor.start();
    actor.send({ type: "BOOT" });

    void ipc.client
      .GetBootstrapData()
      .then((result) => setBootstrapData(result))
      .catch((reason: unknown) => {
        const message = reason instanceof Error ? reason.message : String(reason);
        setError(message);
      });

    return () => {
      actor.stop();
      subscription.unsubscribe();
    };
  }, [actor, ipc]);

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <p className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
          Setup-First Electron Starter
        </p>
        <h1 className="text-3xl font-semibold text-foreground">Desktop App Shell</h1>
        <p className="text-sm text-muted-foreground">
          TanStack Router, Effect RPC, XState, shadcn-ready Tailwind, and Silk wrappers are wired
          and ready.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-background p-4">
          <h2 className="text-sm font-semibold uppercase text-muted-foreground">RPC Status</h2>
          {bootstrapData ? (
            <div className="mt-2 space-y-1 text-sm">
              <p>
                <span className="font-medium">App:</span> {bootstrapData.appName}
              </p>
              <p>
                <span className="font-medium">Message:</span> {bootstrapData.message}
              </p>
              <p>
                <span className="font-medium">Timestamp:</span> {bootstrapData.timestamp}
              </p>
            </div>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">
              Loading bootstrap data from main...
            </p>
          )}
          {error ? <p className="mt-2 text-sm text-destructive">{error}</p> : null}
        </div>

        <div className="rounded-lg border border-border bg-background p-4">
          <h2 className="text-sm font-semibold uppercase text-muted-foreground">Store Example</h2>
          <p className="mt-2 text-sm">Counter: {counter}</p>
          <div className="mt-3 flex gap-2">
            <SilkButton onClick={() => uiStore.send({ type: "increment", by: 1 })}>
              Increment
            </SilkButton>
            <SilkButton
              className="bg-secondary text-secondary-foreground"
              onClick={() => uiStore.send({ type: "resetCounter" })}
            >
              Reset
            </SilkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
