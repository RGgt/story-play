import NinePatch from './NinePatch';
import NinePatchData from './NinePatchData';

export default class MyPanel extends NinePatch {
  constructor(scene: Phaser.Scene) {
    const data = new NinePatchData('pnlPanel2', undefined, 681, 422, 41, 41);
    super(data, scene);
  }
}
