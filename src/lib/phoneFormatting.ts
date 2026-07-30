import type { ChangeEvent } from "react";

export function formatPhoneNumber(e: ChangeEvent<HTMLInputElement>) {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length > 10) value = value.slice(0, 10);

  let formatted = "";
  if (value.length > 6) {
    formatted = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
  } else if (value.length > 3) {
    formatted = `(${value.slice(0, 3)}) ${value.slice(3)}`;
  } else if (value.length > 0) {
    formatted = `(${value}`;
  }

  e.target.value = formatted;
}
