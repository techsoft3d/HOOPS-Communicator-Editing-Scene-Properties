/**
 * Default environment for commands' runtime
 */
export type CommandEnv = {
  hwv: Communicator.WebViewer;
  confSerializer: (env: CommandEnv) => Promise<string>;
  confParser: (env: CommandEnv, str: string) => Promise<void>;
};

/**
 * This interface represents a command in the interpreter
 */
export interface Command {
  readonly name: string;
  execute: (args: unknown, env: CommandEnv) => Promise<unknown>;
  serialize?: (args: unknown) => Promise<string>;
  parse?: (str: string) => Promise<unknown>;
}

/**
 * This type represents a command recorded in the history
 */
export type CommandRecord = {
  command: string;
  args: string;
};

/**
 * This interface represents a command history in the interpreter
 */
export interface IHistory {
  add: (...records: CommandRecord[]) => this;
  clear: () => this;
  records: CommandRecord[];
}

/**
 * This interface represents the serialization system used by the interpreter
 */
export interface ISerializer {
  serialize: (env: CommandEnv, records: CommandRecord[]) => Promise<string>;
  parse: (env: CommandEnv, log: string) => Promise<CommandRecord[]>;
}

/**
 * This interface represents the persistence system used by the interpreter
 */
export interface ISaver {
  export: (destination: unknown, log: string) => Promise<void>;
  import: (source: unknown) => Promise<string>;
}
