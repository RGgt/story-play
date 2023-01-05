import Phaser from 'phaser';
import config from './config';
// import SampleScene from './SampleScene';
import BootScene from './scenes/BootScene';
import MainMenuScene from './scenes/MainMenuScene';
import PreloadScene from './scenes/PreloadScene';
import SaveScene from './scenes/SaveScene';
import StoryPlayScene from './scenes/StoryPlayScene';
import TitleScene from './scenes/TitleScene';

type GameConfig = Phaser.Types.Core.GameConfig;

class SimpleGame extends Phaser.Game implements SPGame {
  public gameData: GameMemoryData | undefined;

  constructor(c: GameConfig) {
    const realConfig = Object.assign(c, {
      scene: [BootScene, PreloadScene, TitleScene, StoryPlayScene, MainMenuScene, SaveScene],
    });
    super(realConfig);
    this.gameData = {
      gameScene: '',
      currentFrame: '',
      currentLanguage: 'en-GB',
      framesHistory: [] as string[],
    };
  }
}
window.addEventListener('load', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const game: Phaser.Game = new SimpleGame(config);
});

const dialog = document.getElementById('favDialog') as HTMLDialogElement;
dialog.hidden = false;
