import MyAutoAdvancer from '../../components/MyAutoAdvancer';
export default class AutoAdvancers {
    static createJumperSimple(scene, onClick, onShowMenu, onNavBack) {
        const customComponent = new MyAutoAdvancer(scene);
        customComponent.onClick = onClick;
        customComponent.onShowMenu = onShowMenu;
        customComponent.onNavBack = onNavBack;
        scene.add.existing(customComponent);
        return customComponent;
    }
}
//# sourceMappingURL=AutoAdvancers.js.map