import Phaser from 'phaser';
import MyAutoAdvancer from '../components/MyAutoAdvancer';
import TextBuilder from '../components/TextBuilder';
import BackgroundsFactory from '../factories/BackgroundsFactory';

export default class StoryPlayScene extends Phaser.Scene {
  public storyFlowData: StoryFlowData | undefined;

  public translationData: TranslationData | undefined;

  public currentFrame: string | undefined;

  // private _backgroundImage: Phaser.GameObjects.Sprite | undefined;

  private _backgroundSprite: Phaser.GameObjects.Sprite | undefined;

  private _backgroundAnimation: Phaser.Animations.Animation | false = false;

  private _backgroundSpriteOld: Phaser.GameObjects.Sprite | undefined;

  private _backgroundPulseTween: Phaser.Tweens.Tween | undefined;

  private _backgroundFadeOutTween: Phaser.Tweens.Tween | undefined;

  // private _backgroundPSprite: Phaser.GameObjects.Sprite | undefined;

  private _AutoAdvancer: MyAutoAdvancer | undefined;

  private _narrationText: Phaser.GameObjects.Text | undefined;

  private _narrationRectangle: Phaser.GameObjects.Rectangle | undefined;

  private _StoryTitle: Phaser.GameObjects.Text | undefined;

  private _StorySubtitle_1: Phaser.GameObjects.Text | undefined;

  constructor() {
    super({ key: 'story-play' });
  }

  create() {
    // nothing
    this.storyFlowData = this.cache.json.get('story-flow') as StoryFlowData;
    this.translationData = this.cache.json.get('translation') as TranslationData;
    if (!this.currentFrame) this.currentFrame = this.storyFlowData.startingFrame;
    const frameData = StoryPlayScene.getFrameData(this.storyFlowData, this.currentFrame);
    this.renderFrame(frameData);
  }

  renderNewFrame(frame: string) {
    this.currentFrame = frame;
    if (!this.storyFlowData) throw new Error('No story data!');
    const frameData = StoryPlayScene.getFrameData(this.storyFlowData, this.currentFrame);
    this.renderFrame(frameData);
  }

  static getFrameData(storyFlowData: StoryFlowData, currentFrame: string) {
    const frameData = storyFlowData.frames.find((frame) => frame.code === currentFrame);
    if (!frameData) throw new Error('Invalid frame code!');
    return frameData;
  }

  renderFrame(frameData: FrameData) {
    frameData.components.forEach((value, index) => this.renderComponent(value, index));
  }

  renderComponent(componentData: ComponentData, index: number) {
    switch (componentData.code) {
      case 'background':
        this.renderBackground(componentData.data, index);
        break;
      case 'background-pulse':
        this.renderBackgroundPulse(componentData.data, componentData.config, index);
        break;
      case 'background-animate':
        this.renderBackgroundAnimate(componentData.data, componentData.config, index);
        break;
      case 'jumper':
        this.renderJumper(componentData.data);
        break;
      case 'narration':
        this.renderNarration(componentData.data, index);
        break;
      case 'story-title':
        this.renderStoryTitle(componentData.data, index);
        break;
      case 'story-subtitle-center':
        this.renderStorySubtitleCenter(componentData.data, index);
        break;
      default:
        throw new Error('Invalid component code!');
    }
  }

