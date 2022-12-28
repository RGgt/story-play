import MyAutoAdvancer from '../../components/MyAutoAdvancer';

export default class AutoAdvancers {
  public static createJumperSimple(
    scene: Phaser.Scene,
    onClick: undefined | (() => void),
    onShowMenu: undefined | (() => void),
    onNavBack: undefined | (() => void),
  ) {
    const customComponent = new MyAutoAdvancer(scene);
    customComponent.onClick = onClick;
    customComponent.onShowMenu = onShowMenu;
    customComponent.onNavBack = onNavBack;
    scene.add.existing(customComponent);
    return customComponent;
  }
}
