import "./style.css";
import LightController from "./app/controllers/LightController";
import PhongController from "./app/controllers/PhongController";
import PageController from "./app/controllers/PageController";

const page = new PageController();
const phong = new PhongController();

const lights = [
  new LightController(0),
  new LightController(1),
  new LightController(2),
  new LightController(3),
];

const refreshLights = async () => {
  const keys = await page.hwv.view.getLightKeys();

  for (let i = 0; i < keys.length; ++i) {
    const key = keys[i];
    const light = lights[i];
    const info = await page.hwv.view.getLight(key);
    if (!info) {
      throw new Error(`Missing light #${key}`);
    }
    light.set(key, info);
  }

  for (let i = keys.length; i < 4; ++i) {
    lights[i].clear();
  }
};

const handleLightUpdate = async (light: LightController) => {
  light.apply(page.cmd);

  page.updateHistory();

  return refreshLights();
};

const handleSpecularColorApply = async () => {
  await phong.applySpecularColor(page.cmd);
  page.updateHistory();
};

const handleSpecularColorClear = async () => {
  await phong.clearSpecularColor(page.cmd);
  page.updateHistory();
};

const handleAmbientColorApply = async () => {
  await phong.applyAmbientColor(page.cmd);
  page.updateHistory();
};

const handleAmbientColorClear = async () => {
  phong.clearAmbientColor(page.cmd);
  page.updateHistory();
};

const handleEmissiveColorApply = async () => {
  phong.applyEmissiveColor(page.cmd);
  page.updateHistory();
};

const handleEmissiveColorClear = async () => {
  phong.clearEmissiveColor(page.cmd);
  page.updateHistory();
};

const handleLightRemoved = async (light: LightController) => {
  await light.remove(page.cmd);
  page.updateHistory();
  refreshLights();
};

page.hwv.setCallbacks({
  modelStructureReady: () => {
    refreshLights();
    for (let i = 0; i < 4; ++i) {
      lights[i].updateElm.addEventListener("click", () => {
        handleLightUpdate(lights[i]);
      });

      lights[i].removeElm.addEventListener("click", () => {
        handleLightRemoved(lights[i]);
      });
    }

    page.clearLightsBtn.addEventListener("click", () => {
      page.cmd.play("clearLights", {}).then(() => refreshLights());
    });

    phong.specularApplyBtn.addEventListener("click", () => {
      handleSpecularColorApply();
    });

    phong.specularClearBtn.addEventListener("click", () => {
      handleSpecularColorClear();
    });

    phong.ambientApplyBtn.addEventListener("click", () => {
      handleAmbientColorApply();
    });

    phong.ambientClearBtn.addEventListener("click", () => {
      handleAmbientColorClear();
    });

    phong.emissiveApplyBtn.addEventListener("click", () => {
      handleEmissiveColorApply();
    });

    phong.emissiveClearBtn.addEventListener("click", () => {
      handleEmissiveColorClear();
    });

    page.saveHistoryBtn.addEventListener("click", () => {
      page.saveHistory();
    });

    page.loadHistoryBtn.addEventListener("change", (event) => {
      const inputElm = event.target as HTMLInputElement;
      const files = inputElm.files;
      if (!files || files.length === 0) {
        return;
      }
      page.loadHistory(files[0]).then(async () => {
        page.updateHistory();
        refreshLights();
      });
    });

    page.clearHistoryBtn.addEventListener("click", () => {
      page.clearHistory();
    });
  },
  selectionArray: (events) => {
    if (!events?.length) {
      return;
    }
    const node = events[0].getSelection().getNodeId();
    if (node === null) {
      return;
    }

    phong.specularNodeId = node;
    phong.ambientNodeId = node;
    phong.emissiveNodeId = node;
  },
});

page.hwv.start();
