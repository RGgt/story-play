import { TextCreator, AspectConstants, AutoAdvancers, BackgroundCreator, Buttons, Dialogs } from '@rggt/gui-elements';

// import TextBuilder from '../components/TextBuilder';
// import AspectConstants from './AspectConstants';
// import AutoAdvancers from './specialised/AutoAdvancers';
// import Backgrounds from './specialised/Backgrounds';
// import Buttons from './specialised/Buttons';
// import Dialogs from './specialised/Dialogs';

export default class SceneFiller {
  public static PlaceTestButton(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    onClick: undefined | (() => void),
    disabled = false,
  ) {
    const width = AspectConstants.TEST_BUTTON_WIDTH;
    const height = AspectConstants.TEST_BUTTON_HEIGHT;
    return Buttons.addGenericButton(scene, x, y, width, height, text, onClick, disabled);
  }

  public static PlaceTestDialogBackground(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
    return Dialogs.addBackgroundPanel2(scene, x, y, width, height);
  }

  public static PlaceDialogButton(
    scene: Phaser.Scene,
    y: number,
    text: string,
    onClick: undefined | (() => void),
    disabled = false,
  ) {
    const width = AspectConstants.DIALOG_WIDTH - 2 * AspectConstants.DIALOG_PADDING_H;
    const height = AspectConstants.DIALOG_BUTTON_HEIGHT;
    const screenCenterX = scene.cameras.main.worldView.x + scene.cameras.main.width / 2;
    return Buttons.addGenericButton(scene, screenCenterX - width / 2, y, width, height, text, onClick, disabled);
  }

  public static PlaceDialogBackground(scene: Phaser.Scene) {
    const width = AspectConstants.DIALOG_WIDTH;
    const height = AspectConstants.DIALOG_HEIGHT;
    return Dialogs.addBackgroundPanel(scene, width, height);
  }

  public static PlaceBackgroundStatic(scene: Phaser.Scene, name: string) {
    return BackgroundCreator.createBackgroundImage(scene, name);
  }

  public static PlaceBackgroundPulsing(
    scene: Phaser.Scene,
    name: string,
    config: { scale: number; speed: number; repeats: number; yoyo: boolean },
  ) {
    return BackgroundCreator.createBackgroundImagePulsing(scene, name, config);
  }

  public static PlaceBackgroundAnimdated(
    scene: Phaser.Scene,
    name: string,
    config: { frames: string[]; repeats: number; frameRate: number },
  ) {
    return BackgroundCreator.createBackgroundAnimation(scene, name, config);
  }

  public static PlaceGameTitleText(scene: Phaser.Scene, text: string) {
    const screenCenterX = scene.cameras.main.worldView.x + scene.cameras.main.width / 2;
    const screenCenterY = scene.cameras.main.worldView.y + scene.cameras.main.height / 2;
    const customComponent = TextCreator.createTitleText(scene, screenCenterX, screenCenterY, text, 1920);
    scene.add.existing(customComponent);
    return customComponent;
  }

  public static PlaceGameSubtitleCenterText(scene: Phaser.Scene, text: string, y: number) {
    const screenCenterX = scene.cameras.main.worldView.x + scene.cameras.main.width / 2;
    const customComponent = TextCreator.createSubtitleTextAlignCenter(scene, screenCenterX, y, text, 1920);
    scene.add.existing(customComponent);
    return customComponent;
  }

  public static PlaceGameSubtitleRightText(scene: Phaser.Scene, text: string, y: number) {
    const customComponent = TextCreator.createSubtitleTextAlignRight(
      scene,
      1920 - AspectConstants.SCREEN_PADDING_H,
      y,
      text,
      1920,
    );
    scene.add.existing(customComponent);
    return customComponent;
  }

  public static PlaceGameSubtitleLeftText(scene: Phaser.Scene, text: string, y: number) {
    const customComponent = TextCreator.createSubtitleTextAlignLeft(
      scene,
      AspectConstants.SCREEN_PADDING_H,
      y,
      text,
      1920,
    );
    scene.add.existing(customComponent);
    return customComponent;
  }

  public static PlaceScrollingLetterText(scene: Phaser.Scene, text: string, x: number, y: number, width: number) {
    const customComponent = TextCreator.createScrollingLetterText(scene, x, y, text, width);
    customComponent.setScrollFactor(0, -1);
    scene.add.existing(customComponent);
    return customComponent;
  }

  public static PlaceScrollingGenericsText(scene: Phaser.Scene, text: string, y: number) {
    const customComponent = TextCreator.createScrollingLetterText(scene, 1920 / 2, y, text, 1920 * 0.7);
    customComponent.setScrollFactor(0, -1);
    scene.add.existing(customComponent);
    return customComponent;
  }

  public static PlaceNarrationText(
    scene: Phaser.Scene,
    text: string,
  ): [Phaser.GameObjects.Text, Phaser.GameObjects.Rectangle] {
    const x = 100;
    const y = 1080 - 250;
    const customComponent = TextCreator.createNarrationText(scene, x, y, text, 1920 - 200);
    customComponent.setScrollFactor(0, -1);
    const rectangle = scene.add.rectangle(0, y - 50, 1920, 250 + 50, 0x000000, 0.65);
    rectangle.setOrigin(0, 0);
    scene.add.existing(customComponent);
    return [customComponent, rectangle];
  }

  public static PlaceJumperSimple(scene: Phaser.Scene, onClick: undefined | (() => void)) {
    const customComponent = AutoAdvancers.createJumperSimple(scene, onClick, onClick, onClick);
    scene.add.existing(customComponent);
    return customComponent;
  }

  public static PlaceJumperWithMenu(
    scene: Phaser.Scene,
    onClick: undefined | (() => void),
    onShowMenu: undefined | (() => void),
  ) {
    const customComponent = AutoAdvancers.createJumperSimple(scene, onClick, onShowMenu, onClick);
    scene.add.existing(customComponent);
    return customComponent;
  }

  public static PlaceJumperWithMenuAndNavBack(
    scene: Phaser.Scene,
    onClick: undefined | (() => void),
    onShowMenu: undefined | (() => void),
    onNavBack: undefined | (() => void),
  ) {
    const customComponent = AutoAdvancers.createJumperSimple(scene, onClick, onShowMenu, onNavBack);
    scene.add.existing(customComponent);
    return customComponent;
  }
}
