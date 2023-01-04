// import NinePatch from './NinePatch';
// import NinePatchData from './NinePatchData';
import { NinePatch, NinePatchData } from '@rggt/nine-patch';
export default class MyPanel extends NinePatch {
    constructor(scene) {
        const data = new NinePatchData('pnlPanel2', undefined, 681, 422, 41, 41);
        super(data, scene);
    }
}
//# sourceMappingURL=MyPanel.js.map