import { CommandRecord } from "../../lib/commands";
import Interpreter from "../../lib/commands/Interpreter";
import { cmdBuilder, getElementById } from "../common";

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
    this.viewerContainerElm = getElementById<HTMLDivElement>("viewer");
    this.clearLightsBtn = getElementById<HTMLButtonElement>("lights-clear");
    this.historyElm = getElementById<HTMLDivElement>("cmd-history");
    this.saveHistoryBtn = getElementById<HTMLButtonElement>("cmd-save");
    this.loadHistoryBtn = getElementById<HTMLInputElement>("cmd-load");
    this.clearHistoryBtn = getElementById<HTMLButtonElement>("cmd-clear");

    this.hwv = new Communicator.WebViewer({
      container: this.viewerContainerElm,
      endpointUri: "models/microengine.scs",
    });

    this.cmd = cmdBuilder.buildInterpreter(
      cmdBuilder.buildEnv({
        hwv: this.hwv,
      })
    );
  }

  updateHistory() {
    const formatRecord = (record: CommandRecord) =>
      `${record.command}: ${record.args}`;

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
