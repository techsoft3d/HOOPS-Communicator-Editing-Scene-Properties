import { CommandRecord } from "../../lib/commands";
import Interpreter from "../../lib/commands/Interpreter";
import { CmdBuilder } from "../globals";

export default class PageController {
  public readonly viewerContainerElm: HTMLDivElement;

  public readonly clearLightsBtn: HTMLButtonElement;

  public readonly historyElm: HTMLDivElement;

  public readonly saveHistoryBtn: HTMLButtonElement;

  public readonly loadHistoryBtn: HTMLInputElement;

  public readonly clearHistoryBtn: HTMLButtonElement;

  public readonly hwv: Communicator.WebViewer;
  public readonly cmd: Interpreter;

  constructor() {
    const getElm = <T extends HTMLElement>(id: string): T => {
      const elm = document.getElementById(id) as T | null;

      if (!elm) {
        throw new Error(`missing dom element '${id}'`);
      }

      return elm;
    };

    this.viewerContainerElm = getElm<HTMLDivElement>("viewer");
    this.clearLightsBtn = getElm<HTMLButtonElement>("lights-clear");
    this.historyElm = getElm<HTMLDivElement>("cmd-history");
    this.saveHistoryBtn = getElm<HTMLButtonElement>("cmd-save");
    this.loadHistoryBtn = getElm<HTMLInputElement>("cmd-load");
    this.clearHistoryBtn = getElm<HTMLButtonElement>("cmd-clear");

    this.hwv = new Communicator.WebViewer({
      container: this.viewerContainerElm,
      endpointUri: "models/microengine.scs",
    });

    const parse = async (_: string) => {
      return;
    };

    const serialize = async () => {
      return "";
    };

    this.cmd = CmdBuilder.build({
      hwv: this.hwv,
      parse,
      serialize,
    });
  }

  updateHistory() {
    const formatRecord = (record: CommandRecord) =>
      `${record.command}: ${record.context}`;

    this.historyElm.innerHTML = this.cmd.history.records
      .map((record) => formatRecord(record))
      .join("<br />");
  }

  async saveHistory() {
    this.cmd.export("history.json");
  }

  async loadHistory(file: File) {
    return this.cmd.import(file);
  }

  clearHistory() {
    this.cmd.history.clear();
    this.updateHistory();
  }
}
