class TextCreator {
    static createTitleText(scene, x, y, text, maxWidth) {
        const style = {
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
    static createSubtitleTextAlignCenter(scene, x, y, text, maxWidth) {
        const style = {
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
    static createSubtitleTextAlignRight(scene, x, y, text, maxWidth) {
        const style = {
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
    static createNarrationText(scene, x, y, text, maxWidth) {
        return TextCreator.createNarrationTextColored(scene, x, y, text, 'white', maxWidth);
    }
    static createNarrationTextColored(scene, x, y, text, textColor, maxWidth) {
        const style = {
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
    static createScrollingLetterText(scene, x, y, text, maxWidth) {
        const style = {
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
    static createSubtitleTextAlignLeft(scene, x, y, text, maxWidth) {
        const style = {
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
    static createButtonText(scene, x, y, text, maxWidth) {
        const style = {
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
    static createText(scene, x, y, text, maxWidth, style) {
        const textShadow = {
            offsetX: style.shadowOffsetX,
            offsetY: style.shadowOffsetY,
            color: style.shadowColor,
            blur: style.shadowBlur,
            fill: false,
            stroke: true,
        };
        const textWrapping = {
            width: maxWidth,
            useAdvancedWrap: true,
        };
        const textStyle = {
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
//# sourceMappingURL=TextCreator.js.map