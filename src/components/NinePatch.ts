import NinePatchData from './NinePatchData';

// type TextureName = 'pnlPanel2';
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

  constructor(public readonly data: NinePatchData, scene: Phaser.Scene) {
    super(scene);
  }

  init(x: number, y: number, width: number, height: number) {
    this.addFrames(this.data.textureName);
    if (this.data.additionalTextureNames) {
      this.data.additionalTextureNames.forEach((textureName) => {
        this.addFrames(textureName);
      });
    }

    this.calculateScales(width, height);

    const textureWidthMinusTwoCorners = this.data.textureWidth - 2 * this.data.textureCornerWidth;
    const textureHeightMinusTwoCorners = this.data.textureHeight - 2 * this.data.textureCornerHeight;

    const scaleX = this._scaleX;
    const scaleY = this._scaleY;

    const midWidth = textureWidthMinusTwoCorners * scaleX;
    const midHeight = textureHeightMinusTwoCorners * scaleY;

    this.spriteTL = this.scene.add.sprite(x, y, this.data.textureName, 'frmTL');
    this.spriteT = this.scene.add.sprite(x + this.data.textureCornerWidth, y, this.data.textureName, 'frmT');
    this.spriteTR = this.scene.add.sprite(
      x + this.data.textureCornerWidth + midWidth,
      y,
      this.data.textureName,
      'frmTR',
    );

    this.spriteML = this.scene.add.sprite(x + 0, y + this.data.textureCornerHeight, this.data.textureName, 'frmML');
    this.spriteM = this.scene.add.sprite(
      x + this.data.textureCornerWidth,
      y + this.data.textureCornerHeight,
      this.data.textureName,
      'frmM',
    );
    this.spriteMR = this.scene.add.sprite(
      x + this.data.textureCornerWidth + midWidth,
      y + this.data.textureCornerHeight,
      this.data.textureName,
      'frmMR',
    );

    this.spriteBL = this.scene.add.sprite(
      x + 0,
      y + midHeight + this.data.textureCornerHeight,
      this.data.textureName,
      'frmBL',
    );
    this.spriteB = this.scene.add.sprite(
      x + this.data.textureCornerWidth,
      y + midHeight + this.data.textureCornerHeight,
      this.data.textureName,
      'frmB',
    );
    this.spriteBR = this.scene.add.sprite(
      x + this.data.textureCornerWidth + midWidth,
      y + midHeight + this.data.textureCornerHeight,
      this.data.textureName,
      'frmBR',
    );
    this._bounds = new Phaser.Geom.Rectangle(
      x,
      y,
      midWidth + 2 * this.data.textureCornerWidth,
      midHeight + 2 * this.data.textureCornerHeight,
    );
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

  addFrames(textureName: string) {
    const textureWidthMinusTwoCorners = this.data.textureWidth - 2 * this.data.textureCornerHeight;
    const textureWidthMinusOneCorner = this.data.textureWidth - this.data.textureCornerWidth;
    const textureHeightMinusTwoCorners = this.data.textureHeight - 2 * this.data.textureCornerHeight;
    const textureHeightMinusOneCorner = this.data.textureHeight - this.data.textureCornerHeight;
    const texture = this.scene.textures.get(textureName);
    texture.add('frmTL', 0, 0, 0, this.data.textureCornerWidth, this.data.textureCornerHeight);
    texture.add(
      'frmT',
      0,
      this.data.textureCornerHeight,
      0,
      textureWidthMinusTwoCorners,
      this.data.textureCornerHeight,
    );
    texture.add('frmTR', 0, textureWidthMinusOneCorner, 0, this.data.textureCornerWidth, this.data.textureCornerHeight);

    texture.add(
      'frmML',
      0,
      0,
      this.data.textureCornerHeight,
      this.data.textureCornerWidth,
      textureHeightMinusTwoCorners,
    );
    texture.add(
      'frmM',
      0,
      this.data.textureCornerWidth,
      this.data.textureCornerHeight,
      textureWidthMinusTwoCorners,
      textureHeightMinusTwoCorners,
    );
    texture.add(
      'frmMR',
      0,
      textureWidthMinusOneCorner,
      this.data.textureCornerHeight,
      this.data.textureCornerWidth,
      textureHeightMinusTwoCorners,
    );

    texture.add(
      'frmBL',
      0,
      0,
      textureHeightMinusOneCorner,
      this.data.textureCornerWidth,
      this.data.textureCornerHeight,
    );
    texture.add(
      'frmB',
      0,
      this.data.textureCornerWidth,
      textureHeightMinusOneCorner,
      textureWidthMinusTwoCorners,
      this.data.textureCornerHeight,
    );
    texture.add(
      'frmBR',
      0,
      textureWidthMinusOneCorner,
      textureHeightMinusOneCorner,
      this.data.textureCornerWidth,
      this.data.textureCornerHeight,
    );
  }

  setTexture(textureName: string) {
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
    this._scaleX = (width - this.data.textureCornerWidth) / (this.data.textureWidth - this.data.textureCornerWidth);
    this._scaleY =
      (height - 2 * this.data.textureCornerHeight) / (this.data.textureHeight - 2 * this.data.textureCornerHeight);
  }

  private _setScales(scaleX: number, scaleY: number) {
    if (
      !this.spriteTL ||
      !this.spriteT ||
      !this.spriteTR ||
      !this.spriteML ||
      !this.spriteM ||
      !this.spriteMR ||
      !this.spriteBL ||
      !this.spriteB ||
      !this.spriteBR
    )
      throw new Error('Component not initialised!');
    this.spriteTL.scaleX = 1;
    this.spriteT.scaleX = scaleX;
    this.spriteTR.scaleX = 1;
    this.spriteML.scaleX = 1;
    this.spriteM.scaleX = scaleX;
    this.spriteMR.scaleX = 1;
    this.spriteBL.scaleX = 1;
    this.spriteB.scaleX = scaleX;
    this.spriteBR.scaleX = 1;

    this.spriteTL.scaleY = 1;
    this.spriteT.scaleY = 1;
    this.spriteTR.scaleY = 1;
    this.spriteML.scaleY = scaleY;
    this.spriteM.scaleY = scaleY;
    this.spriteMR.scaleY = scaleY;
    this.spriteBL.scaleY = 1;
    this.spriteB.scaleY = 1;
    this.spriteBR.scaleY = 1;
  }

  getCenter() {
    if (!this._bounds) throw new Error('Component not initialised!');
    return new Phaser.Geom.Point(this._bounds.centerX, this._bounds.centerY);
  }
}
