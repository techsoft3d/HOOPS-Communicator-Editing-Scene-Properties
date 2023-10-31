import { Command, CommandEnv } from "./types";

export const SetNodeFaceColorCmd: Command = {
  name: "setNodeFaceColor",
  execute: async (args: unknown, env: CommandEnv) => {
    const a = args as {
      node: number;
      face: number;
      color: { r: number; g: number; b: number };
    };

    const { r, g, b } = a.color;

    return env.hwv.model.setNodeFaceColor(
      a.node,
      a.face,
      new Communicator.Color(r, g, b)
    );
  },
};

export const UnsetNodeFaceColorCmd: Command = {
  name: "unsetNodeFaceColor",
  execute: async (args: unknown, env: CommandEnv) => {
    const a = args as {
      node: number;
      face: number;
    };

    return env.hwv.model.unsetNodeFaceColor(a.node, a.face);
  },
};

export const SetNodeLineColorCmd: Command = {
  name: "setNodeLineColor",
  execute: async (args: unknown, env: CommandEnv) => {
    const a = args as {
      node: number;
      line: number;
      color: { r: number; g: number; b: number };
    };

    const { r, g, b } = a.color;

    return env.hwv.model.setNodeLineColor(
      a.node,
      a.line,
      new Communicator.Color(r, g, b)
    );
  },
};

export const UnsetNodeLineColorCmd: Command = {
  name: "unsetNodeLineColor",
  execute: async (args: unknown, env: CommandEnv) => {
    const a = args as {
      node: number;
      line: number;
    };

    return env.hwv.model.unsetNodeLineColor(a.node, a.line);
  },
};

export const SetNodesColorsCmd: Command = {
  name: "setNodesColors",
  execute: async (args: unknown, env: CommandEnv) => {
    const a = args as Record<number, { r: number; g: number; b: number }>;

    return env.hwv.model.setNodesColors(
      new Map<number, Communicator.Color>(
        Object.entries(a).map(([key, color]) => [
          parseInt(key, 10),
          new Communicator.Color(color.r, color.g, color.b),
        ])
      )
    );
  },
};

export const SetBodyNodesVisibilityCmd: Command = {
  name: "setBodyNodesVisibility",
  execute: async (args: unknown, env: CommandEnv) => {
    const a = args as { node: number; visible: boolean };

    return env.hwv.model.setBodyNodesVisibility(a.node, a.visible);
  },
};
