type TextureName = 'pnlPanel2';
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

  private readonly TEXTURE_NAME = 'pnlPanel2';

  private readonly TEXTURE_WIDTH = 681;

  private readonly TEXTURE_HEIGHT = 422;

  private readonly TEXTURE_CORNER_WIDTH = 41;

  private readonly TEXTURE_CORNER_HEIGHT = 41;

  init(x: number, y: number, width: number, height: number) {
    this.addFrames(this.TEXTURE_NAME);

    this.calculateScales(width, height);

    const textureWidthMinusTwoCorners = this.TEXTURE_WIDTH - 2 * this.TEXTURE_CORNER_WIDTH;
    const textureHeightMinusTwoCorners = this.TEXTURE_HEIGHT - 2 * this.TEXTURE_CORNER_HEIGHT;

    const scaleX = this._scaleX;
    const scaleY = this._scaleY;

    const midWidth = textureWidthMinusTwoCorners * scaleX;
    const midHeight = textureHeightMinusTwoCorners * scaleY;

    this.spriteTL = this.scene.add.sprite(x, y, this.TEXTURE_NAME, 'frmTL');
    this.spriteT = this.scene.add.sprite(x + this.TEXTURE_CORNER_WIDTH, y, this.TEXTURE_NAME, 'frmT');
    this.spriteTR = this.scene.add.sprite(x + this.TEXTURE_CORNER_WIDTH + midWidth, y, this.TEXTURE_NAME, 'frmTR');

    this.spriteML = this.scene.add.sprite(x + 0, y + this.TEXTURE_CORNER_HEIGHT, this.TEXTURE_NAME, 'frmML');
    this.spriteM = this.scene.add.sprite(
      x + this.TEXTURE_CORNER_WIDTH,
      y + this.TEXTURE_CORNER_HEIGHT,
      this.TEXTURE_NAME,
      'frmM',
    );
    this.spriteMR = this.scene.add.sprite(
      x + this.TEXTURE_CORNER_WIDTH + midWidth,
      y + this.TEXTURE_CORNER_HEIGHT,
      this.TEXTURE_NAME,
      'frmMR',
    );

    this.spriteBL = this.scene.add.sprite(
      x + 0,
      y + midHeight + this.TEXTURE_CORNER_HEIGHT,
      this.TEXTURE_NAME,
      'frmBL',
    );
    this.spriteB = this.scene.add.sprite(
      x + this.TEXTURE_CORNER_WIDTH,
      y + midHeight + this.TEXTURE_CORNER_HEIGHT,
      this.TEXTURE_NAME,
      'frmB',
    );
    this.spriteBR = this.scene.add.sprite(
      x + this.TEXTURE_CORNER_WIDTH + midWidth,
      y + midHeight + this.TEXTURE_CORNER_HEIGHT,
      this.TEXTURE_NAME,
      'frmBR',
    );
    this._bounds = new Phaser.Geom.Rectangle(
      x,
      y,
      midWidth + 2 * this.TEXTURE_CORNER_WIDTH,
      midHeight + 2 * this.TEXTURE_CORNER_HEIGHT,
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

  addFrames(textureName: TextureName) {
    const textureWidthMinusTwoCorners = this.TEXTURE_WIDTH - 2 * this.TEXTURE_CORNER_WIDTH;
    const textureWidthMinusOneCorner = this.TEXTURE_WIDTH - this.TEXTURE_CORNER_WIDTH;
    const textureHeightMinusTwoCorners = this.TEXTURE_HEIGHT - 2 * this.TEXTURE_CORNER_HEIGHT;
    const textureHeightMinusOneCorner = this.TEXTURE_HEIGHT - this.TEXTURE_CORNER_HEIGHT;
    const texture = this.scene.textures.get(textureName);
    texture.add('frmTL', 0, 0, 0, this.TEXTURE_CORNER_WIDTH, this.TEXTURE_CORNER_HEIGHT);
    texture.add('frmT', 0, this.TEXTURE_CORNER_HEIGHT, 0, textureWidthMinusTwoCorners, this.TEXTURE_CORNER_HEIGHT);
    texture.add('frmTR', 0, textureWidthMinusOneCorner, 0, this.TEXTURE_CORNER_WIDTH, this.TEXTURE_CORNER_HEIGHT);

    texture.add('frmML', 0, 0, this.TEXTURE_CORNER_HEIGHT, this.TEXTURE_CORNER_WIDTH, textureHeightMinusTwoCorners);
    texture.add(
      'frmM',
      0,
      this.TEXTURE_CORNER_WIDTH,
      this.TEXTURE_CORNER_HEIGHT,
      textureWidthMinusTwoCorners,
      textureHeightMinusTwoCorners,
    );
    texture.add(
      'frmMR',
      0,
      textureWidthMinusOneCorner,
      this.TEXTURE_CORNER_HEIGHT,
      this.TEXTURE_CORNER_WIDTH,
      textureHeightMinusTwoCorners,
    );

    texture.add('frmBL', 0, 0, textureHeightMinusOneCorner, this.TEXTURE_CORNER_WIDTH, this.TEXTURE_CORNER_HEIGHT);
    texture.add(
      'frmB',
      0,
      this.TEXTURE_CORNER_WIDTH,
      textureHeightMinusOneCorner,
      textureWidthMinusTwoCorners,
      this.TEXTURE_CORNER_HEIGHT,
    );
    texture.add(
      'frmBR',
      0,
      textureWidthMinusOneCorner,
      textureHeightMinusOneCorner,
      this.TEXTURE_CORNER_WIDTH,
      this.TEXTURE_CORNER_HEIGHT,
    );
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
    this._scaleX = (width - this.TEXTURE_CORNER_WIDTH) / (this.TEXTURE_WIDTH - this.TEXTURE_CORNER_WIDTH);
    this._scaleY = (height - 2 * this.TEXTURE_CORNER_HEIGHT) / (this.TEXTURE_HEIGHT - 2 * this.TEXTURE_CORNER_HEIGHT);
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
