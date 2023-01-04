// import NinePatch from './NinePatch';
// import NinePatchData from './NinePatchData';
import { NinePatch, NinePatchData } from '@rggt/nine-patch';

export default class GroupBox extends NinePatch {
  constructor(scene: Phaser.Scene) {
    const data = new NinePatchData('group_box', undefined, 310, 60, 8, 8);
    super(data, scene);
  }
}
