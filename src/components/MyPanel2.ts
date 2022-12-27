// import NinePatch from './NinePatch';
// import NinePatchData from './NinePatchData';
import { NinePatch, NinePatchData } from '@rggt/nine-patch';

export default class MyPanel2 extends NinePatch {
  constructor(scene: Phaser.Scene) {
    const data = new NinePatchData('pnlPanel', undefined, 310, 60, 8, 8);
    super(data, scene);
  }
}
