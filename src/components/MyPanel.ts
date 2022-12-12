type TextureName = 'pnlPanel';
export default class MyPanel extends Phaser.GameObjects.Group {
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

  private _x = 0;

  private _y = 0;

  private _scaleX = 1;

  private _scaleY = 1;

  init(x: number, y: number, width: number, height: number) {
    this.addFrames('pnlPanel');

    this.calculateScales(width, height);

    const scaleX = this._scaleX;
    const scaleY = this._scaleY;

    const midWidth = 294 * scaleX;
    const midHeight = 44 * scaleY;

    this.spriteTL = this.scene.add.sprite(x + 0, y + 0, 'pnlPanel', 'frmTL');
    this.spriteT = this.scene.add.sprite(x + 8, y + 0, 'pnlPanel', 'frmT');
    this.spriteTR = this.scene.add.sprite(x + 8 + midWidth, y + 0, 'pnlPanel', 'frmTR');

    this.spriteML = this.scene.add.sprite(x + 0 + 0, y + 0 + 8, 'pnlPanel', 'frmML');
    this.spriteM = this.scene.add.sprite(x + 0 + 8, y + 0 + 8, 'pnlPanel', 'frmM');
    this.spriteMR = this.scene.add.sprite(x + 0 + 8 + midWidth, y + 8, 'pnlPanel', 'frmMR');

    this.spriteBL = this.scene.add.sprite(x + 0 + 0, y + 0 + midHeight + 8, 'pnlPanel', 'frmBL');
    this.spriteB = this.scene.add.sprite(x + 0 + 8, y + 0 + midHeight + 8, 'pnlPanel', 'frmB');
    this.spriteBR = this.scene.add.sprite(x + 0 + 8 + midWidth, y + 0 + midHeight + 8, 'pnlPanel', 'frmBR');
    this._bounds = new Phaser.Geom.Rectangle(x, y, midWidth + 16, midHeight + 16);
    this.spriteTL.setOrigin(0, 0);
    this.spriteT.setOrigin(0, 0);
    this.spriteTR.setOrigin(0, 0);
    this.spriteML.setOrigin(0, 0);
    this.spriteM.setOrigin(0, 0);
    this.spriteMR.setOrigin(0, 0);
    this.spriteBL.setOrigin(0, 0);
    this.spriteB.setOrigin(0, 0);
    this.spriteBR.setOrigin(0, 0);

    this._setScales(scaleX, scaleY);
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
    this.spriteTL?.setTexture(textureName, 'frmTL');
    this.spriteT?.setTexture(textureName, 'frmT');
    this.spriteTR?.setTexture(textureName, 'frmTR');
    this.spriteML?.setTexture(textureName, 'frmML');
    this.spriteM?.setTexture(textureName, 'frmM');
    this.spriteMR?.setTexture(textureName, 'frmMR');
    this.spriteBL?.setTexture(textureName, 'frmBL');
    this.spriteB?.setTexture(textureName, 'frmB');
    this.spriteBR?.setTexture(textureName, 'frmBR');
  }

  calculateScales(width: number, height: number) {
    this._scaleX = (width - 16) / (310 - 16);
    this._scaleY = (height - 16) / (60 - 16);
  }

  private _setScales(scaleX: number, scaleY: number) {
    if (!this.spriteTL) throw new Error('Component not initialised!');
    this.spriteTL!.scaleX = 1;
    this.spriteT!.scaleX = scaleX;
    this.spriteTR!.scaleX = 1;
    this.spriteML!.scaleX = 1;
    this.spriteM!.scaleX = scaleX;
    this.spriteMR!.scaleX = 1;
    this.spriteBL!.scaleX = 1;
    this.spriteB!.scaleX = scaleX;
    this.spriteBR!.scaleX = 1;

    this.spriteTL!.scaleY = 1;
    this.spriteT!.scaleY = 1;
    this.spriteTR!.scaleY = 1;
    this.spriteML!.scaleY = scaleY;
    this.spriteM!.scaleY = scaleY;
    this.spriteMR!.scaleY = scaleY;
    this.spriteBL!.scaleY = 1;
    this.spriteB!.scaleY = 1;
    this.spriteBR!.scaleY = 1;
  }

  getCenter() {
    return new Phaser.Geom.Point(this._bounds!.centerX, this._bounds!.centerY);
  }
}
