import Phaser from 'phaser';
import { Save, SaveOptions, SaveViewData } from '@rggt/gui-custom-elements';
import { SPScenes } from '../types/enums';

export default class SaveScene extends Phaser.Scene {
  constructor() {
    super(SPScenes.Save);
    this.events = new Phaser.Events.EventEmitter();
  }

  create() {
    const options: SaveOptions = {
      onSave: this.onSave.bind(this),
      getViewData: this.getViewData.bind(this),
      onClose: this.restoreSceneBellow.bind(this),
    };
    Save.createSaveDialog(this, options);
  }

  restoreSceneBellow() {
    const callerScene = this.data.get('callerScene');
    if (!callerScene) return;
    this.game.scene.resume(callerScene);
    this.game.scene.sleep(SPScenes.Save);
  }

  onSave(page: number, slot: number) {
    return;
  }

  getViewData(page: number, slot: number): SaveViewData {
    return { AutoText: 'Friday, October 15 2021, 23:42', ImageB64: 'base-64' };
  }
}
