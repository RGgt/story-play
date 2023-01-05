import { BoxCreator, Button, ButtonCreator } from '@rggt/gui-elements';
import AspectConstants from '../../AspectConstants';

export type MainMenuOptions = {
  onBtnResume_Click?: () => void;
  btnResume_Text?: string;
  onBtn_1_Click?: () => void;
  btnBtn_1_Text?: string;
  onBtn_2_Click?: () => void;
  btnBtn_2_Text?: string;
  onBtn_3_Click?: () => void;
  btnBtn_3_Text?: string;
  onBtn_4_Click?: () => void;
  btnBtn_4_Text?: string;
  onBtn_5_Click?: () => void;
  btnBtn_5_Text?: string;
};
const mainMenuOptionsDefaults: MainMenuOptions = {
  onBtnResume_Click: undefined,
  btnResume_Text: 'Close',
  onBtn_1_Click: undefined,
  btnBtn_1_Text: 'New',
  onBtn_2_Click: undefined,
  btnBtn_2_Text: 'Save',
  onBtn_3_Click: undefined,
  btnBtn_3_Text: 'Load',
  onBtn_4_Click: undefined,
  btnBtn_4_Text: 'Quit',
  onBtn_5_Click: undefined,
  btnBtn_5_Text: '',
};
class MainMenu {
  public static createMainMenuDialog(scene: Phaser.Scene, options: MainMenuOptions = mainMenuOptionsDefaults) {
    const cleanOptions = { ...mainMenuOptionsDefaults, ...options };
    const dialogWidth = AspectConstants.DIALOG_WIDTH;
    const dialogHeight = MainMenu._calculateDialogHeight(cleanOptions);
    const shape = BoxCreator.createCentralPanelBox(scene, dialogWidth, dialogHeight);

    let buttonTop = shape.getTop() + AspectConstants.DIALOG_PADDING_V;
    let btnDetail: { button: Button; text: Phaser.GameObjects.Text };
    let buttonText: string;
    let buttonDisabled: boolean;

    const buttonWidth = AspectConstants.DIALOG_WIDTH - 2 * AspectConstants.DIALOG_PADDING_H;
    const buttonHeight = AspectConstants.DIALOG_BUTTON_HEIGHT;
    const screenCenterX = scene.cameras.main.worldView.x + scene.cameras.main.width / 2;

    // Create btnResume if text is not empty
    if (cleanOptions.btnResume_Text) {
      buttonText = cleanOptions.btnResume_Text;
      buttonDisabled = cleanOptions.onBtnResume_Click === undefined;
      btnDetail = ButtonCreator.addSimpleButton(
        scene,
        screenCenterX - buttonWidth / 2,
        buttonTop,
        buttonWidth,
        buttonHeight,
        buttonText,
        cleanOptions.onBtnResume_Click,
        buttonDisabled,
      );
      buttonTop = btnDetail.button.getBottom() + AspectConstants.DIALOG_PADDING_V;
    }

    // Create btn_1 if text is not empty
    if (cleanOptions.btnBtn_1_Text) {
      buttonText = cleanOptions.btnBtn_1_Text;
      buttonDisabled = cleanOptions.onBtn_1_Click === undefined;
      btnDetail = ButtonCreator.addSimpleButton(
        scene,
        screenCenterX - buttonWidth / 2,
        buttonTop,
        buttonWidth,
        buttonHeight,
        buttonText,
        cleanOptions.onBtn_1_Click,
        buttonDisabled,
      );
      buttonTop = btnDetail.button.getBottom() + AspectConstants.DIALOG_SPACING_V;
    }

    // Create btn_2 if text is not empty
    if (cleanOptions.btnBtn_2_Text) {
      buttonText = cleanOptions.btnBtn_2_Text;
      buttonDisabled = cleanOptions.onBtn_2_Click === undefined;
      btnDetail = ButtonCreator.addSimpleButton(
        scene,
        screenCenterX - buttonWidth / 2,
        buttonTop,
        buttonWidth,
        buttonHeight,
        buttonText,
        cleanOptions.onBtn_2_Click,
        buttonDisabled,
      );
      buttonTop = btnDetail.button.getBottom() + AspectConstants.DIALOG_SPACING_V;
    }

    // Create btn_3 if text is not empty
    if (cleanOptions.btnBtn_3_Text) {
      buttonText = cleanOptions.btnBtn_3_Text;
      buttonDisabled = cleanOptions.onBtn_3_Click === undefined;
      btnDetail = ButtonCreator.addSimpleButton(
        scene,
        screenCenterX - buttonWidth / 2,
        buttonTop,
        buttonWidth,
        buttonHeight,
        buttonText,
        cleanOptions.onBtn_3_Click,
        buttonDisabled,
      );
      buttonTop = btnDetail.button.getBottom() + AspectConstants.DIALOG_SPACING_V;
    }

    // Create btn_4 if text is not empty
    if (cleanOptions.btnBtn_4_Text) {
      buttonText = cleanOptions.btnBtn_4_Text;
      buttonDisabled = cleanOptions.onBtn_4_Click === undefined;
      btnDetail = ButtonCreator.addSimpleButton(
        scene,
        screenCenterX - buttonWidth / 2,
        buttonTop,
        buttonWidth,
        buttonHeight,
        buttonText,
        cleanOptions.onBtn_4_Click,
        buttonDisabled,
      );
      buttonTop = btnDetail.button.getBottom() + AspectConstants.DIALOG_SPACING_V;
    }

    // Create btn_5 if text is not empty
    if (cleanOptions.btnBtn_5_Text) {
      buttonText = cleanOptions.btnBtn_5_Text;
      buttonDisabled = cleanOptions.onBtn_5_Click === undefined;
      btnDetail = ButtonCreator.addSimpleButton(
        scene,
        screenCenterX - buttonWidth / 2,
        buttonTop,
        buttonWidth,
        buttonHeight,
        buttonText,
        cleanOptions.onBtn_5_Click,
        buttonDisabled,
      );
      buttonTop = btnDetail.button.getBottom() + AspectConstants.DIALOG_SPACING_V;
    }
  }

