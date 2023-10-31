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
  execute: async (args: unknown, env: CommandEnv) => {
    const a = args as Light;

    const { x, y, z } = a.position;
    const { r, g, b } = a.color;

    return await env.hwv.view.addLight(
      new Communicator.Light(
        Communicator.LightType.Directional,
        a.space === "camera"
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
  execute: async (args: unknown, env: CommandEnv) => {
    const key = args as Communicator.LightKey;

    env.hwv.view.removeLight(key);
  },
};

export const UpdateLightCmd: Command = {
  name: "updateLight",
  execute: async (args: unknown, env: CommandEnv) => {
    const a = args as Required<Light>;

    const { x, y, z } = a.position;
    const { r, g, b } = a.color;

    env.hwv.view.updateLight(
      a.key,
      new Communicator.Light(
        Communicator.LightType.Directional,
        a.space === "camera"
          ? Communicator.LightSpace.Camera
          : Communicator.LightSpace.World,
        new Communicator.Point3(x, y, z),
        new Communicator.Color(r, g, b)
      )
    );
  },
};
