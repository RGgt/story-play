import Phaser from 'phaser';
import config from './config';
import SampleScene from './SampleScene';
type GameConfig = Phaser.Types.Core.GameConfig;

class SimpleGame extends Phaser.Game {
  constructor(config: GameConfig) {
    const realConfig = Object.assign(config, { scene: [SampleScene] });
    super(realConfig);
  }
}
const game: Phaser.Game = new SimpleGame(config);
