import { Interpreter } from "../../lib/commands";
import { getElementById } from "../common";

export default class LightController {
  public readonly legend: HTMLLegendElement;
  public readonly posXElm: HTMLInputElement;
  public readonly posYElm: HTMLInputElement;
  public readonly posZElm: HTMLInputElement;
  public readonly colorElm: HTMLInputElement;
  public readonly spaceElm: HTMLSelectElement;
  public readonly updateElm: HTMLButtonElement;
  public readonly removeElm: HTMLButtonElement;

  private _key: number;

  constructor(index: number) {
    this._key = -1;
    this.legend = getElementById<HTMLLegendElement>(`light-${index}-legend`);

    this.posXElm = getElementById<HTMLInputElement>(`light-${index}-pos-x`);
    this.posYElm = getElementById<HTMLInputElement>(`light-${index}-pos-y`);
    this.posZElm = getElementById<HTMLInputElement>(`light-${index}-pos-z`);

    this.colorElm = getElementById<HTMLInputElement>(`light-${index}-color`);
    this.spaceElm = getElementById<HTMLSelectElement>(`light-${index}-space`);
    this.updateElm = getElementById<HTMLButtonElement>(`light-${index}-update`);
    this.removeElm = getElementById<HTMLButtonElement>(`light-${index}-remove`);
  }

  public get key(): number {
    return this._key;
  }

  public get mode(): "add" | "update" {
    return this._key < 0 ? "add" : "update";
  }

  public get position(): { x: number; y: number; z: number } {
    return {
      x: parseFloat(this.posXElm.value),
      y: parseFloat(this.posYElm.value),
      z: parseFloat(this.posZElm.value),
    };
  }

  public get color(): { r: number; g: number; b: number } {
    const code = this.colorElm.value;
    const r = parseInt(code.substring(1, 3), 16);
    const g = parseInt(code.substring(3, 5), 16);
    const b = parseInt(code.substring(5, 7), 16);
    return { r, g, b };
  }

  public get space(): "camera" | "world" {
    return this.spaceElm.value as "camera" | "world";
  }

  setAddMode() {
    this.legend.textContent = "N/A";
    this._key = -1;
    this.updateElm.textContent = this.mode;
    this.removeElm.disabled = true;
  }

  setUpdateMode(key: number) {
    this.legend.textContent = "Light #" + key;
    this._key = key;
    this.updateElm.textContent = this.mode;
    this.removeElm.disabled = false;
  }

  clear() {
    this.setAddMode();
    this.posXElm.value = "0";
    this.posYElm.value = "0";
    this.posZElm.value = "0";
    this.colorElm.value = "#FFFFFF";
    this.spaceElm.value = "world";
  }

  set(key: number, info: Communicator.Light) {
    this.setUpdateMode(key);

    this.posXElm.value = info.position.x.toFixed(2);
    this.posYElm.value = info.position.y.toFixed(2);
    this.posZElm.value = info.position.z.toFixed(2);

    this.posXElm.value = info.position.x.toFixed(2);
    this.posYElm.value = info.position.y.toFixed(2);
    this.posZElm.value = info.position.z.toFixed(2);

    const formatColorChannel = (value: number) =>
      value.toString(16).padStart(2, "0");

    this.colorElm.value =
      "#" +
      formatColorChannel(info.color.r) +
      formatColorChannel(info.color.g) +
      formatColorChannel(info.color.b);

    this.spaceElm.value =
      info.space === Communicator.LightSpace.Camera ? "camera" : "world";
  }

  async apply(cmd: Interpreter) {
    if (this.mode === "add") {
      await cmd.play("addLight", {
        position: this.position,
        color: this.color,
        space: this.space,
      });
    } else {
      await cmd.play("updateLight", {
        key: this.key,
        position: this.position,
        color: this.color,
        space: this.space,
      });
    }
  }

  async remove(cmd: Interpreter) {
    return cmd.play("removeLight", this.key);
  }
}
