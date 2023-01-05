import Phaser from 'phaser';
import { MainMenu, MainMenuOptions } from '@rggt/gui-custom-elements';
import { SPScenes } from '../types/enums';

export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    super(SPScenes.MainMenu);
    this.events = new Phaser.Events.EventEmitter();
  }

  create() {
    const options: MainMenuOptions = {
      onBtnResume_Click: this.restoreSceneBellow.bind(this),
      btnBtn_1_Text: '(Re)Start Story',
      onBtn_1_Click: this.restartStoryPlay.bind(this),
      btnBtn_2_Text: 'Save',
      onBtn_2_Click: undefined,
      btnBtn_3_Text: 'Load',
      onBtn_3_Click: undefined,
      btnBtn_4_Text: 'More ...',
      onBtn_4_Click: undefined,
      btnBtn_5_Text: 'Jump to Home Screen',
      onBtn_5_Click: this.restartExperimental.bind(this),
    };
    MainMenu.createMainMenuDialog(this, options);
  }

  restoreSceneBellow() {
    const callerScene = this.data.get('callerScene');
    if (!callerScene) return;
    this.game.scene.resume(callerScene);
    this.game.scene.sleep(SPScenes.MainMenu);
  }

  restartExperimental() {
    const callerScene = this.data.get('callerScene');
    if (!callerScene) return;
    this.game.scene.stop(callerScene);
    this.game.scene.stop(SPScenes.Experimental);
    this.game.scene.run(SPScenes.Experimental);
    this.game.scene.sleep(SPScenes.MainMenu);
  }

  restartStoryPlay() {
    const callerScene = this.data.get('callerScene');
    if (!callerScene) return;
    this.game.scene.stop(callerScene);
    this.game.scene.stop(SPScenes.StoryPlay);
    this.game.scene.run(SPScenes.StoryPlay);
    this.game.events.emit('restart');
    this.game.scene.sleep(SPScenes.MainMenu);
  }
}
