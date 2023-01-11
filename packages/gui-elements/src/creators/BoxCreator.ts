import PanelBox from '../components/PanelBox';
import GroupBox from '../components/GroupBox';
import { Perimeter } from '../components/Perimeter';
import { Highlightable } from '../components/Highlightable';
import { BackgroundBlocker } from '../components/BackgroundBlocker';


class BoxCreator {
  public static createGroupBox(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
    const customComponent = new GroupBox(scene);
    customComponent.init(x, y, width, height);
    scene.add.existing(customComponent);
    return customComponent;
  }

  public static createPerimeter(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
    const customComponent = new Perimeter(scene, x, y, width, height);
    scene.add.existing(customComponent);
    return customComponent;
  }

  public static createHighlightable(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
    const customComponent = new Highlightable(scene, x, y, width, height);
    scene.add.existing(customComponent);
    return customComponent;
  }

  public static createBackgroundBlocker(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
    const customComponent = new BackgroundBlocker(scene, x, y, width, height);
    scene.add.existing(customComponent);
    return customComponent;
  }

  public static createPanelBox(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
    const customComponent = new PanelBox(scene);
    customComponent.init(x, y, width, height);
    scene.add.existing(customComponent);
    return customComponent;
  }

  public static createCentralPanelBox(scene: Phaser.Scene, width: number, height: number) {
    const screenCenterX = scene.cameras.main.worldView.x + scene.cameras.main.width / 2;
    const screenCenterY = scene.cameras.main.worldView.y + scene.cameras.main.height / 2;
    return BoxCreator.createPanelBox(scene, screenCenterX - width / 2, screenCenterY - height / 2, width, height);
  }
}
export { BoxCreator };
