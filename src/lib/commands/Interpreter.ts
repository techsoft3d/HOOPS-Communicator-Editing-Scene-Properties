import {
  Command,
  CommandEnv,
  CommandRecord,
  IHistory,
  ISaver,
  ISerializer,
} from "./types";

export class Interpreter {
  public env: CommandEnv;
  public readonly history: IHistory;
  public readonly serializer: ISerializer;
  public readonly saver: ISaver;
  public readonly commandMap: Map<string, Command>;

  constructor({
    env,
    commandMap,
    history,
    serializer,
    saver,
  }: {
    env: CommandEnv;
    commandMap?: Map<string, Command>;
    history: IHistory;
    serializer: ISerializer;
    saver: ISaver;
  }) {
    this.env = env;
    this.history = history;
    this.serializer = serializer;
    this.saver = saver;

    this.commandMap = commandMap ?? new Map<string, Command>();
  }

  public addCommands(...commands: Command[]): this {
    commands.forEach((command) => this.commandMap.set(command.name, command));
    return this;
  }

  public async play(command: string, context: unknown): Promise<unknown> {
    const cmd = this.commandMap.get(command);

    if (!cmd) {
      throw new Error(
        `CommandInterpreter does not support command '${command}'`
      );
    }

    return this.exec(command, cmd, context);
  }

  public async replay(records: CommandRecord[]): Promise<unknown[]> {
    const result: unknown[] = [];
    for (const { command, context } of records) {
      const cmd = this.commandMap.get(command);

      if (!cmd) {
        throw new Error(
          `CommandInterpreter does not support command '${command}'`
        );
      }

      if (!cmd.parse) {
        throw new Error(
          `Command '${command}' does not support context parsing`
        );
      }

      const ctx = await cmd.parse(context);
      result.push(await this.exec(command, cmd, ctx));
    }

    return result;
  }

  public async serialize(): Promise<string> {
    return this.serializer.serialize(this.env, this.history.records);
  }

  public async parse(log: string): Promise<CommandRecord[]> {
    return this.serializer.parse(this.env, log);
  }

  public async export(destination: unknown): Promise<void> {
    return this.saver.export(destination, await this.serialize());
  }

  public async import(source: unknown): Promise<unknown[]> {
    return this.replay(await this.parse(await this.saver.import(source)));
  }

  private async exec(
    key: string,
    command: Command,
    context: unknown
  ): Promise<unknown> {
    const result = await command.execute(context, this.env);
    if (command.serialize) {
      this.history.add({
        command: key,
        context: await command.serialize(context),
      });
    }

    return result;
  }
}

export default Interpreter;
