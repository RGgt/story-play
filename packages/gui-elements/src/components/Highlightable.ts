import { ICursorControllingGame } from "@rggt/game-base";

class Highlightable extends Phaser.GameObjects.Rectangle {
  public reactToClick: undefined | ((x: number, y: number) => void);

  protected _bounds = new Phaser.Geom.Rectangle(0, 0, 1920, 1080);

  protected _lPressed = false;

  private _disabled = false;

  private _onClick: undefined | (() => void);

  public get onClick(): undefined | (() => void) {
    return this._onClick;
  }

  public set onClick(onClick: undefined | (() => void)) {
    this._onClick = onClick;
  }

  constructor(scene: Phaser.Scene, x = 0, y = 0, width: number | undefined = 1920, height: number | undefined = 1080) {
    const fillColor = 0x00;
    const fillAlpha = 0;
    super(scene, x, y, width, height, fillColor, fillAlpha);
    this._bounds = new Phaser.Geom.Rectangle(x, y, width, height);
    this.fillColor = 0xffbf00;
    this.fillAlpha = 0.0;
    this.setOrigin(0, 0);
  }

  preUpdate() {
    if (!this._bounds) return;
    // Get the current cursor position
    const pointer = this.scene.input.activePointer;

    // Check if the cursor is over the component
    if (this._bounds.contains(pointer.x, pointer.y)) {
      this.setActiveCursor();
      this.fillAlpha = 0.15;
      if (pointer.button === 0 && pointer.isDown) {
        this._lPressed = true;
      } else {
        if (this._lPressed && this.onClick) {
          this.onClick();
        }
        this._lPressed = false;
      }
    } else {
      this.fillAlpha = 0.0;
      this._lPressed = false;
    }
  }

  setActiveCursor() {
    if (!this.scene.game) return;
    const igcc = this.scene.game as unknown as ICursorControllingGame;
    igcc.setCursorEnabled();
  }
}
export { Highlightable };
