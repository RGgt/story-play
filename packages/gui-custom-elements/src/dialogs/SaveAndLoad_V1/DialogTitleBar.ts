import { Button, ButtonCreator, PanelBox } from '@rggt/gui-elements';
import AspectConstants from '../../AspectConstants';

class DialogTitleBar {
  public static createDialogTitleBar(scene: Phaser.Scene, shape: PanelBox, dialogWidth: number) {
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
    return { btnSave, btnLoad};;
  }
}
