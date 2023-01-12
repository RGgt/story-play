import { ICursorControllingGame } from '@rggt/game-base';

class Highlightable extends Phaser.GameObjects.Rectangle {
  private static readonly ALPHA_INACTIVE = 0.3;

  private static readonly ALPHA_HOVER = 0.125;

  private static readonly ALPHA_DEFAULT = 0.0;

  private static readonly FILL_COLOR_INACTIVE = 0xb39a52;

  private static readonly FILL_COLOR_HOVER = 0xffbf00;

  private static readonly FILL_COLOR_DEFAULT = 0xffbf00;

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

  constructor(
    scene: Phaser.Scene,
    x = 0,
    y = 0,
    width: number | undefined = 1920,
    height: number | undefined = 1080,
  ) {
    const fillColor = Highlightable.FILL_COLOR_INACTIVE;
    const fillAlpha = Highlightable.ALPHA_INACTIVE;
    super(scene, x, y, width, height, fillColor, fillAlpha);
    this._bounds = new Phaser.Geom.Rectangle(x, y, width, height);
    this.fillColor = fillColor;
    this.fillAlpha = fillAlpha;
    this.setOrigin(0, 0);
  }

  preUpdate() {
    if (!this._bounds) return;
    // Get the current cursor position
    const pointer = this.scene.input.activePointer;

    // Check if the cursor is over the component
    if (this._bounds.contains(pointer.x, pointer.y)) {
      this.setActiveCursor();
      this.fillAlpha = Highlightable.ALPHA_HOVER;
      this.fillColor = Highlightable.FILL_COLOR_HOVER;
      if (pointer.button === 0 && pointer.isDown) {
        this._lPressed = true;
      } else {
        if (this._lPressed && this.onClick) {
          this.onClick();
        }
        this._lPressed = false;
      }
    } else {
      this.fillAlpha = Highlightable.ALPHA_DEFAULT;
      this.fillColor = Highlightable.FILL_COLOR_DEFAULT;
      this._lPressed = false;
    }
  }

  setActiveCursor() {
    if (!this.scene.game) return;
    if (!this.onClick) return;
    const igcc = this.scene.game as unknown as ICursorControllingGame;
    igcc.setCursorEnabled();
  }
}
export { Highlightable };
