import { Command, CommandEnv } from "./types";

export const SetNodeFaceHighlightedCmd: Command = {
    name: "setNodeFaceHighlighted",
    execute: async (context: unknown, env: CommandEnv) => {
        const args = context as {
            node: number;
            face: number;
            highlighted: boolean;
        };

        return env.hwv.model.setNodeFaceHighlighted(args.node, args.face, args.highlighted);
    },

    serialize: async (context: unknown) => {
        return JSON.stringify(context);
    },

    parse: async (log: string) => {
        return JSON.parse(log);
    },
};

export const SetNodeLineHighlightedCmd: Command = {
    name: "setNodeLineHighlighted",
    execute: async (context: unknown, env: CommandEnv) => {
        const args = context as {
            node: number;
            line: number;
            highlighted: boolean;
        };

        return env.hwv.model.setNodeLineHighlighted(args.node, args.line, args.highlighted);
    },

    serialize: async (context: unknown) => {
        return JSON.stringify(context);
    },

    parse: async (log: string) => {
        return JSON.parse(log);
    },
};
