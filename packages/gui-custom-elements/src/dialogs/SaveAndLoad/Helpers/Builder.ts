import {
  BoxCreator,
  Button,
  ButtonCreator,
  PanelBox,
  TextCreator,
  BackgroundBlocker,
} from '@rggt/gui-elements';
import { DialogOptions } from '../DialogOptions';
import { Metrics } from './Metrics';
import { PaginationAreaBuilder } from './PaginationAreaBuilder';
import { PaginationSlotComponents } from './PaginationSlotBuilder';
import { SlotComponents } from './SlotBuilder';
import { SlotsAreaBuilder } from './SlotsAreaBuilder';

type SaveLoadDialogComponents = {
  windowBackground: PanelBox;
  backgroundBlocker: BackgroundBlocker;
  lblWindowTitle: Phaser.GameObjects.Text;
  slotsArea: SlotComponents[];
  buildPaginationArea: PaginationSlotComponents[];
  btnCloseWindow: { button: Button; text: Phaser.GameObjects.Text };
};
class Builder {
  public static BuildDialog(
    scene: Phaser.Scene,
    options: DialogOptions,
  ): SaveLoadDialogComponents {
    const windowBackground = Builder.buildWindowShape(scene);
    // Blocker (darker area outside the window)
    const backgroundBlocker = Builder.buildBackgroundBlocker(scene);
    const lblWindowTitle = Builder.buildWindowTitle(scene);
    const slotsArea = SlotsAreaBuilder.buildSlotsArea(
      scene,
      options.activePageIndex,
      options.onSaveToSlot,
    );
    const buildPaginationArea = PaginationAreaBuilder.buildPaginationArea(
      scene,
      options.activePageIndex,
      options.onPageChanged,
    );
    const btnCloseWindow = Builder.buildCloseButton(scene, options.onClose);

    return {
      windowBackground,
      backgroundBlocker,
      lblWindowTitle,
      slotsArea,
      buildPaginationArea,
      btnCloseWindow,
    };
  }

  private static buildWindowShape(scene: Phaser.Scene) {
    return BoxCreator.createCentralPanelBox(
      scene,
      Metrics.WINDOW_WIDTH,
      Metrics.WINDOW_HEIGHT,
    );
  }

  private static buildBackgroundBlocker(scene: Phaser.Scene) {
    const blocker = BoxCreator.createBackgroundBlocker(
      scene,
      Metrics.WINDOW_LEFT,
      Metrics.WINDOW_TOP,
      Metrics.WINDOW_WIDTH,
      Metrics.WINDOW_HEIGHT,
    );
    blocker.depth = -1;
    return blocker;
  }

  private static buildWindowTitle(scene: Phaser.Scene) {
    const titleTextValue = 'SAVE';
    const lblTitle = TextCreator.createTitleText(
      scene,
      0,
      0,
      titleTextValue,
      Metrics.TITLE_WIDTH,
    );
    lblTitle.setPosition(
      Metrics.TITLE_LEFT + Metrics.TITLE_WIDTH / 2,
      Metrics.TITLE_TOP + Metrics.TITLE_HEIGHT / 2,
    );
    lblTitle.setOrigin(0.5, 0.5);
    scene.add.existing(lblTitle);
    return lblTitle;
  }

  private static buildCloseButton(scene: Phaser.Scene, onClose: () => void) {
    const btnClose = ButtonCreator.addSimpleButton(
      scene,
      Metrics.CLOSE_BUTTON_LEFT,
      Metrics.CLOSE_BUTTON_TOP,
      Metrics.CLOSE_BUTTON_WIDTH,
      Metrics.CLOSE_BUTTON_HEIGHT,
      'Close',
      onClose,
      false,
    );
    return btnClose;
  }
}
export { Builder };
