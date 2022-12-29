export type TextCoordType = 'TopLeft' | 'MiddleCenter' | 'TopCenter' | 'TopRight';
export type TextStyle = {
  shadowColor: string;
  shadowBlur: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
  textSize: string;
  textFontFamily: string;
  textColor: string;
  textBackgroundColor: string;
  outlineTickness: number;
  outlineColor: string;
  alignment: string;
  coords: TextCoordType;
};
class TextCreator {
  public static createTitleText(scene: Phaser.Scene, x: number, y: number, text: string | string[], maxWidth: number) {
    const style: TextStyle = {
      shadowColor: '#000000',
      shadowBlur: 4,
      shadowOffsetX: 4,
      shadowOffsetY: 4,
      textSize: '36px',
      textFontFamily: 'SerifFont',
      textColor: 'white',
      textBackgroundColor: 'transparent',
      outlineTickness: 8,
      outlineColor: 'black',
      alignment: 'center',
      coords: 'MiddleCenter',
    };
    return TextCreator.createText(scene, x, y, text, maxWidth, style);
  }

  public static createSubtitleTextAlignCenter(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string | string[],
    maxWidth: number,
  ) {
    const style: TextStyle = {
      shadowColor: '#000000',
      shadowBlur: 4,
      shadowOffsetX: 2,
      shadowOffsetY: 2,
      textSize: '36px',
      textFontFamily: 'SerifFont',
      textColor: 'white',
      textBackgroundColor: 'transparent',
      outlineTickness: 8,
      outlineColor: 'black',
      alignment: 'center',
      coords: 'TopCenter',
    };
    return TextCreator.createText(scene, x, y, text, maxWidth, style);
  }

  public static createSubtitleTextAlignRight(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string | string[],
    maxWidth: number,
  ) {
    const style: TextStyle = {
      shadowColor: '#000000',
      shadowBlur: 4,
      shadowOffsetX: 2,
      shadowOffsetY: 2,
      textSize: '36px',
      textFontFamily: 'SerifFont',
      textColor: 'white',
      textBackgroundColor: 'transparent',
      outlineTickness: 8,
      outlineColor: 'black',
      alignment: 'right',
      coords: 'TopRight',
    };
    return TextCreator.createText(scene, x, y, text, maxWidth, style);
  }

  public static createNarrationText(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string | string[],
    maxWidth: number,
  ) {
    return TextCreator.createNarrationTextColored(scene, x, y, text, 'white', maxWidth);
  }

  public static createNarrationTextColored(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string | string[],
    textColor: string,
    maxWidth: number,
  ) {
    const style: TextStyle = {
      shadowColor: '#000000',
      shadowBlur: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      textSize: '36px',
      textFontFamily: 'SerifFont',
      textColor,
      textBackgroundColor: 'transparent',
      outlineTickness: 6,
      outlineColor: 'black',
      alignment: 'left',
      coords: 'TopLeft',
    };
    return TextCreator.createText(scene, x, y, text, maxWidth, style);
  }

  public static createScrollingLetterText(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string | string[],
    maxWidth: number,
  ) {
    const style: TextStyle = {
      shadowColor: '#000000',
      shadowBlur: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      textSize: '36px',
      textFontFamily: 'SerifFont',
      textColor: 'white',
      textBackgroundColor: 'transparent',
      outlineTickness: 6,
      outlineColor: 'black',
      alignment: 'center',
      coords: 'TopCenter',
    };
    return TextCreator.createText(scene, x, y, text, maxWidth, style);
  }

  public static createSubtitleTextAlignLeft(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string | string[],
    maxWidth: number,
  ) {
    const style: TextStyle = {
      shadowColor: '#000000',
      shadowBlur: 4,
      shadowOffsetX: 2,
      shadowOffsetY: 2,
      textSize: '36px',
      textFontFamily: 'SerifFont',
      textColor: 'white',
      textBackgroundColor: 'transparent',
      outlineTickness: 8,
      outlineColor: 'black',
      alignment: 'left',
      coords: 'TopLeft',
    };
    return TextCreator.createText(scene, x, y, text, maxWidth, style);
  }

  public static createButtonText(scene: Phaser.Scene, x: number, y: number, text: string | string[], maxWidth: number) {
    const style: TextStyle = {
      shadowColor: '#000000',
      shadowBlur: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      textSize: '36px',
      textFontFamily: 'SerifFont',
      textColor: 'white',
      textBackgroundColor: 'transparent',
      outlineTickness: 2,
      outlineColor: 'black',
      alignment: 'center',
      coords: 'MiddleCenter',
    };
    return TextCreator.createText(scene, x, y, text, maxWidth, style);
  }

  public static createText(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string | string[],
    maxWidth: number,
    style: TextStyle,
  ) {
    const textShadow: Phaser.Types.GameObjects.Text.TextShadow = {
      offsetX: style.shadowOffsetX,
      offsetY: style.shadowOffsetY,
      color: style.shadowColor,
      blur: style.shadowBlur,
      fill: false,
      stroke: true,
    };
    const textWrapping: Phaser.Types.GameObjects.Text.TextWordWrap = {
      width: maxWidth,
      useAdvancedWrap: true,
    };
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: style.textSize,
      backgroundColor: style.textBackgroundColor,
      fontFamily: style.textFontFamily,
      color: style.textColor,
      strokeThickness: style.outlineTickness,
      stroke: style.outlineColor,
      shadow: textShadow,
      wordWrap: textWrapping,
      align: style.alignment,
    };
    const customComponent = new Phaser.GameObjects.Text(scene, x, y, text, textStyle);
    switch (style.coords) {
      case 'TopLeft':
        customComponent.setOrigin(0.0, 0.0);
        break;
      case 'MiddleCenter':
        customComponent.setOrigin(0.5, 0.5);
        break;
      case 'TopCenter':
        customComponent.setOrigin(0.5, 0.0);
        break;
      case 'TopRight':
        customComponent.setOrigin(1, 0.0);
        break;

      default:
        throw new Error('Unknow coordinates system!');
    }
    return customComponent;
  }
}
export { TextCreator };
