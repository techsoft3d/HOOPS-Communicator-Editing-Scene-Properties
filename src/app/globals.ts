import { Builder, commands } from "../lib/commands";

export async function parseEnv(_: string): Promise<void> {}

export async function serializeEnv(_: string): Promise<string> {
  return "";
}

export const CmdBuilder = new Builder();

CmdBuilder.withCommands(...Object.values(commands));
