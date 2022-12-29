import Phaser from 'phaser';
import { AspectConstants } from '@rggt/gui-elements';

import SceneFiller from '../factories/SceneFiller';
import { SPScenes } from '../types/enums';

export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    super(SPScenes.MainMenu);
    this.events = new Phaser.Events.EventEmitter();
  }

  create() {
    // this.renderJumper();
    const shape = SceneFiller.PlaceDialogBackground(this).getBound();
    if (!shape) {
      this.restoreSceneBellow();
      return;
    }
    let top = shape.top + AspectConstants.DIALOG_PADDING_V;
    const [b1, t1] = SceneFiller.PlaceDialogButton(this, top, 'Resume', () => {
      // FIX: not working
      this.restoreSceneBellow();
    });
    top = b1.getBound().bottom + AspectConstants.DIALOG_PADDING_V;
    const [b2, t2] = SceneFiller.PlaceDialogButton(this, top, '(Re)start Story', () => {
      // FIX: not working
      this.restartStoryPlay();
    });
    top = b2.getBound().bottom + AspectConstants.DIALOG_SPACING_V;
    const [b3, t3] = SceneFiller.PlaceDialogButton(
      this,
      top,
      'Save',
      () => {
        // this.restoreSceneBellow();
      },
      true,
    );
    top = b3.getBound().bottom + AspectConstants.DIALOG_SPACING_V;
    const [b4, t4] = SceneFiller.PlaceDialogButton(
      this,
      top,
      'Load',
      () => {
        // this.restoreSceneBellow();
      },
      true,
    );
    top = b4.getBound().bottom + AspectConstants.DIALOG_SPACING_V;
    const [b5, t5] = SceneFiller.PlaceDialogButton(
      this,
      top,
      'More ...',
      () => {
        // this.restoreSceneBellow();
      },
      true,
    );
    top = b5.getBound().bottom + AspectConstants.DIALOG_SPACING_V;
    const [b6, t6] = SceneFiller.PlaceDialogButton(this, top, 'Jump to Home Screen', () => {
      // GOOD
      this.restartExperimental();
    });
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
