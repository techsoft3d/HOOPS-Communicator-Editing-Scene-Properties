import { Command, CommandEnv } from "./types";

export interface Light {
  key?: number;
  space: "world" | "camera";
  position: Record<"x" | "y" | "z", number>;
  color: Record<"r" | "g" | "b", number>;
}

export const ClearLightsCmd: Command = {
  name: "clearLights",
  execute: async (_: unknown, env: CommandEnv) => {
    env.hwv.view.clearLights();
  },
};

export const AddLightCmd: Command = {
  name: "addLight",
  execute: async (context: unknown, env: CommandEnv) => {
    const args = context as Light;

    const { x, y, z } = args.position;
    const { r, g, b } = args.color;

    return await env.hwv.view.addLight(
      new Communicator.Light(
        Communicator.LightType.Directional,
        args.space === "camera"
          ? Communicator.LightSpace.Camera
          : Communicator.LightSpace.World,
        new Communicator.Point3(x, y, z),
        new Communicator.Color(r, g, b)
      )
    );
  },
};

export const RemoveLightCmd: Command = {
  name: "removeLight",
  execute: async (context: unknown, env: CommandEnv) => {
    const key = context as Communicator.LightKey;

    env.hwv.view.removeLight(key);
  },
};

export const UpdateLightCmd: Command = {
  name: "updateLight",
  execute: async (context: unknown, env: CommandEnv) => {
    const args = context as Required<Light>;

    const { x, y, z } = args.position;
    const { r, g, b } = args.color;

    env.hwv.view.updateLight(
      args.key,
      new Communicator.Light(
        Communicator.LightType.Directional,
        args.space === "camera"
          ? Communicator.LightSpace.Camera
          : Communicator.LightSpace.World,
        new Communicator.Point3(x, y, z),
        new Communicator.Color(r, g, b)
      )
    );
  },
};
