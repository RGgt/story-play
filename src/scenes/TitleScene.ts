import Phaser from 'phaser';
import MyButton from '../components/MyButton';
import MyPanel from '../components/MyPanel';
import MyPanel2 from '../components/MyPanel2';
import TextBuilder from '../components/TextBuilder';
import BackgroundsFactory from '../factories/BackgroundsFactory';

export default class TitleScene extends Phaser.Scene {
  _btnSetFullscreen: MyButton | undefined;

  _btnSetWindowed: MyButton | undefined;

  constructor() {
    super('title');
  }

  create() {
    // this.addBackgroundImage();
    // this.addBackgroundImagePulsing();
    // this.addBackgroundImageAnimation();

    this.addSamplePanel(400, 400);

    this.addSamplePanel2(1100, 400);

    this._btnSetFullscreen = this.addSetFullscreenButton(100, 100);
    this._btnSetWindowed = this.addSetWindowedButton(300, 100);
    this.addOpenModalButton(100, 200);
    this.setBackgroundImage(100, 320);
    this.setBackgroundImagePulsing(100, 420);
    this.setBackgroundImageAnimation(100, 520);
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

  private _testImage: Phaser.GameObjects.Image | undefined;

  private _testPulseTween: Phaser.Tweens.Tween | undefined;

  private _testSprite: Phaser.GameObjects.Sprite | undefined;

  private _testAnimation: Phaser.Animations.Animation | false = false;

  cleanupBackground() {
    if (this._testImage) this._testImage.destroy();
    if (this._testPulseTween) {
      this._testPulseTween.stop();
      this._testPulseTween.remove();
    }
    if (this._testSprite) {
      this._testSprite.destroy();
      this.anims.remove('main');
    }
    // if (this._testAnimation) {
    //   console.log('destroying');
    //   this._testAnimation.destroy();
    // }
  }

  setBackgroundImage(x: number, y: number): MyButton {
    const onClick = () => {
      this.cleanupBackground();
      [this._testImage] = BackgroundsFactory.createBackgroundImage(this, 'main');
      this._testImage.setDepth(-100);
    };
    const customComponent = this.createButton(x, y, onClick);
    customComponent.setDepth(100);
    this.addButtonText(customComponent, 'Add background');
    return customComponent;
  }

  setBackgroundImagePulsing(x: number, y: number): MyButton {
    const onClick = () => {
      this.cleanupBackground();
      [this._testImage, this._testPulseTween] = BackgroundsFactory.createBackgroundImagePulsing(this, 'main');
      this._testImage.setDepth(-100);
    };
    const customComponent = this.createButton(x, y, onClick);
    customComponent.setDepth(100);
    this.addButtonText(customComponent, 'Add pulsing bkg');
    return customComponent;
  }

  setBackgroundImageAnimation(x: number, y: number): MyButton {
    const onClick = () => {
      this.cleanupBackground();
      const frames = [
        'frame_1_08_10',
        'frame_1_08_11',
        'frame_1_08_12',
        'frame_1_08_13',
        'frame_1_08_14',
        'frame_1_08_15',
        'frame_1_08_16',
        'frame_1_08_17',
      ];
      [this._testSprite, this._testAnimation] = BackgroundsFactory.createBackgroundImageAnimation(
        this,
        'main',
        frames,
        -1,
        8,
      );
      this._testSprite.setDepth(-100);
    };
    const customComponent = this.createButton(x, y, onClick);
    customComponent.setDepth(100);
    this.addButtonText(customComponent, 'Add animated bkg');
    return customComponent;
  }

  addBackgroundImage() {
    const [image] = BackgroundsFactory.createBackgroundImage(this, 'main');
  }

  addBackgroundImagePulsing() {
    const [image, pulseTween] = BackgroundsFactory.createBackgroundImagePulsing(this, 'main');
  }

  addBackgroundImageAnimation() {
    const frames = [
      'frame_1_08_10',
      'frame_1_08_11',
      'frame_1_08_12',
      'frame_1_08_13',
      'frame_1_08_14',
      'frame_1_08_15',
      'frame_1_08_16',
      'frame_1_08_17',
    ];
    BackgroundsFactory.createBackgroundImageAnimation(this, 'main', frames, -1, 8);
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

  addOpenModalButton(x: number, y: number): MyButton {
    const onClick = () => {
      // Create the modal window
      const dialog = document.getElementById('favDialog') as HTMLDialogElement;
      const cancelButton = document.getElementById('cancel') as HTMLButtonElement;
      const confirmButton = document.getElementById('confirm') as HTMLButtonElement;
      const languagesComboBox = document.getElementById('favLanguage') as HTMLSelectElement;
      cancelButton.addEventListener('click', () => {
        dialog.close('languageNotChosen');
        this.scene.resume();
      });
      confirmButton.addEventListener('click', (event) => {
        event.preventDefault();
        dialog.close(languagesComboBox.value);
        this.scene.resume();
      });
      this.scene.pause();
      dialog.showModal();
    };
    const customComponent = this.createButton(x, y, onClick);
    customComponent.setDepth(100);
    this.addButtonText(customComponent, 'Open Modal');
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
    customComponent.init(x, y, 200, 75);
    customComponent.onClick = onClick;
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

  addSamplePanel(x: number, y: number): MyPanel {
    const customComponent = this.createPanel(x, y);
    return customComponent;
  }

  private createPanel(x: number, y: number) {
    const customComponent = new MyPanel(this);
    customComponent.init(x, y, 600, 400);
    this.add.existing(customComponent);
    return customComponent;
  }

  addSamplePanel2(x: number, y: number): MyPanel2 {
    const customComponent = this.createPanel2(x, y);
    return customComponent;
  }

  private createPanel2(x: number, y: number) {
    const customComponent = new MyPanel2(this);
    customComponent.init(x, y, 600, 400);
    this.add.existing(customComponent);
    return customComponent;
  }
}
