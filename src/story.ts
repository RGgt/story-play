import { IGameControlledCursor } from '@rggt/game-base';
import Phaser from 'phaser';
import config from './config';
// import SampleScene from './SampleScene';
import BootScene from './scenes/BootScene';
import CursorScene from './scenes/Cursor';
import MainMenuScene from './scenes/MainMenuScene';
import PreloadScene from './scenes/PreloadScene';
import SaveScene from './scenes/SaveScene';
import StoryPlayScene from './scenes/StoryPlayScene';
import TitleScene from './scenes/TitleScene';
import { SPScenes } from './types/enums';

type GameConfig = Phaser.Types.Core.GameConfig;

class SimpleGame extends Phaser.Game implements SPGame, IGameControlledCursor {
  public gameData: GameMemoryData | undefined;

  constructor(c: GameConfig) {
    const realConfig = Object.assign(c, {
      scene: [BootScene, PreloadScene, TitleScene, StoryPlayScene, MainMenuScene, SaveScene, CursorScene],
    });
    super(realConfig);
    this.gameData = {
      gameScene: '',
      currentFrame: '',
      currentLanguage: 'en-GB',
      framesHistory: [] as string[],
    };
  }

  public setCursorEnabled() {
    const scene = this.scene.getScene(SPScenes.Cursor);
    if (!scene) return;
    const cursorScene = scene as unknown as CursorScene;
    if (!cursorScene) return;
    cursorScene.setEnabled();
  }
}

window.addEventListener('load', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const game: Phaser.Game = new SimpleGame(config);
});

const dialog = document.getElementById('favDialog') as HTMLDialogElement;
dialog.hidden = false;
