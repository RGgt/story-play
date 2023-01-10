import { ICursorControllingGame } from "@rggt/game-base";

class Perimeter extends Phaser.GameObjects.Rectangle {
  public reactToClick: undefined | ((x: number, y: number) => void);

  protected _bounds = new Phaser.Geom.Rectangle(0, 0, 1920, 1080);

  protected _lPressed = false;

  constructor(scene: Phaser.Scene, x = 0, y = 0, width: number | undefined = 1920, height: number | undefined = 1080) {
    const fillColor = 0x00;
    const fillAlpha = 0;
    super(scene, x, y, width, height, fillColor, fillAlpha);
    this._bounds = new Phaser.Geom.Rectangle(x, y, width, height);
    this.setOrigin(0, 0);
  }

  preUpdate() {
    if (!this._bounds) return;
    // Get the current cursor position
    const pointer = this.scene.input.activePointer;

    // Check if the cursor is over the component
    if (this._bounds.contains(pointer.x, pointer.y)) {
      this.setActiveCursor();
      if (pointer.button === 0 && pointer.isDown) {
        this._lPressed = true;
      } else {
        if (this._lPressed && this.reactToClick) {
          this.reactToClick(pointer.x, pointer.y);
        }
        this._lPressed = false;
      }
    } else {
      this._lPressed = false;
    }
  }

  public setActiveCursor() {
    if (!this.scene.game) return;
    const igcc = this.scene.game as unknown as ICursorControllingGame;
    igcc.setCursorEnabled();
  }


}
export { Perimeter };
