import Phaser from 'phaser';
import config from './config';
// import SampleScene from './SampleScene';
import BootScene from './scenes/BootScene';
import PreloadScene from './scenes/PreloadScene';
import TitleScene from './scenes/TitleScene';
type GameConfig = Phaser.Types.Core.GameConfig;

class SimpleGame extends Phaser.Game {
  constructor(config: GameConfig) {
    const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    const contextId = Phaser.WEBGL ? 'webgl' : 'canvas';
    const context = canvas!.getContext(contextId);
    const realConfig = Object.assign(config, { scene: [BootScene, PreloadScene, TitleScene], context });
    super(realConfig);
  }
}
window.addEventListener('load', () => {
  let game: Phaser.Game = new SimpleGame(config);
});