  private static _calculateDialogHeight(options: MainMenuOptions) {
    let dialogHeight = 2 * AspectConstants.DIALOG_PADDING_V;
    if (options.btnResume_Text) {
      dialogHeight += AspectConstants.DIALOG_BUTTON_HEIGHT + AspectConstants.DIALOG_PADDING_V;
    }
    let buttonAdded = false;
    if (options.btnBtn_1_Text) {
      buttonAdded = true;
      dialogHeight += AspectConstants.DIALOG_BUTTON_HEIGHT + AspectConstants.DIALOG_SPACING_V;
    }
    if (options.btnBtn_2_Text) {
      buttonAdded = true;
      dialogHeight += AspectConstants.DIALOG_BUTTON_HEIGHT + AspectConstants.DIALOG_SPACING_V;
    }
    if (options.btnBtn_3_Text) {
      buttonAdded = true;
      dialogHeight += AspectConstants.DIALOG_BUTTON_HEIGHT + AspectConstants.DIALOG_SPACING_V;
    }
    if (options.btnBtn_4_Text) {
      buttonAdded = true;
      dialogHeight += AspectConstants.DIALOG_BUTTON_HEIGHT + AspectConstants.DIALOG_SPACING_V;
    }
    if (options.btnBtn_5_Text) {
      buttonAdded = true;
      dialogHeight += AspectConstants.DIALOG_BUTTON_HEIGHT + AspectConstants.DIALOG_SPACING_V;
    }
    if (buttonAdded) {
      dialogHeight -= AspectConstants.DIALOG_SPACING_V;
    }
    return dialogHeight;
  }
}
export { MainMenu };
