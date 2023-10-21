import { CommandEnv, CommandRecord, ISerializer } from "./types";

/**
 * This class represents the default serializer for the command interpreter.
 * It serializes the records as Json.
 */
export class Serializer implements ISerializer {
  /**
   * Convert records into a Json string
   * @param env the environment the commands has been ran in.
   * @param records an array of records to serialize.
   * @returns The Json string generated.
   */
  public async serialize(
    env: CommandEnv,
    records: CommandRecord[]
  ): Promise<string> {
    return JSON.stringify({ config: await env.serialize(), history: records });
  }

  /**
   * Parse a Json string to create an array of CommandRecords
   * @param env the environment where the commands should be runnable.
   * @param log The Json string to parse.
   * @returns The parsed CommandRecord array.
   */
  public async parse(env: CommandEnv, log: string): Promise<CommandRecord[]> {
    const result = JSON.parse(log);
    if (typeof result !== "object") {
      throw new Error("log must be an object");
    }

    const config = result["config"];
    if (config === undefined) {
      throw new Error("log must contain a config field");
    }

    await env.parse(config);
    const history = result["history"];
    if (history === undefined) {
      throw new Error("log must contain a history field");
    }

    if (!Array.isArray(history)) {
      throw new Error("log must be an array");
    }

    history.forEach((entry, index) => {
      if (
        typeof entry !== "object" ||
        typeof entry.command !== "string" ||
        typeof entry.context !== "string"
      ) {
        throw new Error(
          `CommandInterpreter log entry n°${index} must be of type CommandRecord`
        );
      }
    });

    return history as CommandRecord[];
  }
}
