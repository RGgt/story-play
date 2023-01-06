import { NinePatch, NinePatchData } from '@rggt/nine-patch';

export default class Button extends NinePatch {
  private _disabled = false;

  private _onClick: undefined | (() => void);

  public get onClick(): undefined | (() => void) {
    return this._onClick;
  }

  public set onClick(onClick: undefined | (() => void)) {
    this._onClick = onClick;
    this.updateInteractivity();
  }

  private updateInteractivity() {
    const interactive = !this._disabled && !!this.onClick;
    this.setInteractiveOn(interactive);
  }



  constructor(scene: Phaser.Scene) {
    const data = new NinePatchData('btnNormal', ['btnHover', 'btnPressed', 'btnDisabled'], 310, 60, 8, 8);
    super(data, scene);
    this.setInteractive({ cursor: 'url(/assets/images/gui/cursor.cur), pointer' });
    this.updateInteractivity();
  }

  private _lPressed = false;

  setDisabled(disabled: boolean) {
    this._disabled = disabled;
    this.updateInteractivity();
  }

  preUpdate() {
    if (!this._bounds) return;
    // Get the current cursor position
    const pointer = this.scene.input.activePointer;

    // Check if the cursor is over the component
    if (this._disabled) {
      this._lPressed = false;
      this.setTexture('btnDisabled');
    } else if (this._bounds.contains(pointer.x, pointer.y)) {
      if (pointer.button === 0 && pointer.isDown) {
        this._lPressed = true;
        this.setTexture('btnPressed');
      } else {
        if (this._lPressed && this.onClick) this.onClick();
        this._lPressed = false;
        this.setTexture('btnHover');
      }
    } else {
      this.setTexture('btnNormal');
      this._lPressed = false;
    }
  }
}
