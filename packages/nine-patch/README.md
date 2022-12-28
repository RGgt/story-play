# `@rggt/nine-patch`

> This is a reusable Phaser 3 component that implements [9-slice scaling](https://en.wikipedia.org/wiki/9-slice_scaling).

## Usage

```javascript
//import it
import { NinePatch, NinePatchData } from '@rggt/nine-patch';

// and use it to define your own nine-patch qui controls.

class MyPanel extends NinePatch {
  constructor(scene: Phaser.Scene) {
    const data = new NinePatchData('panelTexture', undefined, 681, 422, 41, 41);
    super(data, scene);
  }
}

// and later
class SceneBuilder {
  public static addBackgroundPanel(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
    const customComponent = new MyPanel(scene);
    customComponent.init(x, y, width, height);
    scene.add.existing(customComponent);
    return customComponent;
  }
}
```

## Note!

You may notice the `undefined` used in the constructor of MyPanel. This is in place of an array of additional textures, that may be useful, for example, for buttons, which will change the active texture on mouse events (for example: mouse in, mouse out, mouse down).
