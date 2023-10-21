import { ISaver } from "./types";

/**
 * This class represents a persistence system that read and write the
 * interpreter history into the session storage
 */
export class SessionSaver implements ISaver {
    /**
     * Persist the interpreter's history into the session storage
     * @param destination A string that will be the key for the session storage
     * entry
     * @param log The data to store
     */
    async export(destination: unknown, log: string): Promise<void> {
        if (typeof destination !== "string") {
            throw new Error("SessionSaver.export requires destination to be a string");
        }

        sessionStorage.setItem(destination, log);
    }

    /**
     * Read the interpreter history from the session storage
     * @param source A string that will be the key for the session storage
     * entry
     * @returns The history as a string
     */
    async import(source: unknown): Promise<string> {
        if (typeof source !== "string") {
            throw new Error("SessionSaver.import requires source to be a string");
        }

        const log = sessionStorage.getItem(source);
        if (log === null) {
            throw new Error(`Cannot import history from '${source}': Not found`);
        }

        return log;
    }
}

/**
 * This class represents a persistence system that read and write the
 * interpreter history into the local storage
 */
export class LocalSaver implements ISaver {
    /**
     * Persist the interpreter's history into the local storage
     * @param destination A string that will be the key for the local storage
     * entry
     * @param log The data to store
     */
    async export(destination: unknown, log: string): Promise<void> {
        if (typeof destination !== "string") {
            throw new Error("LocalSaver.export requires destination to be a string");
        }

        localStorage.setItem(destination, log);
    }

    /**
     * Read the interpreter history from the local storage
     * @param source A string that will be the key for the local storage
     * entry
     * @returns The history as a string
     */
    async import(source: unknown): Promise<string> {
        if (typeof source !== "string") {
            throw new Error("LocalSaver.import requires source to be a string");
        }

        const log = localStorage.getItem(source);
        if (log === null) {
            throw new Error(`Cannot import history from '${source}': Not found`);
        }

        return log;
    }
}

/**
 * This class represents a persistence system that read and write the
 * interpreter history into a JSON file
 */
export class JsonSaver implements ISaver {
    /**
     * Persist the interpreter's history into a Json file
     * @param destination A string that will be the name of the file
     * @param log The data to store
     *
     * @note log is expected to be valid Json
     */
    async export(destination: unknown, log: string): Promise<void> {
        if (typeof destination !== "string") {
            throw new Error("JsonSaver.export requires destination to be a string");
        }

        const downloadLink = document.createElement("a");
        const blobData = new Blob([log], { type: "application/json" });
        const url = URL.createObjectURL(blobData);

        downloadLink.href = url;
        downloadLink.download = destination;
        downloadLink.click();

        URL.revokeObjectURL(url);
    }

    /**
     * Read the interpreter history from the local storage
     * @param source A File that will contain the data to extract as Json
     * @returns The history as a string
     */
    async import(source: unknown): Promise<string> {
        if (!(source instanceof File)) {
            throw new Error("JsonSaver.import requires destination to be a File");
        }

        const reader = new FileReader();

        return new Promise<string>((resolve, reject) => {
            reader.onloadend = () => {
                const result = reader.result;
                if (typeof result === "string") {
                    resolve(result);
                } else if (result) {
                    resolve(new Uint8Array(result).toString());
                }
            };

            reader.onerror = () => {
                reader.abort();
                reject(reader.error);
            };

            reader.readAsText(source);
        });
    }
}

export default SessionSaver;
