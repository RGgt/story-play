// import Phaser from 'phaser';
import MyButton from '../../components/MyButton';
import { TextCreator } from '../../creators/TextCreator';
// import TextBuilder from '../../components/TextBuilder';
export default class Buttons {
    static addGenericButton(scene, x, y, width, height, text, onClick, disabled) {
        const customComponent = Buttons.createButton(scene, x, y, width, height, onClick);
        customComponent.setDisabled(disabled);
        const textObject = this.addButtonText(scene, customComponent, text, width);
        return [customComponent, textObject];
    }
    static createButton(scene, x, y, width, height, onClick) {
        const customComponent = new MyButton(scene);
        customComponent.init(x, y, width, height);
        customComponent.onClick = onClick;
        scene.add.existing(customComponent);
        return customComponent;
    }
    static addButtonText(scene, button, text, maxWidth) {
        const center = button.getCenter();
        const customComponent = TextCreator.createButtonText(scene, center.x, center.y, text, maxWidth);
        scene.add.existing(customComponent);
        return customComponent;
    }
}
//# sourceMappingURL=Buttons.js.map