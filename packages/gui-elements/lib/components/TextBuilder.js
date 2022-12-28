export default class TextBuilder {
    static createTitleText(scene, x, y, text, maxWidth) {
        const SHADOW_COLOR = '#000000';
        const SHADOW_BLUR = 4;
        const SHADOW_OFFSET_X = 4;
        const SHADOW_OFFSET_Y = 4;
        const TEXT_SIZE = '100px';
        const TEXT_FONT_FAMILY = 'SerifFont';
        const TEXT_COLOR = 'white';
        const TEXT_BACKGROUND_COLOR = 'transparent';
        const OUTLINE_THICKNESS = 8;
        const OUTLINE_COLOR = 'black';
        const ALIGNMENT = 'center';
        const COORD_TYPE = 'MiddleCenter';
        return TextBuilder.createCusomlyFormattedText(scene, x, y, text, maxWidth, SHADOW_COLOR, SHADOW_BLUR, SHADOW_OFFSET_X, SHADOW_OFFSET_Y, TEXT_SIZE, TEXT_FONT_FAMILY, TEXT_COLOR, TEXT_BACKGROUND_COLOR, OUTLINE_THICKNESS, OUTLINE_COLOR, ALIGNMENT, COORD_TYPE);
    }
    static createSubtitleTextAlignCenter(scene, x, y, text, maxWidth) {
        const SHADOW_COLOR = '#000000';
        const SHADOW_BLUR = 4;
        const SHADOW_OFFSET_X = 2;
        const SHADOW_OFFSET_Y = 2;
        const TEXT_SIZE = '36px';
        const TEXT_FONT_FAMILY = 'SerifFont';
        const TEXT_COLOR = 'white';
        const TEXT_BACKGROUND_COLOR = 'transparent';
        const OUTLINE_THICKNESS = 8;
        const OUTLINE_COLOR = 'black';
        const ALIGNMENT = 'center';
        const COORD_TYPE = 'TopCenter';
        return TextBuilder.createCusomlyFormattedText(scene, x, y, text, maxWidth, SHADOW_COLOR, SHADOW_BLUR, SHADOW_OFFSET_X, SHADOW_OFFSET_Y, TEXT_SIZE, TEXT_FONT_FAMILY, TEXT_COLOR, TEXT_BACKGROUND_COLOR, OUTLINE_THICKNESS, OUTLINE_COLOR, ALIGNMENT, COORD_TYPE);
    }
    static createSubtitleTextAlignRight(scene, x, y, text, maxWidth) {
        const SHADOW_COLOR = '#000000';
        const SHADOW_BLUR = 4;
        const SHADOW_OFFSET_X = 2;
        const SHADOW_OFFSET_Y = 2;
        const TEXT_SIZE = '36px';
        const TEXT_FONT_FAMILY = 'SerifFont';
        const TEXT_COLOR = 'white';
        const TEXT_BACKGROUND_COLOR = 'transparent';
        const OUTLINE_THICKNESS = 8;
        const OUTLINE_COLOR = 'black';
        const ALIGNMENT = 'right';
        const COORD_TYPE = 'TopRight';
        return TextBuilder.createCusomlyFormattedText(scene, x, y, text, maxWidth, SHADOW_COLOR, SHADOW_BLUR, SHADOW_OFFSET_X, SHADOW_OFFSET_Y, TEXT_SIZE, TEXT_FONT_FAMILY, TEXT_COLOR, TEXT_BACKGROUND_COLOR, OUTLINE_THICKNESS, OUTLINE_COLOR, ALIGNMENT, COORD_TYPE);
    }
    static createNarrationText(scene, x, y, text, maxWidth) {
        const SHADOW_COLOR = '#000000';
        const SHADOW_BLUR = 0;
        const SHADOW_OFFSET_X = 0;
        const SHADOW_OFFSET_Y = 0;
        const TEXT_SIZE = '36px';
        const TEXT_FONT_FAMILY = 'SerifFont';
        const TEXT_COLOR = 'white';
        const TEXT_BACKGROUND_COLOR = 'transparent';
        const OUTLINE_THICKNESS = 6;
        const OUTLINE_COLOR = 'black';
        const ALIGNMENT = 'left';
        const COORD_TYPE = 'TopLeft';
        return TextBuilder.createCusomlyFormattedText(scene, x, y, text, maxWidth, SHADOW_COLOR, SHADOW_BLUR, SHADOW_OFFSET_X, SHADOW_OFFSET_Y, TEXT_SIZE, TEXT_FONT_FAMILY, TEXT_COLOR, TEXT_BACKGROUND_COLOR, OUTLINE_THICKNESS, OUTLINE_COLOR, ALIGNMENT, COORD_TYPE);
    }
    static createScrollingLetterText(scene, x, y, text, maxWidth) {
        const SHADOW_COLOR = '#000000';
        const SHADOW_BLUR = 0;
        const SHADOW_OFFSET_X = 0;
        const SHADOW_OFFSET_Y = 0;
        const TEXT_SIZE = '36px';
        const TEXT_FONT_FAMILY = 'SerifFont';
        const TEXT_COLOR = 'white';
        const TEXT_BACKGROUND_COLOR = 'transparent';
        const OUTLINE_THICKNESS = 6;
        const OUTLINE_COLOR = 'black';
        const ALIGNMENT = 'center';
        const COORD_TYPE = 'TopCenter';
        return TextBuilder.createCusomlyFormattedText(scene, x, y, text, maxWidth, SHADOW_COLOR, SHADOW_BLUR, SHADOW_OFFSET_X, SHADOW_OFFSET_Y, TEXT_SIZE, TEXT_FONT_FAMILY, TEXT_COLOR, TEXT_BACKGROUND_COLOR, OUTLINE_THICKNESS, OUTLINE_COLOR, ALIGNMENT, COORD_TYPE);
    }
    static createSubtitleTextAlignLeft(scene, x, y, text, maxWidth) {
        const SHADOW_COLOR = '#000000';
        const SHADOW_BLUR = 4;
        const SHADOW_OFFSET_X = 2;
        const SHADOW_OFFSET_Y = 2;
        const TEXT_SIZE = '36px';
        const TEXT_FONT_FAMILY = 'SerifFont';
        const TEXT_COLOR = 'white';
        const TEXT_BACKGROUND_COLOR = 'transparent';
        const OUTLINE_THICKNESS = 8;
        const OUTLINE_COLOR = 'black';
        const ALIGNMENT = 'left';
        const COORD_TYPE = 'TopLeft';
        return TextBuilder.createCusomlyFormattedText(scene, x, y, text, maxWidth, SHADOW_COLOR, SHADOW_BLUR, SHADOW_OFFSET_X, SHADOW_OFFSET_Y, TEXT_SIZE, TEXT_FONT_FAMILY, TEXT_COLOR, TEXT_BACKGROUND_COLOR, OUTLINE_THICKNESS, OUTLINE_COLOR, ALIGNMENT, COORD_TYPE);
    }
    static createButtonText(scene, x, y, text, maxWidth) {
        const SHADOW_COLOR = '#000000';
        const SHADOW_BLUR = 0;
        const SHADOW_OFFSET_X = 0;
        const SHADOW_OFFSET_Y = 0;
        const TEXT_SIZE = '36px';
        const TEXT_FONT_FAMILY = 'SerifFont';
        const TEXT_COLOR = 'white';
        const TEXT_BACKGROUND_COLOR = 'transparent';
        const OUTLINE_THICKNESS = 2;
        const OUTLINE_COLOR = 'black';
        const ALIGNMENT = 'center';
        const COORD_TYPE = 'MiddleCenter';
        return TextBuilder.createCusomlyFormattedText(scene, x, y, text, maxWidth, SHADOW_COLOR, SHADOW_BLUR, SHADOW_OFFSET_X, SHADOW_OFFSET_Y, TEXT_SIZE, TEXT_FONT_FAMILY, TEXT_COLOR, TEXT_BACKGROUND_COLOR, OUTLINE_THICKNESS, OUTLINE_COLOR, ALIGNMENT, COORD_TYPE);
    }
    static createCusomlyFormattedText(scene, x, y, text, maxWidth, shadowColor, shadowBlur, shadowOffsetX, shadowOffsetY, textSize, textFontFamily, textColor, textBackgroundColor, outlineTickness, outlineColor, alignment, coords) {
        const SHADOW_COLOR = shadowColor;
        const SHADOW_BLUR = shadowBlur;
        const SHADOW_OFFSET_X = shadowOffsetX;
        const SHADOW_OFFSET_Y = shadowOffsetY;
        const TEXT_SIZE = textSize;
        const TEXT_FONT_FAMILY = textFontFamily;
        const TEXT_COLOR = textColor;
        const TEXT_BACKGROUND_COLOR = textBackgroundColor;
        const OUTLINE_THICKNESS = outlineTickness;
        const OUTLINE_COLOR = outlineColor;
        const ALIGNMENT = alignment;
        const textShadow = {
            offsetX: SHADOW_OFFSET_X,
            offsetY: SHADOW_OFFSET_Y,
            color: SHADOW_COLOR,
            blur: SHADOW_BLUR,
            fill: false,
            stroke: true,
        };
        const textWrapping = {
            // width: x * 2 - SHADOW_OFFSET_X * 2,
            width: maxWidth,
            useAdvancedWrap: true,
        };
        const textStyle = {
            fontSize: TEXT_SIZE,
            backgroundColor: TEXT_BACKGROUND_COLOR,
            fontFamily: TEXT_FONT_FAMILY,
            color: TEXT_COLOR,
            strokeThickness: OUTLINE_THICKNESS,
            stroke: OUTLINE_COLOR,
            shadow: textShadow,
            wordWrap: textWrapping,
            align: ALIGNMENT,
        };
        const customComponent = new Phaser.GameObjects.Text(scene, x, y, text, textStyle);
        switch (coords) {
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