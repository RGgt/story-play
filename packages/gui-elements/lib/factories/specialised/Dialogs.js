import MyPanel2 from '../../components/MyPanel2';
export default class Dialogs {
    static addBackgroundPanel(scene, width, height) {
        const customComponent = Dialogs.createPanel(scene, width, height);
        return customComponent;
    }
    static addBackgroundPanel2(scene, x, y, width, height) {
        const customComponent = new MyPanel2(scene);
        customComponent.init(x, y, width, height);
        scene.add.existing(customComponent);
        return customComponent;
    }
    static createPanel(scene, width, height) {
        const screenCenterX = scene.cameras.main.worldView.x + scene.cameras.main.width / 2;
        const screenCenterY = scene.cameras.main.worldView.y + scene.cameras.main.height / 2;
        const customComponent = new MyPanel2(scene);
        customComponent.init(screenCenterX - width / 2, screenCenterY - height / 2, width, height);
        scene.add.existing(customComponent);
        return customComponent;
    }
}
//# sourceMappingURL=Dialogs.js.map