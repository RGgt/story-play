import Phaser from 'phaser'
import MyButton from '../components/MyButton';
export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('title');
  }
  preload() { }
  create() {
    this.create_v2();
  }
  create_v3() {
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    // this.add(new Phaser.GameObjects.Sprite(this.scene,screenCenterX, screenCenterY, 'main');
    const texture = this.textures.get("btnNormal");
    texture.add('btnNormalTL', 0, 0, 0, 8, 8);
    texture.add('btnNormalT', 0, 8, 0, 294, 8);
    texture.add('btnNormalTR', 0, 302, 0, 8, 8);

    texture.add('btnNormalML', 0, 0, 8, 8, 44);
    texture.add('btnNormalM', 0, 8, 8, 294, 44);
    texture.add('btnNormalMR', 0, 302, 8, 8, 44);

    texture.add('btnNormalBL', 0, 0, 52, 8, 8);
    texture.add('btnNormalB', 0, 8, 52, 294, 8);
    texture.add('btnNormalBR', 0, 302, 52, 8, 8);

    this.add.sprite(400 + 0, 100, 'btnNormal', 'btnNormalTL');
    this.add.sprite(400 + 8 + 294 / 2, 100, 'btnNormal', 'btnNormalT');
    this.add.sprite(400 + 16 + 294, 100, 'btnNormal', 'btnNormalTR');

    this.add.sprite(400 + 0, 100 + 22 + 8, 'btnNormal', 'btnNormalML');
    this.add.sprite(400 + 8 + 294 / 2, 100 + 22 + 8, 'btnNormal', 'btnNormalM');
    this.add.sprite(400 + 16 + 294, 100 + 22 + 8, 'btnNormal', 'btnNormalMR');

    this.add.sprite(400 + 0, 130 + 22 + 8, 'btnNormal', 'btnNormalBL');
    this.add.sprite(400 + 8 + 294 / 2, 130 + 22 + 8, 'btnNormal', 'btnNormalB');
    this.add.sprite(400 + 16 + 294, 130 + 22 + 8, 'btnNormal', 'btnNormalBR');
  }
  create_v2() {
    let customComponent = new MyButton(this);
    customComponent.init(100, 100);
    this.add.existing(customComponent);
    // this.update.add
  }
  create_v1() {
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    // this.add.image(screenCenterX, screenCenterY, 'main');
    const texture = this.textures.get("btnNormal");
    texture.add('btnNormalTL', 0, 0, 0, 8, 8);
    texture.add('btnNormalT', 0, 8, 0, 294, 8);
    texture.add('btnNormalTR', 0, 302, 0, 8, 8);

    texture.add('btnNormalML', 0, 0, 8, 8, 44);
    texture.add('btnNormalM', 0, 8, 8, 294, 44);
    texture.add('btnNormalMR', 0, 302, 8, 8, 44);

    texture.add('btnNormalBL', 0, 0, 52, 8, 8);
    texture.add('btnNormalB', 0, 8, 52, 294, 8);
    texture.add('btnNormalBR', 0, 302, 52, 8, 8);

    // this.add.image(
    // let buttonBg = this.add.sprite(400, 300, 'btnNormal', 'btnNormalMid');
    // buttonBg.setFrame('btnNormalMid');
    // buttonBg.setDisplaySize(300, 300);
    // buttonBg.setPosition(100, 100);
    // this.add.existing(buttonBg);
    // let buttonText = new Phaser.GameObjects.Text(this, 400, 300, "abcd", { font: '32px Arial' });
    // buttonText.x = buttonBg.x + (buttonBg.width / 2) - (buttonText.width / 2);
    // buttonText.y = buttonBg.y + (buttonBg.height / 2) - (buttonText.height / 2);
    // this.add.existing(buttonText);

    this.add.image(400 + 0, 100, 'btnNormal', 'btnNormalTL');
    this.add.image(400 + 8 + 294 / 2, 100, 'btnNormal', 'btnNormalT');
    this.add.image(400 + 16 + 294, 100, 'btnNormal', 'btnNormalTR');

    this.add.image(400 + 0, 100 + 22 + 8, 'btnNormal', 'btnNormalML');
    this.add.image(400 + 8 + 294 / 2, 100 + 22 + 8, 'btnNormal', 'btnNormalM');
    this.add.image(400 + 16 + 294, 100 + 22 + 8, 'btnNormal', 'btnNormalMR');

    this.add.image(400 + 0, 130 + 22 + 8, 'btnNormal', 'btnNormalBL');
    this.add.image(400 + 8 + 294 / 2, 130 + 22 + 8, 'btnNormal', 'btnNormalB');
    this.add.image(400 + 16 + 294, 130 + 22 + 8, 'btnNormal', 'btnNormalBR');

  }
}
