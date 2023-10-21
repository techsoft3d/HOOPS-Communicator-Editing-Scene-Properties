import { CommandRecord, IHistory } from "./types";

/**
 * This class represents the default command interpreter history
 */
export class History implements IHistory {
    private _records: CommandRecord[];

    constructor() {
        this._records = [];
    }

    /**
     * Add records to the history
     * @param records the lines to add to the history
     * @returns this history, to allow operation chaining
     */
    public add(...records: CommandRecord[]): this {
        this._records.push(...records);
        return this;
    }

    /**
     * Clear the history records
     * @returns this history, to allow operation chaining
     */
    public clear(): this {
        this._records = [];
        return this;
    }

    /**
     * Get the records from the history
     *
     * @readonly
     * @type {CommandRecord[]}
     */
    get records(): CommandRecord[] {
        return this._records;
    }
}

export default History;
