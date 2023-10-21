export * from "./types";

export * from "./History";
export * from "./Serializer";
export * from "./Saver";
export * from "./Interpreter";
export * from "./Builder";

export * from "./highlight";
export * from "./colors";
export * from "./light";

import * as highlightCommands from "./highlight";
import * as colorCommands from "./colors";
import * as lightCommands from "./light";
import * as phongCommands from "./phong";

export const commands = {
  ...highlightCommands,
  ...colorCommands,
  ...lightCommands,
  ...phongCommands,
};
