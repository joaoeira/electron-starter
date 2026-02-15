import * as React from "react";
import * as Silk from "@silk-hq/components";

import { cn } from "../lib/utils";

type NativeButtonProps = React.ComponentPropsWithoutRef<"button">;

export const SilkButton = React.forwardRef<HTMLButtonElement, NativeButtonProps>(
  ({ className, ...props }, ref) => {
    const Candidate = (Silk as Record<string, unknown>).Button;

    if (typeof Candidate === "function") {
      const SilkButtonComponent = Candidate as React.ComponentType<NativeButtonProps>;
      return <SilkButtonComponent className={className} {...props} />;
    }

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground",
          "transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className,
        )}
        {...props}
      />
    );
  },
);

SilkButton.displayName = "SilkButton";
