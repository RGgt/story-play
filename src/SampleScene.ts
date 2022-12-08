import Phaser from 'phaser';

export default class SampleScene extends Phaser.Scene {
  constructor() {
    super('SampleScene');
  }

  preload() {
    this.load.path = "assets/images/";
    this.load.image('background', 'frame_001.png');
  }

  create() {
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    this.add.image(screenCenterX, screenCenterY, 'background');
  }
}
