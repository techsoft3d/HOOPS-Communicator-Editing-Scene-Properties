import { Command, CommandEnv } from "./types";

export const SetNodeFaceHighlightedCmd: Command = {
  name: "setNodeFaceHighlighted",
  execute: async (args: unknown, env: CommandEnv) => {
    const a = args as {
      node: number;
      face: number;
      highlighted: boolean;
    };

    return env.hwv.model.setNodeFaceHighlighted(a.node, a.face, a.highlighted);
  },
};

export const SetNodeLineHighlightedCmd: Command = {
  name: "setNodeLineHighlighted",
  execute: async (args: unknown, env: CommandEnv) => {
    const a = args as {
      node: number;
      line: number;
      highlighted: boolean;
    };

    return env.hwv.model.setNodeLineHighlighted(a.node, a.line, a.highlighted);
  },
};
