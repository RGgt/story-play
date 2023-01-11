import { ICursorControllingGame } from '@rggt/game-base';
import { NinePatch, NinePatchData } from '@rggt/nine-patch';

export default class Button extends NinePatch {
  public Disabled = false;

  /**
   * Pushed means that the button was pressed and remained pressed after that
   * even though it lost focus. So it can act like a toggle of on/off switch.
   */
  public Pushed = false;

  private _onClick: undefined | (() => void);

  public get onClick(): undefined | (() => void) {
    return this._onClick;
  }

  public set onClick(onClick: undefined | (() => void)) {
    this._onClick = onClick;
  }

  constructor(scene: Phaser.Scene) {
    const data = new NinePatchData(
      'btnNormal',
      ['btnHover', 'btnPressed', 'btnDisabled', 'btnPushed', 'btnDisabledPushed'],
      310,
      60,
      8,
      8,
    );
    super(data, scene);
  }

  private _lPressed = false;

  preUpdate() {
    if (!this._bounds) return;
    // Get the current cursor position
    const pointer = this.scene.input.activePointer;

    // Check if the cursor is over the component
    if (this.Disabled) {
      this._lPressed = false;
      this.setTexture(this.Pushed ? 'btnDisabledPushed' : 'btnDisabled');
    } else if (this._bounds.contains(pointer.x, pointer.y)) {
      this.setActiveCursor();
      if (pointer.button === 0 && pointer.isDown) {
        this._lPressed = true;
        this.setTexture(this.Pushed ? 'btnHover' : 'btnPressed');
      } else {
        if (this._lPressed && this.onClick) this.onClick();
        this._lPressed = false;
        this.setTexture(this.Pushed ? 'btnPressed' : 'btnHover');
      }
    } else {
      this.setTexture(this.Pushed ? 'btnPushed' : 'btnNormal');
      this._lPressed = false;
    }
  }

  setActiveCursor() {
    if (!this.scene.game) return;
    const igcc = this.scene.game as unknown as ICursorControllingGame;
    igcc.setCursorEnabled();
  }
}
