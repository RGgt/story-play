import { BoxCreator, Button, ButtonCreator, GroupBox, Perimeter, TextCreator } from '@rggt/gui-elements';
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
    const titleTextValue = 'SAVE';

    const testText = TextCreator.createSaveButtonText(
      scene,
      0,
      0,
      'fq\r\nfq',
      AspectConstants.SAVE_DIALOG_SLOT_IMAGE_WEIGTH,
    );

    const dialogWidth =
      3 * (AspectConstants.SAVE_DIALOG_SLOT_IMAGE_WEIGTH + AspectConstants.SAVE_DIALOG_SLOT_SPACING_H * 3) +
      2 * AspectConstants.SAVE_DIALOG_PADDING_H;

    const titleText = TextCreator.createTitleText(scene, 0, 0, titleTextValue, dialogWidth);

    const dialogHeight =
      2 *
      (AspectConstants.SAVE_DIALOG_SLOT_IMAGE_HEIGHT +
        AspectConstants.SAVE_DIALOG_SLOT_SPACING_V * 4 +
        testText.height) +
      3 * AspectConstants.SAVE_DIALOG_PADDING_V +
      titleText.height - 2 * AspectConstants.SAVE_DIALOG_SLOT_SPACING_V;

    // const dialogWidth = (1920 * 2) / 3;
    // const dialogHeight = Save._calculateDialogHeight();
    const shape = BoxCreator.createCentralPanelBox(scene, dialogWidth, dialogHeight);

    const buttonTop = shape.getTop() + 2 * AspectConstants.SAVE_DIALOG_PADDING_V + titleText.height;
    // const buttonLeft = shape.getLeft() + AspectConstants.DIALOG_PADDING_H;
    // const buttonWidth = (dialogWidth - 2 * AspectConstants.DIALOG_PADDING_H - 2 * AspectConstants.DIALOG_SPACING_V) / 3;
    // const buttonHeight = 300;
    titleText.setPosition(shape.getCenter().x, shape.getTop() + AspectConstants.SAVE_DIALOG_PADDING_V);
    titleText.setOrigin(0.5, 0);
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

    Save._createSaveSlot(
      scene,
      options,
      1,
      0,
      shape.getLeft() + AspectConstants.SAVE_DIALOG_PADDING_H,
      buttonTop,
      testText.height,
    );
    Save._createSaveSlot(
      scene,
      options,
      1,
      1,
      shape.getLeft() + AspectConstants.SAVE_DIALOG_PADDING_H,
      buttonTop,
      testText.height,
    );
    Save._createSaveSlot(
      scene,
      options,
      1,
      2,
      shape.getLeft() + AspectConstants.SAVE_DIALOG_PADDING_H,
      buttonTop,
      testText.height,
    );
    Save._createSaveSlot(
      scene,
      options,
      1,
      3,
      shape.getLeft() + AspectConstants.SAVE_DIALOG_PADDING_H,
      buttonTop,
      testText.height,
    );
    Save._createSaveSlot(
      scene,
      options,
      1,
      4,
      shape.getLeft() + AspectConstants.SAVE_DIALOG_PADDING_H,
      buttonTop,
      testText.height,
    );
    Save._createSaveSlot(
      scene,
      options,
      1,
      5,
      shape.getLeft() + AspectConstants.SAVE_DIALOG_PADDING_H,
      buttonTop,
      testText.height,
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

    const slotLeft =
      areaLeft +
      (slotNo % 3) * (AspectConstants.SAVE_DIALOG_SLOT_IMAGE_WEIGTH + AspectConstants.SAVE_DIALOG_SLOT_SPACING_H * 3);
    const slotTop =
      areaTop +
      ((slotNo - (slotNo % 3)) *
        (AspectConstants.SAVE_DIALOG_SLOT_IMAGE_HEIGHT + AspectConstants.SAVE_DIALOG_SLOT_SPACING_V * 4 + textHeight)) /
      3;
    if (viewData) {
      // sprite
      const sprite = scene.add.sprite(slotLeft, slotTop, 'frame_1_08_10');
      sprite.setOrigin(0, 0);
      sprite.setScale(
        AspectConstants.SAVE_DIALOG_SLOT_IMAGE_WEIGTH / 1920,
        AspectConstants.SAVE_DIALOG_SLOT_IMAGE_HEIGHT / 1080,
      );

      // text
      const boxText = TextCreator.createSaveButtonText(
        scene,
        slotLeft + AspectConstants.SAVE_DIALOG_SLOT_SPACING_H + AspectConstants.SAVE_DIALOG_SLOT_IMAGE_WEIGTH / 2,
        slotTop + AspectConstants.SAVE_DIALOG_SLOT_IMAGE_HEIGHT + AspectConstants.SAVE_DIALOG_SLOT_SPACING_V,
        'Friday, October 15 2021, \r\n23:42',
        AspectConstants.SAVE_DIALOG_SLOT_IMAGE_WEIGTH,
      );
      boxText.setOrigin(0.5, 0);
      scene.add.existing(boxText);

      // box
      const box = BoxCreator.createGroupBox(
        scene,
        slotLeft - AspectConstants.SAVE_DIALOG_SLOT_SPACING_H,
        slotTop - AspectConstants.SAVE_DIALOG_SLOT_SPACING_V,
        AspectConstants.SAVE_DIALOG_SLOT_IMAGE_WEIGTH + 2 * AspectConstants.SAVE_DIALOG_SLOT_SPACING_H,
        AspectConstants.SAVE_DIALOG_SLOT_IMAGE_HEIGHT + AspectConstants.SAVE_DIALOG_SLOT_SPACING_V * 3 + textHeight,
      );
    }
    // create an image
  }
}
export { Save };
