import Phaser from 'phaser';
import config from './config';
// import SampleScene from './SampleScene';
import BootScene from './scenes/BootScene';
import PreloadScene from './scenes/PreloadScene';
import TitleScene from './scenes/TitleScene';

type GameConfig = Phaser.Types.Core.GameConfig;

class SimpleGame extends Phaser.Game {
  constructor(c: GameConfig) {
    const realConfig = Object.assign(c, { scene: [BootScene, PreloadScene, TitleScene] });
    super(realConfig);
  }
}
window.addEventListener('load', () => {
  const game: Phaser.Game = new SimpleGame(config);
});