  renderBackground(data: string, index: number) {
    if (data == null) {
      this._backgroundFadeOutTween?.stop();
      this._backgroundSpriteOld?.destroy();
      this._backgroundSprite?.destroy();
      return;
    }
    if (this._backgroundPulseTween) {
      this._backgroundPulseTween.stop();
      this._backgroundPulseTween.remove();
    }
    if (this._backgroundSprite) {
      // if already fading (a past background change not finalized yet)
      if (this._backgroundFadeOutTween) {
        // stop transition finalize old transition first
        this._backgroundSpriteOld?.destroy();
        // Note: just stop it. onStop will call onComplete!
        this._backgroundFadeOutTween.stop();
      }
      // lift up old background
      const depthOld = this._backgroundSprite.depth + 5;
      this._backgroundSpriteOld = this._backgroundSprite;
      this._backgroundSpriteOld.setDepth(depthOld);
      // create new background below it
      [this._backgroundSprite] = BackgroundsFactory.createBackgroundImage(this, data);
      this._backgroundSprite.setDepth(index * 10);
      // fade out the old background
      this._backgroundFadeOutTween = this.tweens.add({
        targets: this._backgroundSpriteOld, // the image to animate
        alpha: { from: 1, to: 0 },
        ease: 'Cubic.EaseOut',
        duration: 1000,
        yoyo: false,
        repeat: 0, // no repeat
        onComplete: () => {
          if (this._backgroundFadeOutTween) {
            this._backgroundFadeOutTween.remove();
            this._backgroundFadeOutTween = undefined;
            this._backgroundSpriteOld?.destroy();
          }
        },
      });
    } else {
      [this._backgroundSprite] = BackgroundsFactory.createBackgroundImage(this, data);
      this._backgroundSprite.setDepth(index * 10);
    }
  }

  renderBackgroundPulse(data: string, config: object, index: number) {
    if (data == null) {
      this._backgroundFadeOutTween?.stop();
      this._backgroundSpriteOld?.destroy();
      this._backgroundSprite?.destroy();
      return;
    }
    if (this._backgroundPulseTween) {
      this._backgroundPulseTween.stop();
      this._backgroundPulseTween.remove();
    }
    if (this._backgroundSprite) {
      // if already fading (a past background change not finalized yet)
      if (this._backgroundFadeOutTween) {
        // stop transition finalize old transition first
        this._backgroundSpriteOld?.destroy();
        // Note: just stop it. onStop will call onComplete!
        this._backgroundFadeOutTween.stop();
      }
      // lift up old background
      const depthOld = this._backgroundSprite.depth + 5;
      this._backgroundSpriteOld = this._backgroundSprite;
      this._backgroundSpriteOld.setDepth(depthOld);
      // create new background below it
      // [this._backgroundImage] = BackgroundsFactory.createBackgroundImage(this, data);
      const configDefault = { scale: 2.0, speed: 2200, repeats: -1, yoyo: true };
      const newConfig = { ...configDefault, ...config };
      [this._backgroundSprite, this._backgroundPulseTween] = BackgroundsFactory.createBackgroundImagePulsing(
        this,
        data,
        newConfig,
      );

      this._backgroundSprite.setDepth(index * 10);
      // fade out the old background
      this._backgroundFadeOutTween = this.tweens.add({
        targets: this._backgroundSpriteOld, // the image to animate
        alpha: { from: 1, to: 0 },
        ease: 'Cubic.EaseOut',
        duration: 1000,
        yoyo: false,
        repeat: 0, // no repeat
        onComplete: () => {
          if (this._backgroundFadeOutTween) {
            this._backgroundFadeOutTween.remove();
            this._backgroundFadeOutTween = undefined;
            this._backgroundSpriteOld?.destroy();
          }
        },
      });
    } else {
      const configDefault = { scale: 2.0, speed: 2200, repeats: -1, yoyo: true };
      const newConfig = { ...configDefault, ...config };
      [this._backgroundSprite, this._backgroundPulseTween] = BackgroundsFactory.createBackgroundImagePulsing(
        this,
        data,
        newConfig,
      );

      this._backgroundSprite.setDepth(index * 10);
    }
  }

