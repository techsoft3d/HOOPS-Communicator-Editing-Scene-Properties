import { Command, CommandEnv } from "./types";

export const SetNodesFaceSpecularColorCmd: Command = {
  name: "setNodesFaceSpecularColor",
  execute: async (args: unknown, env: CommandEnv) => {
    const a = args as {
      nodeIds: number[];
      color: { r: number; g: number; b: number };
    };

    const nodeIds = a.nodeIds;
    const { r, g, b } = a.color;

    env.hwv.model.setNodesFaceSpecularColor(
      nodeIds,
      new Communicator.Color(r, g, b)
    );
  },
};

export const UnsetNodesFaceSpecularColorCmd: Command = {
  name: "unsetNodesFaceSpecularColor",
  execute: async (args: unknown, env: CommandEnv) => {
    const nodeIds = args as number[];

    env.hwv.model.unsetNodesFaceSpecularColor(nodeIds);
  },
};

export const SetNodesFaceSpecularIntensityCmd: Command = {
  name: "setNodesFaceSpecularIntensity",
  execute: async (args: unknown, env: CommandEnv) => {
    const a = args as {
      nodeIds: number[];
      intensity: number;
    };

    env.hwv.model.setNodesFaceSpecularIntensity(a.nodeIds, a.intensity);
  },
};

export const UnsetNodesFaceSpecularIntensityCmd: Command = {
  name: "unsetNodesFaceSpecularIntensity",
  execute: async (args: unknown, env: CommandEnv) => {
    const nodeIds = args as number[];

    env.hwv.model.unsetNodesFaceSpecularIntensity(nodeIds);
  },
};

export const SetNodesAmbientColorCmd: Command = {
  name: "setNodesAmbientColor",
  execute: async (args: unknown, env: CommandEnv) => {
    const a = args as {
      nodeIds: number[];
      color: { r: number; g: number; b: number };
    };

    const nodeIds = a.nodeIds;
    const { r, g, b } = a.color;

    env.hwv.model.setNodesAmbientColor(
      nodeIds,
      new Communicator.Color(r, g, b)
    );
  },
};

export const SetNodesAmbientMixCmd: Command = {
  name: "setNodesAmbientMix",
  execute: async (args: unknown, env: CommandEnv) => {
    const a = args as {
      nodeIds: number[];
      intensity: number;
    };

    env.hwv.model.setNodesAmbientMix(a.nodeIds, a.intensity);
  },
};

export const SetNodesFaceEmissiveColorCmd: Command = {
  name: "setNodesFaceEmissiveColor",
  execute: async (args: unknown, env: CommandEnv) => {
    const a = args as {
      nodeIds: number[];
      color: { r: number; g: number; b: number };
    };

    const nodeIds = a.nodeIds;
    const { r, g, b } = a.color;

    env.hwv.model.setNodesFaceEmissiveColor(
      nodeIds,
      new Communicator.Color(r, g, b)
    );
  },
};

export const UnsetNodesFaceEmissiveColorCmd: Command = {
  name: "unsetNodesFaceEmissiveColor",
  execute: async (args: unknown, env: CommandEnv) => {
    const nodeIds = args as number[];

    env.hwv.model.unsetNodesFaceEmissiveColor(nodeIds);
  },
};
