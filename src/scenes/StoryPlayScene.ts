import Phaser from 'phaser';
import MyAutoAdvancer from '../components/MyAutoAdvancer';
import SceneFiller from '../factories/SceneFiller';
import { SPScenes } from '../types/enums';

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
    super({ key: SPScenes.StoryPlay });
  }

  create() {
    // nothing
    this.storyFlowData = this.cache.json.get('story-flow') as StoryFlowData;
    this.translationData = this.cache.json.get('translation') as TranslationData;
    if (!this.currentFrame) this.currentFrame = this.storyFlowData.startingFrame;
    this.navigateForward(this.currentFrame);

    this.game.events.on('restart', () => {
      // do something with the data received from the event
      this.cleanup();
      this.restartGame();
    });
  }

  restartGame() {
    if (this.storyFlowData) {
      this.currentFrame = this.storyFlowData.startingFrame;
      const frameData = StoryPlayScene.getFrameData(this.storyFlowData, this.currentFrame);
      this.renderFrame(frameData);
    }
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
      [this._backgroundSprite] = SceneFiller.PlaceBackgroundStatic(this, data);
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
      [this._backgroundSprite] = SceneFiller.PlaceBackgroundStatic(this, data);
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
      const configDefault = { scale: 2.0, speed: 2200, repeats: -1, yoyo: true };
      const newConfig = { ...configDefault, ...config };
      [this._backgroundSprite, this._backgroundPulseTween] = SceneFiller.PlaceBackgroundPulsing(this, data, newConfig);

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
      [this._backgroundSprite, this._backgroundPulseTween] = SceneFiller.PlaceBackgroundPulsing(this, data, newConfig);

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
      const strings: string[] = [];
      const configDefault = { frames: strings, repeats: -1, frameRate: 8, yoyo: false };
      const newConfig = { ...configDefault, ...config };
      [this._backgroundSprite, this._backgroundAnimation] = SceneFiller.PlaceBackgroundAnimdated(
        this,
        'main',
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
      const strings: string[] = [];
      const configDefault = { frames: strings, repeats: -1, frameRate: 8, yoyo: false };
      const newConfig = { ...configDefault, ...config };
      [this._backgroundSprite, this._backgroundAnimation] = SceneFiller.PlaceBackgroundAnimdated(
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
      this.navigateForward(data);
    };
    const openMenu = () => {
      this.game.scene.run(SPScenes.MainMenu);
      this.game.scene.getScene(SPScenes.MainMenu).data.set('callerScene', SPScenes.StoryPlay);
      this.game.scene.pause(this);
    };

    const onNavBack = () => {
      this.navigateBack();
    };

    this._AutoAdvancer = SceneFiller.PlaceJumperWithMenuAndNavBack(this, onClick, openMenu, onNavBack);
    this._AutoAdvancer.setDepth(Number.MAX_SAFE_INTEGER);
  }

  navigateLoadFrameDirectly(frame: string) {
    const { gameData } = this.game as SPGame;
    if (gameData) {
      gameData.framesHistory = [] as string[];
    }
    this.renderNewFrame(frame);
  }

  navigateForward(frame: string) {
    const { gameData } = this.game as SPGame;
    if (gameData) {
      gameData.framesHistory.push(frame);
    }
    this._AutoAdvancer?.destroy();
    this.renderNewFrame(frame);
  }

  navigateBack() {
    const { gameData } = this.game as SPGame;
    if (gameData) {
      if (gameData.framesHistory.length > 1) {
        gameData.framesHistory.pop();
        // it's ok to pop it, as rendering will add it back
        const frame = gameData.framesHistory[gameData.framesHistory.length - 1];
        if (frame) {
          this._AutoAdvancer?.destroy();
          this.cleanup();
          this.renderNewFrame(frame);
        }
      } else if (gameData.framesHistory.length === 1) {
        const frame = gameData.framesHistory[0];
        this.cleanup();
        this.renderNewFrame(frame);
      }
    }
  }

  renderNarration(data: string, index: number) {
    this._narrationText?.destroy();
    this._narrationRectangle?.destroy();
    if (data == null) {
      return;
    }
    const text = this.getTranslation(data);
    const [customComponent, rectangle] = SceneFiller.PlaceNarrationText(this, text);
    this._narrationRectangle = rectangle;
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
    this._StoryTitle = SceneFiller.PlaceGameTitleText(this, text);
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
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    let y = screenCenterY;
    if (this._StoryTitle) {
      y = this._StoryTitle.getBottomCenter().y + 40;
    }
    const customComponent = SceneFiller.PlaceGameSubtitleCenterText(this, text, y);
    this._StorySubtitle_1 = customComponent;
    this._StorySubtitle_1.setDepth(index * 10);
  }

  cleanup() {
    this._backgroundFadeOutTween?.remove();
    this._backgroundSpriteOld?.destroy();
    this._backgroundSprite?.destroy();
    this._backgroundPulseTween?.remove();
    this._AutoAdvancer?.destroy();
    this._StorySubtitle_1?.destroy();
    this._StoryTitle?.destroy();
    this._narrationText?.destroy();
  }
}
