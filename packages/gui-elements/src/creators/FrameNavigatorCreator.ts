import { Perimeter } from '../components/Perimeter';
import AspectConstants from '../factories/AspectConstants';

class FrameNavigatorCreator {
  public static createFrameNavigatorBfm(
    scene: Phaser.Scene,
    onClick: undefined | (() => void),
    onShowMenu: undefined | (() => void),
    onNavBack: undefined | (() => void),
  ) {
    const customComponent = new Perimeter(scene);
    customComponent.reactToClick = (cx: number, cy: number) => {
      if (cx > 1920 - AspectConstants.HIDDEN_MENU_BUTTON_WIDTH && cy < AspectConstants.HIDDEN_MENU_BUTTON_HEIGHT) {
        if (onShowMenu) onShowMenu();
        // click on hidden menu button
      } else if (cx < AspectConstants.HIDDEN_NAV_BACK_WIDTH) {
        // click on hidden nav-back
        if (onNavBack) onNavBack();
      } else {
        // click in the main area
        // eslint-disable-next-line no-lonely-if
        if (onClick) onClick();
      }
    };
    scene.add.existing(customComponent);
    return customComponent;
  }
}
export { FrameNavigatorCreator };
