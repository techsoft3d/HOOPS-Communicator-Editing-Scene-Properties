import { Interpreter } from "../../lib/commands";
import { getElementById } from "../common";

export default class PhongController {
  public readonly specularNodeIdElm: HTMLInputElement;
  public readonly specularColorElm: HTMLInputElement;
  public readonly specularApplyBtn: HTMLButtonElement;
  public readonly specularClearBtn: HTMLButtonElement;

  public readonly ambientNodeIdElm: HTMLInputElement;
  public readonly ambientColorElm: HTMLInputElement;
  public readonly ambientApplyBtn: HTMLButtonElement;
  public readonly ambientClearBtn: HTMLButtonElement;

  public readonly emissiveNodeIdElm: HTMLInputElement;
  public readonly emissiveColorElm: HTMLInputElement;
  public readonly emissiveApplyBtn: HTMLButtonElement;
  public readonly emissiveClearBtn: HTMLButtonElement;

  constructor() {
    this.specularNodeIdElm = getElementById<HTMLInputElement>(`specular-node`);
    this.specularColorElm = getElementById<HTMLInputElement>(`specular-color`);
    this.specularApplyBtn = getElementById<HTMLButtonElement>(`specular-apply`);
    this.specularClearBtn = getElementById<HTMLButtonElement>(`specular-clear`);

    this.ambientNodeIdElm = getElementById<HTMLInputElement>(`ambient-node`);
    this.ambientColorElm = getElementById<HTMLInputElement>(`ambient-color`);
    this.ambientApplyBtn = getElementById<HTMLButtonElement>(`ambient-apply`);
    this.ambientClearBtn = getElementById<HTMLButtonElement>(`ambient-clear`);

    this.emissiveNodeIdElm = getElementById<HTMLInputElement>(`emissive-node`);
    this.emissiveColorElm = getElementById<HTMLInputElement>(`emissive-color`);
    this.emissiveApplyBtn = getElementById<HTMLButtonElement>(`emissive-apply`);
    this.emissiveClearBtn = getElementById<HTMLButtonElement>(`emissive-clear`);
  }

  public get specularNodeId(): number {
    return parseInt(this.specularNodeIdElm.value, 10);
  }

  public set specularNodeId(value: number) {
    this.specularNodeIdElm.value = value.toString();
  }

  public get ambientNodeId(): number {
    return parseInt(this.ambientNodeIdElm.value, 10);
  }

  public set ambientNodeId(value: number) {
    this.ambientNodeIdElm.value = value.toString();
  }

  public get emissiveNodeId(): number {
    return parseInt(this.emissiveNodeIdElm.value, 10);
  }

  public set emissiveNodeId(value: number) {
    this.emissiveNodeIdElm.value = value.toString();
  }

  public get specularColor(): { r: number; g: number; b: number } {
    const code = this.specularColorElm.value;
    const r = parseInt(code.substring(1, 3), 16);
    const g = parseInt(code.substring(3, 5), 16);
    const b = parseInt(code.substring(5, 7), 16);
    return { r, g, b };
  }

  public get ambientColor(): { r: number; g: number; b: number } {
    const code = this.ambientColorElm.value;
    const r = parseInt(code.substring(1, 3), 16);
    const g = parseInt(code.substring(3, 5), 16);
    const b = parseInt(code.substring(5, 7), 16);
    return { r, g, b };
  }

  public get emissiveColor(): { r: number; g: number; b: number } {
    const code = this.emissiveColorElm.value;
    const r = parseInt(code.substring(1, 3), 16);
    const g = parseInt(code.substring(3, 5), 16);
    const b = parseInt(code.substring(5, 7), 16);
    return { r, g, b };
  }

  public async applySpecularColor(cmd: Interpreter) {
    await cmd.play("setNodesFaceSpecularColor", {
      nodeIds: [this.specularNodeId],
      color: this.specularColor,
    });
    await cmd.play("setNodesFaceSpecularIntensity", {
      nodeIds: [this.specularNodeId],
      intensity: 0.8,
    });
  }

  public async clearSpecularColor(cmd: Interpreter) {
    await cmd.play("unsetNodesFaceSpecularColor", [this.specularNodeId]);

    await cmd.play("unsetNodesFaceSpecularIntensity", [this.specularNodeId]);
  }

  public async applyAmbientColor(cmd: Interpreter) {
    await cmd.play("setNodesAmbientColor", {
      nodeIds: [this.ambientNodeId],
      color: this.ambientColor,
    });
    await cmd.play("setNodesAmbientMix", {
      nodeIds: [this.ambientNodeId],
      intensity: 0.8,
    });
  }

  public async clearAmbientColor(cmd: Interpreter) {
    await cmd.play("setNodesAmbientMix", {
      nodeIds: [this.ambientNodeId],
      intensity: 0.0,
    });
  }

  public async applyEmissiveColor(cmd: Interpreter) {
    await cmd.play("setNodesFaceEmissiveColor", {
      nodeIds: [this.emissiveNodeId],
      color: this.emissiveColor,
    });
  }

  public async clearEmissiveColor(cmd: Interpreter) {
    await cmd.play("unsetNodesFaceEmissiveColor", [this.specularNodeId]);
  }
}
