import Phaser from 'phaser'
export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('title');
  }
  preload() { }
  create() {
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    this.add.image(screenCenterX, screenCenterY, 'main');
  }
}
