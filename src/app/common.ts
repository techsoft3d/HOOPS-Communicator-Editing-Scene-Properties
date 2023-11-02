import { Builder, commands } from "../lib/commands";

export function getElementById<T extends HTMLElement>(id: string): T {
  const elm = document.getElementById(id) as T | null;

  if (!elm) {
    throw new Error(`missing dom element '#${id}'`);
  }

  return elm;
}

export const cmdBuilder = new Builder();

cmdBuilder.withCommands(...commands);
