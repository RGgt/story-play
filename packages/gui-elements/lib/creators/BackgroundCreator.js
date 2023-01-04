class BackgroundCreator {
    static createBackgroundImage(scene, name) {
        const screenCenterX = scene.cameras.main.worldView.x + scene.cameras.main.width / 2;
        const screenCenterY = scene.cameras.main.worldView.y + scene.cameras.main.height / 2;
        const sprite = scene.add.sprite(screenCenterX, screenCenterY, name);
        return { sprite };
    }
    static createBackgroundImagePulsing(scene, name, config) {
        const screenCenterX = scene.cameras.main.worldView.x + scene.cameras.main.width / 2;
        const screenCenterY = scene.cameras.main.worldView.y + scene.cameras.main.height / 2;
        const sprite = scene.add.sprite(screenCenterX, screenCenterY, name);
        const pulseTween = scene.tweens.add({
            targets: sprite,
            scaleX: config.scale,
            scaleY: config.scale,
            ease: 'Sine.easeInOut',
            duration: config.speed,
            yoyo: config.yoyo,
            repeat: config.repeats, // repeat indefinitely
        });
        return { sprite, pulseTween };
    }
    static createBackgroundAnimation(scene, name, config) {
        const screenCenterX = scene.cameras.main.worldView.x + scene.cameras.main.width / 2;
        const screenCenterY = scene.cameras.main.worldView.y + scene.cameras.main.height / 2;
        const sprite = scene.add.sprite(screenCenterX, screenCenterY, name);
        const animationFrames = config.frames.map((frameName) => {
            return { key: frameName };
        });
        const animation = scene.anims.create({
            key: name,
            frames: animationFrames,
            frameRate: config.frameRate,
            repeat: config.repeats,
        });
        if (config.repeats < 0) {
            animation.repeat = -1;
        }
        sprite.play(name);
        return { sprite, animation };
    }
}
export { BackgroundCreator };
//# sourceMappingURL=BackgroundCreator.js.map