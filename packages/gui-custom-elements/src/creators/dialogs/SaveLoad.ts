import { BoxCreator, Button, ButtonCreator, GroupBox, PanelBox, Perimeter, TextCreator } from '@rggt/gui-elements';
import AspectConstants from '../../AspectConstants';

export type SaveOptions = {
  onSave: (page: number, slot: number) => void;
  onClose: () => void;
  getViewData: (page: number, slot: number) => SaveViewData | undefined;
};
export type SaveViewData = {
  AutoText: string;
  ImageB64: string;
};

type SaveSlotControls = {
  perimeter: Perimeter;
  box: GroupBox;
  image: Phaser.GameObjects.Sprite;
  label: Phaser.GameObjects.Text;
};
class Save {
  public static createSaveDialog(scene: Phaser.Scene, options: SaveOptions) {
    const titleTextValue = 'SAVE-âÂ – ăÂ – țȚ – îÎ – șȘ';

    const testText = TextCreator.createSaveButtonText(
      scene,
      0,
      0,
      'fq\r\nfq',
      AspectConstants.SAVE_DIALOG_SLOT_IMAGE_WIDTH,
    );

    const dialogWidth = Save._getDialogWidth();

    const titleText = TextCreator.createTitleText(scene, 0, 0, titleTextValue, dialogWidth);

    const dialogHeight = Save._getDialogHeight(titleText.height, testText.height);

    const shape = BoxCreator.createCentralPanelBox(scene, dialogWidth, dialogHeight);

    titleText.setPosition(shape.getCenter().x, shape.getTop() + AspectConstants.SAVE_DIALOG_PADDING_V);
    titleText.setOrigin(0.5, 0);
    // titleText.setPosition(shape.getLeft(), shape.getTop());
    // titleText.setOrigin(0.5, 0);
    scene.add.existing(titleText);
    // buttonTop += titleText.height;

    // const boxPerimeter = BoxCreator.createPerimeter(scene, buttonLeft, buttonTop, buttonWidth, buttonHeight);
    // boxPerimeter.reactToClick = options.onClose;
    // const boxText = TextCreator.createSaveButtonText(
    //   scene,
    //   buttonLeft + buttonWidth / 2,
    //   buttonTop + buttonHeight,
    //   'Friday, October 15 2021, \r\n23:42',
    //   buttonWidth,
    // );
    // boxText.setOrigin(0.5, 1.4);
    // scene.add.existing(boxText);
    // const sprite = scene.add.sprite(buttonLeft + 25, buttonTop + 25, 'frame_1_08_10');
    // sprite.setOrigin(0, 0);
    // sprite.setScale((buttonWidth - 50) / 1920, (buttonHeight - 125) / 1080);
    // const box = BoxCreator.createGroupBox(scene, buttonLeft, buttonTop, buttonWidth, buttonHeight);

    const areaLeft = shape.getLeft() + AspectConstants.SAVE_DIALOG_PADDING_H;
    const areaTop =
      shape.getTop() + AspectConstants.SAVE_DIALOG_PADDING_V + titleText.height + AspectConstants.SAVE_DIALOG_SPACING_V;
    Save._createSlots(scene, options, shape, 0, areaLeft, areaTop, testText.height);

    const buttonText = 'Close';
    const buttonDisabled = false;
    const btnDetail = ButtonCreator.addSimpleButton(
      scene,
      shape.getLeft() + AspectConstants.SAVE_DIALOG_PADDING_H,
      shape.getBottom() - AspectConstants.SAVE_DIALOG_SPACING_V - AspectConstants.SAVE_DIALOG_BUTTON_HEIGHT,
      dialogWidth - 2 * AspectConstants.SAVE_DIALOG_PADDING_H,
      AspectConstants.SAVE_DIALOG_BUTTON_HEIGHT,
      'Close',
      options.onClose,
      false,
    );

    // let buttonTop = shape.getTop() + AspectConstants.DIALOG_PADDING_V;
    // let buttonLeft = shape.getLeft() + AspectConstants.DIALOG_PADDING_H;
    // let btnDetail: { button: Button; text: Phaser.GameObjects.Text };
    // let buttonText: string;
    // let buttonDisabled: boolean;

    // const buttonWidth = (dialogWidth - 2 * AspectConstants.DIALOG_PADDING_H - 2 * AspectConstants.DIALOG_SPACING_V) / 3;
    // const buttonHeight = 300;
    // const screenCenterX = scene.cameras.main.worldView.x + scene.cameras.main.width / 2;

    // buttonText = "hello world";
    // buttonDisabled = false;
    // btnDetail = ButtonCreator.addSimpleButton(
    //   scene,
    //   buttonLeft,
    //   buttonTop,
    //   buttonWidth,
    //   buttonHeight,
    //   buttonText,
    //   options.onClose,
    //   buttonDisabled,
    // );
    // buttonTop = btnDetail.button.getBottom() + AspectConstants.DIALOG_PADDING_V;
  }
  // private static _placeText()

