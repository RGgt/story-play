type TextureName = "btnNormal" | "btnHover" | "btnPressed" | "btnDisabled";
export default class MyButton extends Phaser.GameObjects.Group {
  private spriteTL: Phaser.GameObjects.Sprite | undefined;
  private spriteT: Phaser.GameObjects.Sprite | undefined;
  private spriteTR: Phaser.GameObjects.Sprite | undefined;
  private spriteML: Phaser.GameObjects.Sprite | undefined;
  private spriteM: Phaser.GameObjects.Sprite | undefined;
  private spriteMR: Phaser.GameObjects.Sprite | undefined;
  private spriteBL: Phaser.GameObjects.Sprite | undefined;
  private spriteB: Phaser.GameObjects.Sprite | undefined;
  private spriteBR: Phaser.GameObjects.Sprite | undefined;
  private _bounds: Phaser.Geom.Rectangle | undefined;
  private _x: number = 0;
  private _y: number = 0;
  private _disabled: boolean = false;
  constructor(scene: Phaser.Scene) {
    super(scene);
  }
  init(x: number, y: number) {
    this._x = x;
    this._y = y;
    const screenCenterX = this.scene.cameras.main.worldView.x + this.scene.cameras.main.width / 2;
    const screenCenterY = this.scene.cameras.main.worldView.y + this.scene.cameras.main.height / 2;
    // this.add(new Phaser.GameObjects.Sprite(this.scene,screenCenterX, screenCenterY, 'main');
    this.addFrames("btnNormal");
    this.addFrames("btnHover");
    this.addFrames("btnPressed");
    this.addFrames("btnDisabled");

    this.spriteTL = this.scene.add.sprite(x + 0 + 0, y + 0, 'btnNormal', 'frmTL');
    this.spriteT = this.scene.add.sprite(x + 0 + 8 + 294 / 2, y + 0, 'btnNormal', 'frmT');
    this.spriteTR = this.scene.add.sprite(x + 0 + 16 + 294, y + 0, 'btnNormal', 'frmTR');

    this.spriteML = this.scene.add.sprite(x + 0 + 0, y + 0 + 22 + 8, 'btnNormal', 'frmML');
    this.spriteM = this.scene.add.sprite(x + 0 + 8 + 294 / 2, y + 0 + 22 + 8, 'btnNormal', 'frmM');
    this.spriteMR = this.scene.add.sprite(x + 0 + 16 + 294, y + 0 + 22 + 8, 'btnNormal', 'frmMR');

    this.spriteBL = this.scene.add.sprite(x + 0 + 0, y + 0 + 30 + 22 + 8, 'btnNormal', 'frmBL');
    this.spriteB = this.scene.add.sprite(x + 0 + 8 + 294 / 2, y + 0 + 30 + 22 + 8, 'btnNormal', 'frmB');
    this.spriteBR = this.scene.add.sprite(x + 0 + 16 + 294, y + 0 + 30 + 22 + 8, 'btnNormal', 'frmBR');
    this._bounds = new Phaser.Geom.Rectangle(x, y, 310, 60);
    // this._disabled = true;
  }
  addFrames(textureName: TextureName) {
    const texture = this.scene.textures.get(textureName);
    texture.add('frmTL', 0, 0, 0, 8, 8);
    texture.add('frmT', 0, 8, 0, 294, 8);
    texture.add('frmTR', 0, 302, 0, 8, 8);

    texture.add('frmML', 0, 0, 8, 8, 44);
    texture.add('frmM', 0, 8, 8, 294, 44);
    texture.add('frmMR', 0, 302, 8, 8, 44);

    texture.add('frmBL', 0, 0, 52, 8, 8);
    texture.add('frmB', 0, 8, 52, 294, 8);
    texture.add('frmBR', 0, 302, 52, 8, 8);
  }
  setTexture(textureName: TextureName) {
    this.spriteTL?.setTexture(textureName, 'frmTL')
    this.spriteT?.setTexture(textureName, 'frmT')
    this.spriteTR?.setTexture(textureName, 'frmTR')
    this.spriteML?.setTexture(textureName, 'frmML')
    this.spriteM?.setTexture(textureName, 'frmM')
    this.spriteMR?.setTexture(textureName, 'frmMR')
    this.spriteBL?.setTexture(textureName, 'frmBL')
    this.spriteB?.setTexture(textureName, 'frmB')
    this.spriteBR?.setTexture(textureName, 'frmBR')
  }
  preUpdate() {

    // Get the current cursor position
    let pointer = this.scene.input.activePointer;

    // Check if the cursor is over the component
    if (this._disabled) {
      this.setTexture('btnDisabled')
    } else if (this._bounds!.contains(pointer.x, pointer.y)) {
      if (pointer.button === 0 && pointer.isDown)
        this.setTexture('btnPressed')
      else
        this.setTexture('btnHover')
    } else {
      this.setTexture('btnNormal')
    }
  }
}
