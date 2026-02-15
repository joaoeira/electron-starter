import "@testing-library/jest-dom/vitest";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  }),
});

if (!("CSS" in window)) {
  Object.defineProperty(window, "CSS", {
    writable: true,
    value: {
      supports: () => false,
    },
  });
} else {
  window.CSS.supports ??= () => false;
}
