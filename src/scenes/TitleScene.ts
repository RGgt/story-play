import Phaser from 'phaser';
import MyButton from '../components/MyButton';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('title');
  }

  create() {
    this.addBackgroundImage();
    this.addButton();
  }

  addBackgroundImage() {
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    this.add.image(screenCenterX, screenCenterY, 'main');
  }

  addButton() {
    const customComponent = new MyButton(this);
    const onClick = () => {
      console.log('clicked!');
      alert('you clicked it');
    };
    customComponent.init(100, 100, 200, 75, onClick);
    this.add.existing(customComponent);
  }
}
