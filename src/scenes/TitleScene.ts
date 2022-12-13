import Phaser from 'phaser';
import MyButton from '../components/MyButton';
import MyPanel from '../components/MyPanel';
import MyPanel2 from '../components/MyPanel2';
import TextBuilder from '../components/TextBuilder';

export default class TitleScene extends Phaser.Scene {
  _btnSetFullscreen: MyButton | undefined;

  _btnSetWindowed: MyButton | undefined;

  constructor() {
    super('title');
  }

  create() {
    this.addBackgroundImage();

    this.addSamplePanel(400, 400);

    this.addSamplePanel2(1100, 400);

    this._btnSetFullscreen = this.addSetFullscreenButton(100, 100);
    this._btnSetWindowed = this.addSetWindowedButton(300, 100);
    this.addOpenModalButton(100, 150);
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

  addOpenModalButton(x: number, y: number): MyButton {
    const onClick = () => {
      // Create the modal window
      const dialog = document.getElementById('favDialog') as HTMLDialogElement;
      const cancelButton = document.getElementById('cancel') as HTMLButtonElement;
      const confirmButton = document.getElementById('confirm') as HTMLButtonElement;
      const animalsComboBox = document.getElementById('favAnimal') as HTMLSelectElement;
      cancelButton.addEventListener('click', () => {
        dialog.close('animalNotChosen');
        this.scene.resume();
      });
      confirmButton.addEventListener('click', (event) => {
        event.preventDefault();
        dialog.close(animalsComboBox.value);
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
