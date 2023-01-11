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
    customComponent.Disabled = disabled;
    const textObject = this.addButtonText(scene, customComponent, text, width);
    return { button: customComponent, text: textObject };
  }

  public static addIconTextButton(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number,
    iconTexture: string,
    text: string,
    onClick: undefined | (() => void),
    disabled: boolean,
  ): { button: Button; text: Phaser.GameObjects.Text; icon: Phaser.GameObjects.Image } {
    const customComponent = ButtonCreator.createButton(scene, x, y, width, height, onClick);
    customComponent.Disabled = disabled;
    const textObject = this.addIconTextButtonText(scene, customComponent, text, width);
    const image = scene.add.image(
      customComponent.getLeft() + customComponent.getBound().height / 2,
      customComponent.getTop() + customComponent.getBound().height / 2,
      iconTexture,
    );
    image.setOrigin(0.5, 0.5);
    return { button: customComponent, text: textObject, icon: image };
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

  private static addIconTextButtonText(scene: Phaser.Scene, button: Button, text: string, maxWidth: number) {
    const center = button.getCenter();
    const customComponent = TextCreator.createIconTextButtonText(
      scene,
      button.getLeft() + button.getBound().height,
      center.y,
      text,
      maxWidth - button.getBound().height,
    );
    scene.add.existing(customComponent);
    return customComponent;
  }
}
export { ButtonCreator };
