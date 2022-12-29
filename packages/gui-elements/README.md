# `@rggt/gui-elements`

> **The whole purpose of this package is to simplify the creation and configuration the GUI elements that are going to be used**

Phaser has a lot of power and customization and there are plenty of settings that could be tweaked but in practice I only intend to use a few predefined styles for my GUI controls. For example, for texts i may use:

- some large text with shoadows and outline for title
- someting a bit smaller, but also quite large for subtitles
- something for narration text and dialogs, with maybe one color per speaker
- something for buttons
- something smaller for hints inside buttons (like a footnote)
- something for tooltips

and probably a few more styles, but this is all that I need for texts.
Therefore I created this package to simplify the creation of the GUI elements that I need. So instead of manually creating and formatting the text in need, i will use something like `createTitleText(text:string)`.

## Usage

```javascript

import { TextCreator } from '@rggt/gui-elements';

...
    const titleText = TextCreator.createTitleText(scene, left, top, text, width);
    scene.add.existing(titleText);
```
