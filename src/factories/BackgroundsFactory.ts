export default class BackgroundsFactory {
  public static createBackgroundImage(scene: Phaser.Scene, name: string): [Phaser.GameObjects.Image] {
    const screenCenterX = scene.cameras.main.worldView.x + scene.cameras.main.width / 2;
    const screenCenterY = scene.cameras.main.worldView.y + scene.cameras.main.height / 2;
    const image = scene.add.image(screenCenterX, screenCenterY, name);
    return [image];
  }

  public static createBackgroundImagePulsing(
    scene: Phaser.Scene,
    name: string,
  ): [Phaser.GameObjects.Image, Phaser.Tweens.Tween] {
    const screenCenterX = scene.cameras.main.worldView.x + scene.cameras.main.width / 2;
    const screenCenterY = scene.cameras.main.worldView.y + scene.cameras.main.height / 2;
    const image = scene.add.image(screenCenterX, screenCenterY, name);
    const pulseTween = scene.tweens.add({
      targets: image, // the image to animate
      scaleX: 2.0, // the target scale along the x-axis
      scaleY: 2.0, // the target scale along the y-axis
      ease: 'Sine.easeInOut',
      duration: 2200,
      yoyo: true, // make the animation go back and forth
      repeat: -1, // repeat indefinitely
    });
    return [image, pulseTween];
  }

  public static createBackgroundImageAnimation(
    scene: Phaser.Scene,
    name: string,
    frames: string[],
    repeats = -1,
    frameRate = 8,
  ): [Phaser.GameObjects.Sprite, false | Phaser.Animations.Animation] {
    const screenCenterX = scene.cameras.main.worldView.x + scene.cameras.main.width / 2;
    const screenCenterY = scene.cameras.main.worldView.y + scene.cameras.main.height / 2;
    const sprite = scene.add.sprite(screenCenterX, screenCenterY, name);
    const animationFrames = frames.map((frameName) => {
      return { key: frameName };
    });
    const animation = scene.anims.create({
      key: name,
      frames: animationFrames,
      frameRate,
      repeat: repeats,
    });
    sprite.play(name);
    return [sprite, animation];
  }
}
