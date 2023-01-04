// import NinePatch from './NinePatch';
// import NinePatchData from './NinePatchData';
import { NinePatch, NinePatchData } from '@rggt/nine-patch';

export default class PanelBox extends NinePatch {
  constructor(scene: Phaser.Scene) {
    const data = new NinePatchData('panel', undefined, 310, 60, 8, 8);
    super(data, scene);
  }
}
