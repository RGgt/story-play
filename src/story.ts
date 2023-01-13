import { ICursorControllingGame } from '@rggt/game-base';
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
import { store } from './store/store';
import { updateSavegameTexture } from './store/savegameSlice';

type GameConfig = Phaser.Types.Core.GameConfig;

class SimpleGame extends Phaser.Game implements SPGame, ICursorControllingGame {
  public gameData: GameMemoryData | undefined;

  private unsubscribe: any;

  constructor(c: GameConfig) {
    const realConfig = Object.assign(c, {
      scene: [
        BootScene,
        PreloadScene,
        TitleScene,
        StoryPlayScene,
        MainMenuScene,
        SaveScene,
        CursorScene,
      ],
    });
    super(realConfig);
    this.gameData = {
      gameScene: '',
      currentFrame: '',
      currentLanguage: 'en-GB',
      framesHistory: [] as string[],
    };
    // store.getState().savegames.pages[0].slots[0].base64Texture = '';
    let currentState = store.getState();

    this.unsubscribe = store.subscribe(() => {
      const previousState = currentState;
      currentState = store.getState();
      for (
        let pageIndex = 0;
        pageIndex < currentState.savegames.pages.length;
        pageIndex += 1
      ) {
        for (
          let slotIndex = 0;
          slotIndex < currentState.savegames.pages[pageIndex].slots.length;
          slotIndex += 1
        ) {
          if (
            previousState.savegames.pages[pageIndex].slots[slotIndex]
              .base64Texture !==
            currentState.savegames.pages[pageIndex].slots[slotIndex]
              .base64Texture
          ) {
            // base64Texture has changed
            // update UI
          }
        }
      }
    });

    store.dispatch(
      updateSavegameTexture({
        pageIndex: 0,
        slotIndex: 0,
        gameType: 'RPG',
        savegame: {
          name: 'New Savegame',
          base64Texture: 'ABCD',
          gameData: {
            gameDataJson: {},
          },
        },
      }),
    );
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
