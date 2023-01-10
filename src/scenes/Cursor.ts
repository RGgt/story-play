import Phaser from 'phaser';
import { SPScenes } from '../types/enums';

export default class CursorScene extends Phaser.Scene {
  private _isSet = false;

  private _sprite?: Phaser.GameObjects.Sprite;

  public setEnabled() {
    this._isSet = true;
  }

  constructor() {
    super(SPScenes.Cursor);
  }

  create() {
    this._sprite = this.add.sprite(0, 0, 'cursor_disabled');
    this._sprite.setOrigin(0, 0);
  }

  override update(time: number, delta: number): void {
    if (!this._sprite) return;
    const pointer = this.input.activePointer;
    this._sprite?.setPosition(pointer.x, pointer.y);

    this._sprite.setTexture(this._isSet ? 'cursor_enabled' : 'cursor_disabled');
    this._isSet = false;
    super.update(time, delta);
  }
}
