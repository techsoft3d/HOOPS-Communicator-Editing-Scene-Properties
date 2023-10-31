import { Command, CommandEnv } from "./types";

export const SetNodeFaceColorCmd: Command = {
  name: "setNodeFaceColor",
  execute: async (context: unknown, env: CommandEnv) => {
    const args = context as {
      node: number;
      face: number;
      color: { r: number; g: number; b: number };
    };

    const { r, g, b } = args.color;

    return env.hwv.model.setNodeFaceColor(
      args.node,
      args.face,
      new Communicator.Color(r, g, b)
    );
  },
};

export const UnsetNodeFaceColorCmd: Command = {
  name: "unsetNodeFaceColor",
  execute: async (context: unknown, env: CommandEnv) => {
    const args = context as {
      node: number;
      face: number;
    };

    return env.hwv.model.unsetNodeFaceColor(args.node, args.face);
  },
};

export const SetNodeLineColorCmd: Command = {
  name: "setNodeLineColor",
  execute: async (context: unknown, env: CommandEnv) => {
    const args = context as {
      node: number;
      line: number;
      color: { r: number; g: number; b: number };
    };

    const { r, g, b } = args.color;

    return env.hwv.model.setNodeLineColor(
      args.node,
      args.line,
      new Communicator.Color(r, g, b)
    );
  },
};

export const UnsetNodeLineColorCmd: Command = {
  name: "unsetNodeLineColor",
  execute: async (context: unknown, env: CommandEnv) => {
    const args = context as {
      node: number;
      line: number;
    };

    return env.hwv.model.unsetNodeLineColor(args.node, args.line);
  },
};

export const SetNodesColorsCmd: Command = {
  name: "setNodesColors",
  execute: async (context: unknown, env: CommandEnv) => {
    const args = context as Record<number, { r: number; g: number; b: number }>;

    return env.hwv.model.setNodesColors(
      new Map<number, Communicator.Color>(
        Object.entries(args).map(([key, color]) => [
          parseInt(key, 10),
          new Communicator.Color(color.r, color.g, color.b),
        ])
      )
    );
  },
};

export const SetBodyNodesVisibilityCmd: Command = {
  name: "setBodyNodesVisibility",
  execute: async (context: unknown, env: CommandEnv) => {
    const args = context as { node: number; visible: boolean };

    return env.hwv.model.setBodyNodesVisibility(args.node, args.visible);
  },
};
