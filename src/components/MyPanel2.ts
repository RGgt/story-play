import NinePatch from './NinePatch';
import NinePatchData from './NinePatchData';

export default class MyPanel2 extends NinePatch {
  constructor(scene: Phaser.Scene) {
    const data = new NinePatchData('pnlPanel', undefined, 310, 60, 8, 8);
    super(data, scene);
  }
}
