import { History } from "./History";
import Interpreter from "./Interpreter";
import { JsonSaver } from "./Saver";
import { Serializer } from "./Serializer";
import { Command, CommandEnv, IHistory, ISaver, ISerializer } from "./types";

/**
 * This is a helper class to simplify the creation of a command interpreter.
 * By default it creates an interpreter with the default implementation of each
 * dependency but you can tune to change any or all of them by calling the
 * dedicated methods
 */
export class Builder {
    private _history?: IHistory | (new () => IHistory);
    private _serializer?: ISerializer | (new () => ISerializer);
    private _saver?: ISaver | (new () => ISaver);
    private _commands: Command[];

    constructor() {
        this._history = new History();
        this._serializer = new Serializer();
        this._saver = new JsonSaver();
        this._commands = [];
    }

    /**
     * Set the history to use with the interpreter
     * @param history The history to use with the interpreter
     * @returns This builder to allow operations chaining
     */
    public withHistory(history: IHistory | (new () => IHistory)): this {
        this._history = history;
        return this;
    }

    /**
     * Set the serializer to use with the interpreter
     * @param serializer The serializer to use with the interpreter
     * @returns This builder to allow operations chaining
     */
    public withSerializer(serializer: ISerializer | (new () => ISerializer)): this {
        this._serializer = serializer;
        return this;
    }

    /**
     * Set the saver to use with the interpreter
     * @param saver The saver to use with the interpreter
     * @returns This builder to allow operations chaining
     */
    public withSaver(saver: ISaver | (new () => ISaver)): this {
        this._saver = saver;
        return this;
    }

    /**
     * Add commands to the interpreter to build
     * @param commands the command commands to add to the interpreter
     * @returns This builder to allow operations chaining
     */
    public withCommands(...commands: Command[]): this {
        this._commands.push(...commands);
        return this;
    }

    /**
     * Shorthand to instantiate the history
     *
     * @private
     * @readonly
     * @type {IHistory}
     */
    private get history(): IHistory {
        if (!this._history) {
            return new History();
        }

        if (typeof this._history === "function") {
            return new this._history();
        }

        return this._history;
    }

    /**
     * Shorthand to instantiate the serializer
     *
     * @private
     * @readonly
     * @type {ISerializer}
     */
    private get serializer(): ISerializer {
        if (!this._serializer) {
            return new Serializer();
        }

        if (typeof this._serializer === "function") {
            return new this._serializer();
        }

        return this._serializer;
    }

    /**
     * Shorthand to instantiate the serializer
     *
     * @private
     * @readonly
     * @type {ISaver}
     */
    private get saver(): ISaver {
        if (!this._saver) {
            return new JsonSaver();
        }

        if (typeof this._saver === "function") {
            return new this._saver();
        }

        return this._saver;
    }

    /**
     * Shorthand to instantiate the command map
     *
     * @private
     * @readonly
     * @type {Map<string, Command<Env>>}
     */
    private get commandMap(): Map<string, Command> {
        return new Map<string, Command>(this._commands.map((command) => [command.name, command]));
    }

    /**
     * Build an interpreter from the builder's configuration
     * @param env The environment where the commands will be executed
     * @returns The created interpreter
     */
    public build(env: CommandEnv): Interpreter {
        return new Interpreter({
            env,
            commandMap: this.commandMap,
            history: this.history,
            saver: this.saver,
            serializer: this.serializer,
        });
    }
}

export default Builder;
