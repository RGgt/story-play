
import Phaser from 'phaser'
export default class BootScene extends Phaser.Scene {
  constructor() {
    super('boot')
  }
  preload() {
    this.load.json('assets', 'assets/json/assetsList.json');
    this.load.image('logo', 'assets/images/logo.png');
  }
  create() {
    this.scene.start('preload');
  }
}
