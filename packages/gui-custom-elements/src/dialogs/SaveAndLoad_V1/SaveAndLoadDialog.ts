import { BoxCreator, Button, ButtonCreator, PanelBox, TextCreator } from '@rggt/gui-elements';
import AspectConstants from '../../AspectConstants';
import { SaveAndLoadDialogOptions } from './SaveAndLoadDialogOptions';
import { SaveAndLoadSlotData } from './SaveAndLoadSlotData';

class SaveAndLoadDialog {
  DialogBackground?: PanelBox;

  constructor(
    public readonly Data: Array<SaveAndLoadSlotData>,
    scene: Phaser.Scene,
    options: SaveAndLoadDialogOptions,
  ) {
    const titleTextValue = 'SAVE-âÂ – ăÂ – țȚ – îÎ – șȘ';
    const testText = TextCreator.createSaveButtonText(
      scene,
      0,
      0,
      'fq\r\nfq',
      AspectConstants.SAVE_DIALOG_SLOT_IMAGE_WIDTH,
    );

    const dialogWidth = SaveAndLoadDialog._getDialogWidth();

    // const titleText = TextCreator.createTitleText(scene, 0, 0, titleTextValue, dialogWidth);

    const dialogHeight = SaveAndLoadDialog._getDialogHeight(AspectConstants.SAVE_DIALOG_BUTTON_HEIGHT, testText.height);

    const shape = BoxCreator.createCentralPanelBox(scene, dialogWidth, dialogHeight);
    const blocker = BoxCreator.createBackgroundBlocker(
      scene,
      shape.getLeft(),
      shape.getTop(),
      dialogWidth,
      dialogHeight,
    );
    blocker.depth = -1;

    // titleText.setPosition(shape.getCenter().x, shape.getTop() + AspectConstants.SAVE_DIALOG_PADDING_V);
    // titleText.setOrigin(0.5, 0);
    // scene.add.existing(titleText);

    const pageIndex = 0;
    const areaLeft = shape.getLeft() + AspectConstants.SAVE_DIALOG_PADDING_H;
    const areaTop =
      shape.getTop() +
      AspectConstants.SAVE_DIALOG_PADDING_V +
      AspectConstants.SAVE_DIALOG_BUTTON_HEIGHT +
      AspectConstants.SAVE_DIALOG_SPACING_V;
    // Save._createSlots(scene, options, shape, pageIndex, areaLeft, areaTop, testText.height);

    SaveAndLoadDialog._createCloseButton(scene, options, shape, dialogWidth);
    SaveAndLoadDialog._createDialogTitleBar(scene, options, shape, dialogWidth);
  }

  private static _getTitleBarHeight() {
    return AspectConstants.SAVE_DIALOG_BUTTON_HEIGHT + AspectConstants.SAVE_DIALOG_SPACING_V;
  }

