import { Command, CommandEnv } from "./types";

export const SetNodesFaceSpecularColorCmd: Command = {
  name: "setNodesFaceSpecularColor",
  execute: async (context: unknown, env: CommandEnv) => {
    const args = context as {
      nodeIds: number[];
      color: { r: number; g: number; b: number };
    };

    const nodeIds = args.nodeIds;
    const { r, g, b } = args.color;

    env.hwv.model.setNodesFaceSpecularColor(
      nodeIds,
      new Communicator.Color(r, g, b)
    );
  },
};

export const UnsetNodesFaceSpecularColorCmd: Command = {
  name: "unsetNodesFaceSpecularColor",
  execute: async (context: unknown, env: CommandEnv) => {
    const nodeIds = context as number[];

    env.hwv.model.unsetNodesFaceSpecularColor(nodeIds);
  },
};

export const SetNodesFaceSpecularIntensityCmd: Command = {
  name: "setNodesFaceSpecularIntensity",
  execute: async (context: unknown, env: CommandEnv) => {
    const args = context as {
      nodeIds: number[];
      intensity: number;
    };

    env.hwv.model.setNodesFaceSpecularIntensity(args.nodeIds, args.intensity);
  },
};

export const UnsetNodesFaceSpecularIntensityCmd: Command = {
  name: "unsetNodesFaceSpecularIntensity",
  execute: async (context: unknown, env: CommandEnv) => {
    const nodeIds = context as number[];

    env.hwv.model.unsetNodesFaceSpecularIntensity(nodeIds);
  },
};

export const SetNodesAmbientColorCmd: Command = {
  name: "setNodesAmbientColor",
  execute: async (context: unknown, env: CommandEnv) => {
    const args = context as {
      nodeIds: number[];
      color: { r: number; g: number; b: number };
    };

    const nodeIds = args.nodeIds;
    const { r, g, b } = args.color;

    env.hwv.model.setNodesAmbientColor(
      nodeIds,
      new Communicator.Color(r, g, b)
    );
  },
};

export const SetNodesAmbientMixCmd: Command = {
  name: "setNodesAmbientMix",
  execute: async (context: unknown, env: CommandEnv) => {
    const args = context as {
      nodeIds: number[];
      intensity: number;
    };

    env.hwv.model.setNodesAmbientMix(args.nodeIds, args.intensity);
  },
};

export const SetNodesFaceEmissiveColorCmd: Command = {
  name: "setNodesFaceEmissiveColor",
  execute: async (context: unknown, env: CommandEnv) => {
    const args = context as {
      nodeIds: number[];
      color: { r: number; g: number; b: number };
    };

    const nodeIds = args.nodeIds;
    const { r, g, b } = args.color;

    env.hwv.model.setNodesFaceEmissiveColor(
      nodeIds,
      new Communicator.Color(r, g, b)
    );
  },
};

export const UnsetNodesFaceEmissiveColorCmd: Command = {
  name: "unsetNodesFaceEmissiveColor",
  execute: async (context: unknown, env: CommandEnv) => {
    const nodeIds = context as number[];

    env.hwv.model.unsetNodesFaceEmissiveColor(nodeIds);
  },
};
