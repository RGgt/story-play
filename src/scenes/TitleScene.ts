import Phaser from 'phaser';
import MyAutoAdvancer from '../components/MyAutoAdvancer';
import MyButton from '../components/MyButton';
import MyPanel from '../components/MyPanel';
import MyPanel2 from '../components/MyPanel2';
import TextBuilder from '../components/TextBuilder';
import BackgroundsFactory from '../factories/BackgroundsFactory';

export default class TitleScene extends Phaser.Scene {
  static readonly CURSOR = 'url(/assets/images/gui/cursor.cur), auto';

  _btnSetFullscreen: MyButton | undefined;

  _btnSetWindowed: MyButton | undefined;

  constructor() {
    super('title');
  }

  create() {
    this.game.canvas.style.cursor = TitleScene.CURSOR;
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
    const title = this.addGameTitleText(
      'Story Title\r\nThe quick brown fox\r\njumps over the lazy dog',
      screenCenterX,
      screenCenterY,
    );

    const pos = title.getBottomCenter();
    const s1 = this.addGameSubtitleTextCenter(
      'A story by Author\r\nThe quick brown fox jumps over the lazy dog',
      pos.x,
      pos.y + 20,
    );

    const posS1 = s1.getBottomCenter();
    const s2 = this.addGameSubtitleTextRight('The quick brown fox\r\njumps over the lazy dog', 1920 - 20, posS1.y + 20);

    const posS2 = s2.getBottomCenter();
    const s3 = this.addGameSubtitleTextLeft('The quick brown fox\r\njumps over the lazy dog', 20, posS2.y + 20);

    this._testText = this.addScrollingLetterText(
      'The quick brown fox\r\njumps over the lazy dog\r\nurabitur non pulvinar ipsum. Duis sit amet dolor velit. Nulla facilisi. Donec quis ornare metus. Integer sit amet sem luctus, imperdiet risus id, accumsan mauris. Nullam nunc lorem, malesuada eget ante sit amet, lacinia maximus leo. Vestibulum tincidunt lacinia sem, aliquam accumsan nisi tristique in. Curabitur accumsan lacus nunc, vitae ultricies dui eleifend ut. Morbi eu consectetur mi, sed tincidunt dui. Sed sed velit sit amet ligula molestie fringilla. Suspendisse eget eros pretium, feugiat eros at, consequat nibh. Morbi ultricies dolor laoreet tristique lobortis.\r\nPraesent pellentesque augue non ultrices sagittis. Nullam tempus risus sed pretium pulvinar. Phasellus tincidunt dolor in velit viverra, non vulputate diam iaculis. Aenean ullamcorper fringilla enim, sit amet scelerisque quam egestas vel. Aliquam sit amet dictum mi. Praesent eget sem nisi. Nulla dui dolor, commodo eu mi sed, vestibulum vestibulum ligula.\r\nEtiam non viverra diam. Suspendisse non ex in lectus consectetur pharetra a eget eros. Integer cursus pharetra tincidunt. Mauris ut est nunc. Maecenas libero ex, pellentesque quis augue sed, mollis gravida augue. Nam semper eros sit amet felis scelerisque convallis. In hac habitasse platea dictumst. Nulla tincidunt eget lectus non fermentum. ',
      1920 / 2,
      1080 / 2,
    );
    this._testNarrationText = this.addNarrationText(
      'The quick brown fox jumps over the lazy dog urabitur non pulvinar ipsum. Duis sit amet dolor velit. Nulla facilisi. Donec quis ornare metus. Integer sit amet sem luctus, imperdiet risus id, accumsan mauris. Nullam nunc lorem, malesuada eget ante sit amet, lacinia maximus leo. Vestibulum tincidunt lacinia sem, aliquam accumsan nisi tristique in. ',
    );

    this.addAutoAdvancer();
  }

  update(time: number, delta: number): void {
    if (this._testText && this._testText.scrollFactorY) {
      this._testText.y += this._testText.scrollFactorY;
      if (this._testText.height + this._testText.y < 0) {
        this._testText.destroy();
      }
    }
  }

  private _testImage: Phaser.GameObjects.Image | undefined;

  private _testPulseTween: Phaser.Tweens.Tween | undefined;

  private _testSprite: Phaser.GameObjects.Sprite | undefined;

  private _testAnimation: Phaser.Animations.Animation | false = false;

  private _testText: Phaser.GameObjects.Text | undefined;

  private _testNarrationText: Phaser.GameObjects.Text | undefined;

  private _testNarrationRectangle: Phaser.GameObjects.Rectangle | undefined;

  private _testAutoAdvancer: MyAutoAdvancer | undefined;

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
    this.addButtonText(customComponent, 'Add bkg');
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
    this.addButtonText(customComponent, 'Add puls bkg');
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
    this.addButtonText(customComponent, 'Add anim bkg');
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

  addAutoAdvancer(): MyAutoAdvancer {
    const onClick = () => {
      this._testAutoAdvancer?.destroy();
      const canvas = document.getElementsByTagName("canvas")[0];
      canvas!.blur();
      alert('First click unlocks the screen.\r\nNow you can explore.');
      canvas!.focus();
      // console.log(canvas);
    };
    const customComponent = new MyAutoAdvancer(this);
    customComponent.onClick = onClick;
    this.add.existing(customComponent);
    this._testAutoAdvancer = customComponent;
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

  addScrollingLetterText(text: string, x: number, y: number) {
    const customComponent = TextBuilder.createScrollingLetterText(this, x, y, text, 1920 * 0.7);
    customComponent.setScrollFactor(0, -1);
    this.add.existing(customComponent);
    return customComponent;
  }

  addNarrationText(text: string) {
    const x = 100;
    const y = 1080 - 250;
    const customComponent = TextBuilder.addNarrationText(this, x, y, text, 1920 - 200);
    customComponent.setScrollFactor(0, -1);
    this._testNarrationRectangle = this.add.rectangle(0, y - 50, 1920, 250 + 50, 0x000000, 0.65);
    this._testNarrationRectangle.setOrigin(0, 0);
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
