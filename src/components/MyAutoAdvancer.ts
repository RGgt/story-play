export default class MyAutoAdvancer extends Phaser.GameObjects.Rectangle {
  public onClick: undefined | (() => void);

  private _bounds = new Phaser.Geom.Rectangle(0, 0, 1920, 1080);

  private _lPressed = false;

  constructor(scene: Phaser.Scene, x = 0, y = 0, width: number | undefined = 1920, height: number | undefined = 1080) {
    const fillColor = 0x00;
    const fillAlpha = 0;
    super(scene, x, y, width, height, fillColor, fillAlpha);
    // this.setVisible(false);
    this.setInteractive({ cursor: 'url(/assets/images/gui/cursor.cur), pointer' });
    this.setOrigin(0, 0);
  }

  preUpdate() {
    if (!this._bounds) return;
    // Get the current cursor position
    const pointer = this.scene.input.activePointer;

    // Check if the cursor is over the component
    if (this._bounds.contains(pointer.x, pointer.y)) {
      if (pointer.button === 0 && pointer.isDown) {
        this._lPressed = true;
      } else {
        if (this._lPressed && this.onClick) {
          this.onClick();
        }
        this._lPressed = false;
      }
    } else {
      this._lPressed = false;
    }
  }
}