  private static _createSlots(
    scene: Phaser.Scene,
    options: SaveOptions,
    shape: PanelBox,
    pageNo: number,
    areaLeft: number,
    areaTop: number,
    slotTextHeight: number,
  ) {
    Save._createSaveSlot(scene, options, 1, 0, areaLeft, areaTop, slotTextHeight);
    Save._createSaveSlot(scene, options, 1, 1, areaLeft, areaTop, slotTextHeight);
    Save._createSaveSlot(scene, options, 1, 2, areaLeft, areaTop, slotTextHeight);
    Save._createSaveSlot(scene, options, 1, 3, areaLeft, areaTop, slotTextHeight);
    Save._createSaveSlot(scene, options, 1, 4, areaLeft, areaTop, slotTextHeight);
    Save._createSaveSlot(scene, options, 1, 5, areaLeft, areaTop, slotTextHeight);
  }

  private static _createSaveSlot(
    scene: Phaser.Scene,
    options: SaveOptions,
    pageNo: number,
    slotNo: number,
    areaLeft: number,
    areaTop: number,
    textHeight: number,
  ) {
    // if there is a game already saved in this slot, load the preview image and text.
    // const viewData = options.getViewData(pageNo, slotNo);
    const viewData = true;
    const slotWidth = Save._getSlotWidth();
    const slotHeight = Save._getSlotHeight(textHeight);

    let index = slotNo % 3;
    const slotLeft = areaLeft + index * (slotWidth + AspectConstants.SAVE_DIALOG_SPACING_H);
    index = slotNo - (slotNo % 3);
    const slotTop = areaTop + (index * (slotHeight + AspectConstants.SAVE_DIALOG_SPACING_V)) / 3;
    if (viewData) {
      // sprite
      const sprite = scene.add.sprite(
        slotLeft + AspectConstants.SAVE_DIALOG_SLOT_PADDING_H,
        slotTop + AspectConstants.SAVE_DIALOG_SLOT_PADDING_V,
        'frame_1_08_10',
      );
      sprite.setOrigin(0, 0);
      sprite.setScale(
        AspectConstants.SAVE_DIALOG_SLOT_IMAGE_WIDTH / 1920,
        AspectConstants.SAVE_DIALOG_SLOT_IMAGE_HEIGHT / 1080,
      );

      // text
      const textLeft =
        slotLeft + AspectConstants.SAVE_DIALOG_SLOT_PADDING_H + AspectConstants.SAVE_DIALOG_SLOT_IMAGE_WIDTH / 2;
      const textTop =
        slotTop +
        AspectConstants.SAVE_DIALOG_SLOT_IMAGE_HEIGHT +
        AspectConstants.SAVE_DIALOG_SLOT_SPACING_V +
        AspectConstants.SAVE_DIALOG_SLOT_PADDING_V;
      const boxText = TextCreator.createSaveButtonText(
        scene,
        textLeft,
        textTop,
        'Friday, October 15 2021, \r\n23:42',
        AspectConstants.SAVE_DIALOG_SLOT_IMAGE_WIDTH,
      );
      boxText.setOrigin(0.5, 0);
      scene.add.existing(boxText);

      // box
      const box = BoxCreator.createGroupBox(scene, slotLeft, slotTop, slotWidth, slotHeight);

      // perimeter
      // const boxPerimeter = BoxCreator.createPerimeter(scene, slotLeft, slotTop, slotWidth, slotHeight);
      // boxPerimeter.reactToClick = options.onSave;

      // Highlightable
      const boxHighlightable = BoxCreator.createHighlightable(scene, slotLeft, slotTop, slotWidth, slotHeight);
      boxHighlightable.onClick = options.onClose;
      // create an image
    }
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
      2 * AspectConstants.SAVE_DIALOG_PADDING_H + 3 * Save._getSlotWidth() + 2 * AspectConstants.SAVE_DIALOG_SPACING_H
    );
  }

  private static _getDialogHeight(titleTextHeight: number, slotTextHeight: number) {
    return (
      2 * AspectConstants.SAVE_DIALOG_PADDING_V +
      titleTextHeight +
      2 * AspectConstants.SAVE_DIALOG_SPACING_V +
      AspectConstants.SAVE_DIALOG_SPACING_V_TEXT +
      2 * Save._getSlotHeight(slotTextHeight) +
      AspectConstants.SAVE_DIALOG_BUTTON_HEIGHT
    );
  }
}
export { Save };
