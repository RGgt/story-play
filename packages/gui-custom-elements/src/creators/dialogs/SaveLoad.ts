import { BoxCreator, Button, ButtonCreator, GroupBox, Perimeter, TextCreator } from "@rggt/gui-elements";
import AspectConstants from "../../AspectConstants";

export type SaveOptions = {
  onSave: (page: number, slot: number) => void;
  onClose: () => void;
  getViewData: (page: number, slot: number) => SaveViewData;
};
export type SaveViewData = {
  AutoText: string;
  ImageB64: string;
};

class Save {
  public static createSaveDialog(scene: Phaser.Scene, options: SaveOptions) {
    const dialogWidth = 1920 * 2 / 3;
    const dialogHeight = Save._calculateDialogHeight();
    const shape = BoxCreator.createCentralPanelBox(scene, dialogWidth, dialogHeight);

    let buttonTop = shape.getTop() + AspectConstants.DIALOG_PADDING_V;
    let buttonLeft = shape.getLeft() + AspectConstants.DIALOG_PADDING_H;
    const buttonWidth = (dialogWidth - 2 * AspectConstants.DIALOG_PADDING_H - 2 * AspectConstants.DIALOG_SPACING_V) / 3;
    const buttonHeight = 300;
    const titleText = TextCreator.createTitleText(scene, buttonLeft + dialogWidth / 2, buttonTop, 'SAVE', buttonWidth);
    titleText.setOrigin(1, 0.5);
    scene.add.existing(titleText);
    buttonTop += titleText.height;

    let boxPerimeter = BoxCreator.createPerimeter(scene, buttonLeft, buttonTop, buttonWidth, buttonHeight);
    boxPerimeter.reactToClick = options.onClose;
    let boxText = TextCreator.createSaveButtonText(scene, buttonLeft + buttonWidth / 2, buttonTop + buttonHeight, 'Friday, October 15 2021, \r\n23:42', buttonWidth);
    boxText.setOrigin(0.5, 1.4);
    scene.add.existing(boxText);
    const sprite = scene.add.sprite(buttonLeft + 25, buttonTop + 25, 'frame_1_08_10');
    sprite.setOrigin(0, 0);
    sprite.setScale((buttonWidth - 50) / 1920, (buttonHeight - 125) / 1080);
    let box = BoxCreator.createGroupBox(scene, buttonLeft, buttonTop, buttonWidth, buttonHeight);

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

  private static _calculateDialogHeight() {
    let dialogHeight = 2 * AspectConstants.DIALOG_PADDING_V;
    dialogHeight += 1 * AspectConstants.DIALOG_SPACING_V + 2 * 300;
    return dialogHeight;
  }
}
export { Save };