  private static _createDialogTitleBar(
    scene: Phaser.Scene,
    options: SaveAndLoadDialogOptions,
    shape: PanelBox,
    dialogWidth: number,
  ) {
    let btnLoad: {
      button: Button;
      text: Phaser.GameObjects.Text;
      icon: Phaser.GameObjects.Image;
    };
    const FONT_SIZE_NORMAL = 36;
    const FONT_SIZE_LARGE = 52;
    const btnSave = ButtonCreator.addIconTextButton(
      scene,
      shape.getLeft() + AspectConstants.SAVE_DIALOG_PADDING_H,
      shape.getTop() + AspectConstants.SAVE_DIALOG_PADDING_V,
      (dialogWidth - 2 * AspectConstants.SAVE_DIALOG_PADDING_H - AspectConstants.SAVE_DIALOG_SPACING_H) / 2,
      AspectConstants.SAVE_DIALOG_BUTTON_HEIGHT,
      'icon_check_on',
      'Save',
      () => {
        btnLoad.icon.setTexture('icon_check_off');
        btnLoad.button.Pushed = false;
        btnLoad.button.Disabled = false;
        btnLoad.text.setFontSize(FONT_SIZE_NORMAL);
        btnSave.icon.setTexture('icon_check_on');
        btnSave.button.Pushed = true;
        btnSave.button.Disabled = true;
        btnSave.text.setFontSize(FONT_SIZE_LARGE);
      },
      false,
    );
    btnSave.button.Pushed = true;
    btnSave.button.Disabled = true;
    btnSave.text.setFontSize(FONT_SIZE_LARGE);
    btnLoad = ButtonCreator.addIconTextButton(
      scene,
      shape.getLeft() +
        AspectConstants.SAVE_DIALOG_PADDING_H +
        (dialogWidth - 2 * AspectConstants.SAVE_DIALOG_PADDING_H - AspectConstants.SAVE_DIALOG_SPACING_H) / 2 +
        AspectConstants.SAVE_DIALOG_SPACING_H,
      shape.getTop() + AspectConstants.SAVE_DIALOG_PADDING_V,
      (dialogWidth - 2 * AspectConstants.SAVE_DIALOG_PADDING_H - AspectConstants.SAVE_DIALOG_SPACING_H) / 2,
      AspectConstants.SAVE_DIALOG_BUTTON_HEIGHT,
      'icon_check_off',
      'Load',
      () => {
        btnSave.icon.setTexture('icon_check_off');
        btnLoad.button.Pushed = true;
        btnLoad.button.Disabled = true;
        btnLoad.icon.setTexture('icon_check_on');
        btnLoad.text.setFontSize(FONT_SIZE_LARGE);
        btnSave.button.Pushed = false;
        btnSave.button.Disabled = false;
        btnSave.text.setFontSize(FONT_SIZE_NORMAL);
      },
      false,
    );
    btnLoad.button.Pushed = false;
    btnLoad.text.setFontSize(FONT_SIZE_NORMAL);
    return btnSave;
  }

  private static _getSlotWidth() {
    return 2 * AspectConstants.SAVE_DIALOG_SLOT_PADDING_H + AspectConstants.SAVE_DIALOG_SLOT_IMAGE_WIDTH;
  }

  private static _getSlotHeight(textHeight: number) {
    return (
      2 * AspectConstants.SAVE_DIALOG_SLOT_PADDING_V +
      AspectConstants.SAVE_DIALOG_SLOT_IMAGE_HEIGHT +
      textHeight +
      AspectConstants.SAVE_DIALOG_SLOT_SPACING_V
    );
  }

  private static _getDialogWidth() {
    return (
      2 * AspectConstants.SAVE_DIALOG_PADDING_H +
      3 * SaveAndLoadDialog._getSlotWidth() +
      2 * AspectConstants.SAVE_DIALOG_SPACING_H
    );
  }

  private static _getDialogHeight(titleTextHeight: number, slotTextHeight: number) {
    return (
      2 * AspectConstants.SAVE_DIALOG_PADDING_V +
      SaveAndLoadDialog._getTitleBarHeight() +
      2 * AspectConstants.SAVE_DIALOG_SPACING_V +
      AspectConstants.SAVE_DIALOG_SPACING_V_TEXT +
      2 * SaveAndLoadDialog._getSlotHeight(slotTextHeight) +
      AspectConstants.SAVE_DIALOG_BUTTON_HEIGHT
    );
  }

  private static _createCloseButton(
    scene: Phaser.Scene,
    options: SaveAndLoadDialogOptions,
    shape: PanelBox,
    dialogWidth: number,
  ) {
    const result = ButtonCreator.addSimpleButton(
      scene,
      shape.getLeft() + AspectConstants.SAVE_DIALOG_PADDING_H,
      shape.getBottom() - AspectConstants.SAVE_DIALOG_SPACING_V - AspectConstants.SAVE_DIALOG_BUTTON_HEIGHT,
      dialogWidth - 2 * AspectConstants.SAVE_DIALOG_PADDING_H,
      AspectConstants.SAVE_DIALOG_BUTTON_HEIGHT,
      'Close',
      options.onClose,
      false,
    );
    return result;
  }
}
export { SaveAndLoadDialog };
