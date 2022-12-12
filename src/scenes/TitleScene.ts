import Phaser from 'phaser';
import MyButton from '../components/MyButton';
import TextBuilder from '../components/TextBuilder';

export default class TitleScene extends Phaser.Scene {
  _btnSetFullscreen: MyButton | undefined;

  _btnSetWindowed: MyButton | undefined;

  constructor() {
    super('title');
  }

  create() {
    this.addBackgroundImage();

    this._btnSetFullscreen = this.addSetFullscreenButton(100, 100);
    this._btnSetWindowed = this.addSetWindowedButton(300, 100);
    this._btnSetWindowed.setDisabled(true);

    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    const title = this.addGameTitleText('Love in the Coulds\r\nAbove Trinity', screenCenterX, screenCenterY);
    const pos = title.getBottomCenter();
    const s1 = this.addGameSubtitleTextCenter('A story by AbyssalEros', pos.x, pos.y + 20);
    const posS1 = s1.getBottomCenter();
    const s2 = this.addGameSubtitleTextRight('Illustration by Grabiobot', 1920 - 20, posS1.y + 20);
    const posS2 = s2.getBottomCenter();
    const s3 = this.addGameSubtitleTextLeft('Managed by FarraTriss', 20, posS2.y + 20);
  }

  addBackgroundImage() {
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    this.add.image(screenCenterX, screenCenterY, 'main');
  }

  updateEnabledButons(fullscren: boolean) {
    this._btnSetWindowed!.setDisabled(!fullscren);
    this._btnSetFullscreen!.setDisabled(fullscren);
  }

  addSetFullscreenButton(x: number, y: number): MyButton {
    const onClick = () => {
      document.getElementById('phaser')!.requestFullscreen();
      this.updateEnabledButons(true);
    };
    const customComponent = this.createButton(x, y, onClick);
    this.addButtonText(customComponent, 'Fullscreen');
    return customComponent;
  }

  addSetWindowedButton(x: number, y: number): MyButton {
    const onClick = () => {
      document.exitFullscreen();
      this.updateEnabledButons(false);
    };
    const customComponent = this.createButton(x, y, onClick);
    this.addButtonText(customComponent, 'Windowed');
    return customComponent;
  }

  private createButton(x: number, y: number, onClick: undefined | (() => void)) {
    const customComponent = new MyButton(this);
    customComponent.init(x, y, 200, 75, onClick);
    this.add.existing(customComponent);
    return customComponent;
  }

  private addButtonText(btton: MyButton, text: string) {
    const center = btton.getCenter();
    const customComponent = TextBuilder.createButtonText(this, center.x, center.y, text, 1920);
    this.add.existing(customComponent);
    return customComponent;
  }

  addGameTitleText(text: string, x: number, y: number) {
    const customComponent = TextBuilder.createTitleText(this, x, y, text, 1920);
    this.add.existing(customComponent);
    return customComponent;
  }

  addGameSubtitleTextCenter(text: string, x: number, y: number) {
    const customComponent = TextBuilder.createSubtitleTextAlignCenter(this, x, y, text, 1920);
    this.add.existing(customComponent);
    return customComponent;
  }

  addGameSubtitleTextRight(text: string, x: number, y: number) {
    const customComponent = TextBuilder.createSubtitleTextAlignRight(this, x, y, text, 1920);
    this.add.existing(customComponent);
    return customComponent;
  }

  addGameSubtitleTextLeft(text: string, x: number, y: number) {
    const customComponent = TextBuilder.createSubtitleTextAlignLeft(this, x, y, text, 1920);
    this.add.existing(customComponent);
    return customComponent;
  }
}
