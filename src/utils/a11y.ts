import type { KeyboardEvent } from "react";

/**
 * Props that make a non-button element (card, SVG marker) usable by keyboard:
 * focusable with Tab, announced as a button, activated with Enter or Space.
 */
export function clickable(onActivate: () => void, label?: string) {
  return {
    role: "button" as const,
    tabIndex: 0,
    "aria-label": label,
    onClick: onActivate,
    onKeyDown: (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onActivate();
      }
    },
  };
}
