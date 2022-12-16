import Phaser from 'phaser';
import MyButton from '../../components/MyButton';
import TextBuilder from '../../components/TextBuilder';

export default class Buttons {
  public static addGenericButton(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number,
    text: string,
    onClick: undefined | (() => void),
    disabled: boolean,
  ): [MyButton, Phaser.GameObjects.Text] {
    const customComponent = Buttons.createButton(scene, x, y, width, height, onClick);
    customComponent.setDisabled(disabled);
    const textObject = this.addButtonText(scene, customComponent, text, width);
    return [customComponent, textObject];
  }

  private static createButton(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number,
    onClick: undefined | (() => void),
  ) {
    const customComponent = new MyButton(scene);
    customComponent.init(x, y, width, height);
    customComponent.onClick = onClick;
    scene.add.existing(customComponent);
    return customComponent;
  }

  private static addButtonText(scene: Phaser.Scene, button: MyButton, text: string, maxWidth: number) {
    const center = button.getCenter();
    const customComponent = TextBuilder.createButtonText(scene, center.x, center.y, text, maxWidth);
    scene.add.existing(customComponent);
    return customComponent;
  }
}
