import { NinePatch, NinePatchData } from '@rggt/nine-patch';
export default class MyButton extends NinePatch {
    _disabled = false;
    onClick;
    constructor(scene) {
        const data = new NinePatchData('btnNormal', ['btnHover', 'btnPressed', 'btnDisabled'], 310, 60, 8, 8);
        super(data, scene);
    }
    _lPressed = false;
    setDisabled(disabled) {
        this._disabled = disabled;
    }
    preUpdate() {
        if (!this._bounds)
            return;
        // Get the current cursor position
        const pointer = this.scene.input.activePointer;
        // Check if the cursor is over the component
        if (this._disabled) {
            this._lPressed = false;
            this.setTexture('btnDisabled');
        }
        else if (this._bounds.contains(pointer.x, pointer.y)) {
            if (pointer.button === 0 && pointer.isDown) {
                this._lPressed = true;
                this.setTexture('btnPressed');
            }
            else {
                if (this._lPressed && this.onClick)
                    this.onClick();
                this._lPressed = false;
                this.setTexture('btnHover');
            }
        }
        else {
            this.setTexture('btnNormal');
            this._lPressed = false;
        }
    }
}
