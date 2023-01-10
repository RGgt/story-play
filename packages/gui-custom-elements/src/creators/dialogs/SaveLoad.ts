import {
  BoxCreator,
  Button,
  ButtonCreator,
  GroupBox,
  Highlightable,
  PanelBox,
  Perimeter,
  TextCreator,
} from '@rggt/gui-elements';
import AspectConstants from '../../AspectConstants';

export type SaveOptions = {
  onSave: (
    scene: Phaser.Scene,
    options: SaveOptions,
    page: number,
    slot: number,
    callbak: (
      scene: Phaser.Scene,
      options: SaveOptions,
      pageIndex: number,
      slotIndex: number,
      textureName: string,
    ) => void,
  ) => void;
  onClose: () => void;
  getViewData: (page: number, slot: number) => SaveViewData | undefined;
};
export type SaveViewData = {
  AutoText: string;
  ImageB64: string;
  HasData: boolean;
};

type SaveSlotControls =
  | {
    boxHighlightable: Highlightable;
    box: GroupBox;
    image?: Phaser.GameObjects.Sprite;
    label: Phaser.GameObjects.Text;
  }
  | undefined;
class Save {
  private static _saveSlotControls: Array<SaveSlotControls> = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ];

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

    const pageIndex = 0;
    const areaLeft = shape.getLeft() + AspectConstants.SAVE_DIALOG_PADDING_H;
    const areaTop =
      shape.getTop() + AspectConstants.SAVE_DIALOG_PADDING_V + titleText.height + AspectConstants.SAVE_DIALOG_SPACING_V;
    Save._createSlots(scene, options, shape, pageIndex, areaLeft, areaTop, testText.height);

    Save._createCloseButton(scene, options, shape, dialogWidth);

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

  private static _createCloseButton(scene: Phaser.Scene, options: SaveOptions, shape: PanelBox, dialogWidth: number) {
    return ButtonCreator.addSimpleButton(
      scene,
      shape.getLeft() + AspectConstants.SAVE_DIALOG_PADDING_H,
      shape.getBottom() - AspectConstants.SAVE_DIALOG_SPACING_V - AspectConstants.SAVE_DIALOG_BUTTON_HEIGHT,
      dialogWidth - 2 * AspectConstants.SAVE_DIALOG_PADDING_H,
      AspectConstants.SAVE_DIALOG_BUTTON_HEIGHT,
      'Close',
      options.onClose,
      false,
    );
  }

  private static _createSlots(
    scene: Phaser.Scene,
    options: SaveOptions,
    shape: PanelBox,
    pageIndex: number,
    areaLeft: number,
    areaTop: number,
    slotTextHeight: number,
  ) {
    Save._saveSlotControls[0] = Save._createSaveSlot(scene, options, pageIndex, 0, areaLeft, areaTop, slotTextHeight);
    Save._saveSlotControls[1] = Save._createSaveSlot(scene, options, pageIndex, 1, areaLeft, areaTop, slotTextHeight);
    Save._saveSlotControls[2] = Save._createSaveSlot(scene, options, pageIndex, 2, areaLeft, areaTop, slotTextHeight);
    Save._saveSlotControls[3] = Save._createSaveSlot(scene, options, pageIndex, 3, areaLeft, areaTop, slotTextHeight);
    Save._saveSlotControls[4] = Save._createSaveSlot(scene, options, pageIndex, 4, areaLeft, areaTop, slotTextHeight);
    Save._saveSlotControls[5] = Save._createSaveSlot(scene, options, pageIndex, 5, areaLeft, areaTop, slotTextHeight);
  }

  private static _createSaveSlot(
    scene: Phaser.Scene,
    options: SaveOptions,
    pageIndex: number,
    slotIndex: number,
    areaLeft: number,
    areaTop: number,
    textHeight: number,
  ) {
    // if there is a game already saved in this slot, load the preview image and text.
    const viewData = options.getViewData(pageIndex, slotIndex);
    // const viewData = true;
    const slotWidth = Save._getSlotWidth();
    const slotHeight = Save._getSlotHeight(textHeight);

    let index = slotIndex % 3;
    const slotLeft = areaLeft + index * (slotWidth + AspectConstants.SAVE_DIALOG_SPACING_H);
    index = slotIndex - (slotIndex % 3);
    const slotTop = areaTop + (index * (slotHeight + AspectConstants.SAVE_DIALOG_SPACING_V)) / 3;
    if (viewData && viewData.HasData) {
      return Save._createPopulatedSlot(
        viewData,
        scene,
        options,
        pageIndex,
        slotIndex,
        slotLeft,
        slotTop,
        slotWidth,
        slotHeight,
      );
    }
    return Save._createEmptySlot(scene, options, pageIndex, slotIndex, slotLeft, slotTop, slotWidth, slotHeight);
  }

  private static _createPopulatedSlot(
    viewData: SaveViewData,
    scene: Phaser.Scene,
    options: SaveOptions,
    pageIndex: number,
    slotIndex: number,
    slotLeft: number,
    slotTop: number,
    slotWidth: number,
    slotHeight: number,
  ) {
    const sprite = scene.add.sprite(
      slotLeft + AspectConstants.SAVE_DIALOG_SLOT_PADDING_H,
      slotTop + AspectConstants.SAVE_DIALOG_SLOT_PADDING_V,
      // 'frame_1_08_10',
      `screenshot_${pageIndex}_${slotIndex}`,
    );
    sprite.setOrigin(0, 0);
    sprite.setScale(
      (4 * AspectConstants.SAVE_DIALOG_SLOT_IMAGE_WIDTH) / 1920,
      (4 * AspectConstants.SAVE_DIALOG_SLOT_IMAGE_HEIGHT) / 1080,
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
      // 'Friday, October 15 2021, \r\n23:42',
      viewData.AutoText,
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
    boxHighlightable.onClick = () => {
      Save._callOnSaveMethod(scene, options, pageIndex, slotIndex);
    };
    const slotControls: SaveSlotControls = {
      boxHighlightable,
      box,
      image: sprite,
      label: boxText,
    };
    return slotControls;
  }

  private static _createEmptySlot(
    scene: Phaser.Scene,
    options: SaveOptions,
    pageIndex: number,
    slotIndex: number,
    slotLeft: number,
    slotTop: number,
    slotWidth: number,
    slotHeight: number,
  ) {
    // box
    const box = BoxCreator.createGroupBox(scene, slotLeft, slotTop, slotWidth, slotHeight);

    // text
    const boxText = TextCreator.createTitleText(
      scene,
      box.getCenter().x,
      box.getCenter().y,
      'Free Slot',
      AspectConstants.SAVE_DIALOG_SLOT_IMAGE_WIDTH,
    );
    boxText.setOrigin(0.5, 0.5);
    scene.add.existing(boxText);

    // highlightable
    const boxHighlightable = BoxCreator.createHighlightable(scene, slotLeft, slotTop, slotWidth, slotHeight);
    boxHighlightable.onClick = () => {
      Save._callOnSaveMethod(scene, options, pageIndex, slotIndex);
    };
    const slotControls: SaveSlotControls = {
      boxHighlightable,
      box,
      image: undefined,
      label: boxText,
    };
    return slotControls;
  }

  private static onSaveCompleted(
    scene: Phaser.Scene,
    options: SaveOptions,
    pageIndex: number,
    slotIndex: number,
    textureName: string,
  ) {
    scene.game.scene.wake(scene);

    // re-create slot
    // TODO: fix messy
    const testText = TextCreator.createSaveButtonText(
      scene,
      0,
      0,
      'fq\r\nfq',
      AspectConstants.SAVE_DIALOG_SLOT_IMAGE_WIDTH,
    );
    const titleTextValue = 'SAVE-âÂ – ăÂ – țȚ – îÎ – șȘ';
    const dialogWidth = Save._getDialogWidth();
    const titleText = TextCreator.createTitleText(scene, 0, 0, titleTextValue, dialogWidth);
    const dialogHeight = Save._getDialogHeight(titleText.height, testText.height);

    const shapeLeft = (1920 - dialogWidth) / 2;
    const shapeTop = (1080 - dialogHeight) / 2;

    const areaLeft = shapeLeft /* shape.getLeft() */ + AspectConstants.SAVE_DIALOG_PADDING_H;
    const areaTop =
      shapeTop /* shape.getTop() */ +
      AspectConstants.SAVE_DIALOG_PADDING_V +
      titleText.height +
      AspectConstants.SAVE_DIALOG_SPACING_V;
    const slotTextHeight = testText.height;
    Save._saveSlotControls[slotIndex] = Save._createSaveSlot(
      scene,
      options,
      pageIndex,
      slotIndex,
      areaLeft,
      areaTop,
      slotTextHeight,
    );
  }

  private static _callOnSaveMethod(scene: Phaser.Scene, options: SaveOptions, pageIndex: number, slotIndex: number) {
    const controls = Save._saveSlotControls[slotIndex];
    if (controls) {
      controls.box.destroy(true);
      controls.boxHighlightable.destroy();
      controls.label.destroy();
      controls.image?.destroy();
    }
    scene.game.scene.sleep(scene);
    options.onSave(scene, options, pageIndex, slotIndex, Save.onSaveCompleted);
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