  renderBackgroundAnimate(data: string, config: object, index: number) {
    if (data == null) {
      this._backgroundFadeOutTween?.stop();
      this._backgroundSpriteOld?.destroy();
      this._backgroundSprite?.destroy();
      return;
    }
    if (this._backgroundPulseTween) {
      this._backgroundPulseTween.stop();
      this._backgroundPulseTween.remove();
    }
    if (this._backgroundSprite) {
      // if already fading (a past background change not finalized yet)
      if (this._backgroundFadeOutTween) {
        // stop transition finalize old transition first
        this._backgroundSpriteOld?.destroy();
        // Note: just stop it. onStop will call onComplete!
        this._backgroundFadeOutTween.stop();
      }
      // lift up old background
      const depthOld = this._backgroundSprite.depth + 5;
      this._backgroundSpriteOld = this._backgroundSprite;
      this._backgroundSpriteOld.setDepth(depthOld);
      // create new background below it
      // [this._backgroundImage] = BackgroundsFactory.createBackgroundImage(this, data);
      const strings: string[] = [];
      const configDefault = { frames: strings, repeats: -1, frameRate: 8, yoyo: false };
      const newConfig = { ...configDefault, ...config };
      [this._backgroundSprite, this._backgroundAnimation] = BackgroundsFactory.createBackgroundAnimation(
        this,
        'main',
        newConfig,
      );
      console.log(newConfig);

      this._backgroundSprite.setDepth(index * 10);
      // fade out the old background
      this._backgroundFadeOutTween = this.tweens.add({
        targets: this._backgroundSpriteOld, // the image to animate
        alpha: { from: 1, to: 0 },
        ease: 'Cubic.EaseOut',
        duration: 1000,
        yoyo: false,
        repeat: 0, // no repeat
        onComplete: () => {
          if (this._backgroundFadeOutTween) {
            this._backgroundFadeOutTween.remove();
            this._backgroundFadeOutTween = undefined;
            this._backgroundSpriteOld?.destroy();
          }
        },
      });
    } else {
      const strings: string[] = [];
      const configDefault = { frames: strings, repeats: -1, frameRate: 8, yoyo: false };
      const newConfig = { ...configDefault, ...config };
      [this._backgroundSprite, this._backgroundAnimation] = BackgroundsFactory.createBackgroundAnimation(
        this,
        'main',
        newConfig,
      );

      this._backgroundSprite.setDepth(index * 10);
    }
  }

  renderJumper(data: string) {
    if (data == null) {
      this._AutoAdvancer?.destroy();
      return;
    }
    const onClick = () => {
      this._AutoAdvancer?.destroy();
      this.renderNewFrame(data);
    };
    const customComponent = new MyAutoAdvancer(this);
    customComponent.onClick = onClick;
    this.add.existing(customComponent);
    this._AutoAdvancer = customComponent;
    this._AutoAdvancer.setDepth(Number.MAX_SAFE_INTEGER);
  }

  renderNarration(data: string, index: number) {
    this._narrationText?.destroy();
    this._narrationRectangle?.destroy();
    if (data == null) {
      return;
    }
    const text = this.getTranslation(data);
    const x = 100;
    const y = 1080 - 250;
    const customComponent = TextBuilder.addNarrationText(this, x, y, text, 1920 - 200);
    customComponent.setScrollFactor(0, -1);
    this._narrationRectangle = this.add.rectangle(0, y - 50, 1920, 250 + 50, 0x000000, 0.65);
    this._narrationRectangle.setOrigin(0, 0);
    this.add.existing(customComponent);
    this._narrationText = customComponent;
    this._narrationRectangle.setDepth(index * 10);
    this._narrationText.setDepth(index * 10 + 5);
  }

  getTranslation(data: string) {
    if (!this.translationData) throw new Error('No translation data!');
    let text = data;
    if (data in this.translationData) text = this.translationData[data];
    return text;
  }

  renderStoryTitle(data: string, index: number) {
    if (data == null) {
      this._StoryTitle?.destroy();
      return;
    }
    if (this._StoryTitle) {
      this._StoryTitle?.destroy();
    }
    const text = this.getTranslation(data);
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    const customComponent = TextBuilder.createTitleText(this, screenCenterX, screenCenterY, text, 1920);
    this.add.existing(customComponent);
    this._StoryTitle = customComponent;
    this._StoryTitle.setDepth(index * 10);
  }

  renderStorySubtitleCenter(data: string, index: number) {
    if (data == null) {
      this._StorySubtitle_1?.destroy();
      return;
    }
    if (this._StorySubtitle_1) {
      this._StorySubtitle_1?.destroy();
    }
    const text = this.getTranslation(data);
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    const x = screenCenterX;
    let y = screenCenterY;
    if (this._StoryTitle) {
      y = this._StoryTitle.getBottomCenter().y + 40;
    }
    const customComponent = TextBuilder.createSubtitleTextAlignCenter(this, x, y, text, 1920);
    this.add.existing(customComponent);
    this._StorySubtitle_1 = customComponent;
    this._StorySubtitle_1.setDepth(index * 10);
  }
}
