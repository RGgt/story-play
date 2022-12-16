import Phaser from 'phaser';
import MyAutoAdvancer from '../components/MyAutoAdvancer';
import MyButton from '../components/MyButton';
import MyPanel from '../components/MyPanel';
import MyPanel2 from '../components/MyPanel2';
import TextBuilder from '../components/TextBuilder';
import { SPScenes } from '../types/enums';

export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    super(SPScenes.MainMenu);
  }

  preload() {
    // nothing yet
  }

  create() {
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    const image = this.add.sprite(screenCenterX, screenCenterY, 'main');
    const width = 600;
    const height = 800;
    this.renderJumper();
    this.addSamplePanel(width, height);
    this.addResumeButton(screenCenterX - width / 2 + 50, screenCenterY - height / 2 + 50);
  }

  addSamplePanel(width: number, height: number): MyPanel {
    const customComponent = this.createPanel(width, height);
    return customComponent;
  }

  private createPanel(width: number, height: number) {
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    const customComponent = new MyPanel2(this);
    customComponent.init(screenCenterX - width / 2, screenCenterY - height / 2, width, height);
    this.add.existing(customComponent);
    return customComponent;
  }

  private _AutoAdvancer: MyAutoAdvancer | undefined;

  renderJumper() {
    const onClick = () => {
      // this._AutoAdvancer?.destroy();
      this.restoreSceneBellow();
    };
    const customComponent = new MyAutoAdvancer(this);
    customComponent.onClick = onClick;
    this.add.existing(customComponent);
    this._AutoAdvancer = customComponent;
    this._AutoAdvancer.setDepth(Number.MAX_SAFE_INTEGER);
  }

  restoreSceneBellow() {
    const callerScene = this.data.get('callerScene');
    if (!callerScene) return;
    console.log('callerScene', callerScene);
    this.game.scene.run(callerScene);
    this.game.scene.sleep(SPScenes.MainMenu);
  }

  addResumeButton(x: number, y: number): MyButton {
    const onClick = () => {
      this.restoreSceneBellow();
    };
    const customComponent = this.createButton(x, y, onClick);
    this.addButtonText(customComponent, 'Resume');
    return customComponent;
  }

  private createButton(x: number, y: number, onClick: undefined | (() => void)) {
    const customComponent = new MyButton(this);
    customComponent.init(x, y, 500, 120);
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
}
