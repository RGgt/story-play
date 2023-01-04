import Button from '../components/Button';
import { TextCreator } from './TextCreator';

class ButtonCreator {
  public static addSimpleButton(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number,
    text: string,
    onClick: undefined | (() => void),
    disabled: boolean,
  ): { button: Button; text: Phaser.GameObjects.Text } {
    const customComponent = ButtonCreator.createButton(scene, x, y, width, height, onClick);
    customComponent.setDisabled(disabled);
    const textObject = this.addButtonText(scene, customComponent, text, width);
    return { button: customComponent, text: textObject };
  }

  private static createButton(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number,
    onClick: undefined | (() => void),
  ) {
    const customComponent = new Button(scene);
    customComponent.init(x, y, width, height);
    customComponent.onClick = onClick;
    scene.add.existing(customComponent);
    return customComponent;
  }

  private static addButtonText(scene: Phaser.Scene, button: Button, text: string, maxWidth: number) {
    const center = button.getCenter();
    const customComponent = TextCreator.createButtonText(scene, center.x, center.y, text, maxWidth);
    scene.add.existing(customComponent);
    return customComponent;
  }
}
export { ButtonCreator };
