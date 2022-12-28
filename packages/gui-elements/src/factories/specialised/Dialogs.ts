import MyPanel2 from '../../components/MyPanel2';

export default class Dialogs {
  public static addBackgroundPanel(scene: Phaser.Scene, width: number, height: number) {
    const customComponent = Dialogs.createPanel(scene, width, height);
    return customComponent;
  }

  public static addBackgroundPanel2(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
    const customComponent = new MyPanel2(scene);
    customComponent.init(x, y, width, height);
    scene.add.existing(customComponent);
    return customComponent;
  }

  private static createPanel(scene: Phaser.Scene, width: number, height: number) {
    const screenCenterX = scene.cameras.main.worldView.x + scene.cameras.main.width / 2;
    const screenCenterY = scene.cameras.main.worldView.y + scene.cameras.main.height / 2;
    const customComponent = new MyPanel2(scene);
    customComponent.init(screenCenterX - width / 2, screenCenterY - height / 2, width, height);
    scene.add.existing(customComponent);
    return customComponent;
  }
}
