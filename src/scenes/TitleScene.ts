import Phaser from 'phaser';
import MyButton from '../components/MyButton';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('title');
  }

  create() {
    this.addBackgroundImage();
    this.addButton();
    this.addButton2();
  }

  addBackgroundImage() {
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    this.add.image(screenCenterX, screenCenterY, 'main');
  }

  isFullScreen = false;

  addButton() {
    const customComponent = new MyButton(this);
    const onClick = () => {
      // console.log('clicked!');
      // alert('you clicked it');
      document.exitFullscreen();
    };
    customComponent.init(100, 400, 200, 75, onClick);
    this.add.existing(customComponent);
  }

  addButton2() {
    const customComponent = new MyButton(this);
    const onClick = () => {
      document.getElementById('phaser')!.requestFullscreen();
    };
    customComponent.init(100, 100, 200, 75, onClick);
    this.add.existing(customComponent);
  }
}
