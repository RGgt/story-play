import AspectConstants from '../factories/AspectConstants';
export default class MyAutoAdvancer extends Phaser.GameObjects.Rectangle {
    onClick;
    onShowMenu;
    onNavBack;
    _bounds = new Phaser.Geom.Rectangle(0, 0, 1920, 1080);
    _lPressed = false;
    constructor(scene, x = 0, y = 0, width = 1920, height = 1080) {
        const fillColor = 0x00;
        const fillAlpha = 0;
        super(scene, x, y, width, height, fillColor, fillAlpha);
        // this.setVisible(false);
        this.setInteractive({ cursor: 'url(/assets/images/gui/cursor.cur), pointer' });
        this.setOrigin(0, 0);
    }
    preUpdate() {
        if (!this._bounds)
            return;
        // Get the current cursor position
        const pointer = this.scene.input.activePointer;
        // Check if the cursor is over the component
        if (this._bounds.contains(pointer.x, pointer.y)) {
            if (pointer.button === 0 && pointer.isDown) {
                this._lPressed = true;
            }
            else {
                if (this._lPressed && this.onClick) {
                    this.reactToClick(pointer.x, pointer.y);
                }
                this._lPressed = false;
            }
        }
        else {
            this._lPressed = false;
        }
    }
    reactToClick(x, y) {
        if (x > 1920 - AspectConstants.HIDDEN_MENU_BUTTON_WIDTH && y < AspectConstants.HIDDEN_MENU_BUTTON_HEIGHT) {
            if (this.onShowMenu)
                this.onShowMenu();
            // click on hidden menu button
        }
        else if (x < AspectConstants.HIDDEN_NAV_BACK_WIDTH) {
            // click on hidden nav-back
            if (this.onNavBack)
                this.onNavBack();
        }
        else {
            // click in the main area
            // eslint-disable-next-line no-lonely-if
            if (this.onClick)
                this.onClick();
        }
    }
}
//# sourceMappingURL=MyAutoAdvancer.js.map