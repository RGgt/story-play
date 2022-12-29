import Phaser from 'phaser';
import { MyButton, AspectConstants } from '@rggt/gui-elements';

// import MyButton from '../components/MyButton';
// import AspectConstants from '../factories/AspectConstants';
import SceneFiller from '../factories/SceneFiller';
import { SPScenes } from '../types/enums';
import Utilities from '../utilities';
// import GuiOverGame from './GuiOverGame';

export default class TitleScene extends Phaser.Scene {
  static readonly CURSOR = 'url(/assets/images/gui/cursor.cur), auto';

  private _testPulseTween: Phaser.Tweens.Tween | undefined;

  private _testSprite: Phaser.GameObjects.Sprite | undefined;

  private _testText: Phaser.GameObjects.Text | undefined;

  private _btnSetFullscreen: MyButton | undefined;

  private _btnSetWindowed: MyButton | undefined;

  private _screenshotSprite: Phaser.GameObjects.Sprite | undefined;

  private static _screenshotScaleFactor = 0.25;

  constructor() {
    super(SPScenes.Experimental);
  }

  setFullscreen = () => {
    document.getElementById('phaser')?.requestFullscreen();
    this.updateEnabledButons(true);
  };

  setWindowed = () => {
    document.exitFullscreen();
    this.updateEnabledButons(false);
  };

  // is something like: `data:image/png;base64,${base64Data}`
  private base64ToSprite = (base64DataUrl: string) => {
    // /////////////////////////////////////////////////
    // Alternative using addBase64:
    //
    // this.textures.once('addtexture', function () {
    //   this.add.image(400, 300, textureName);
    // }, this);
    // this.textures.addBase64(textureName, dataURL);
    // /////////////////////////////////////////////////
    const textureName = 'screenshot';
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.addEventListener('error', (e: ErrorEvent) => {
      console.log(`Error: ${e} || ${e.target}`, e, this);
    });

    image.addEventListener('load', () => {
      if (this._screenshotSprite) {
        this._screenshotSprite.destroy();
        this.textures.remove(textureName);
      }
      this.textures.remove(textureName);
      this.textures.addImage(textureName, image);

      const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
      const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
      this._screenshotSprite = this.add.sprite(screenCenterX, screenCenterY, textureName);
      this._screenshotSprite.setOrigin(0.0);
      this._screenshotSprite.setPosition(0, 1080 * (1 - TitleScene._screenshotScaleFactor));
    });
    image.src = base64DataUrl;
  };

  private static screenshotToBase64 = (screenshot: HTMLImageElement, targetWidth: number, targetHeight: number) => {
    const scaledDownCanvas = document.createElement('canvas') as HTMLCanvasElement;
    scaledDownCanvas.width = targetWidth;
    scaledDownCanvas.height = targetHeight;
    const context = scaledDownCanvas.getContext('2d') as CanvasRenderingContext2D;
    context.drawImage(
      screenshot,
      0,
      0,
      screenshot.width,
      screenshot.height,
      0,
      0,
      scaledDownCanvas.width,
      scaledDownCanvas.height,
    );

    return scaledDownCanvas.toDataURL();
  };

  setTakeScreenshot = () => {
    this.game.renderer.snapshot((snapshot) => {
      const targetWidth = 1920 * TitleScene._screenshotScaleFactor;
      const targetHeight = 1080 * TitleScene._screenshotScaleFactor;
      const dataURL = TitleScene.screenshotToBase64(snapshot as HTMLImageElement, targetWidth, targetHeight);
      this.base64ToSprite(dataURL);
    });
  };

  openHtmlModal = () => {
    // Create the modal window
    const dialog = document.getElementById('favDialog') as HTMLDialogElement;
    const cancelButton = document.getElementById('cancel') as HTMLButtonElement;
    const confirmButton = document.getElementById('confirm') as HTMLButtonElement;
    const languagesComboBox = document.getElementById('favLanguage') as HTMLSelectElement;
    cancelButton.addEventListener('click', () => {
      dialog.close('languageNotChosen');
      dialog.classList.remove('dialog-visible');
      dialog.classList.add('dialog-hidden');
      Utilities.restoreFocusToGame();
      this.scene.resume();
    });
    confirmButton.addEventListener('click', (event) => {
      event.preventDefault();
      dialog.close(languagesComboBox.value);
      dialog.classList.remove('dialog-visible');
      dialog.classList.add('dialog-hidden');
      Utilities.restoreFocusToGame();
      this.scene.resume();
    });
    this.scene.pause();
    dialog.classList.add('dialog-visible');
    dialog.classList.remove('dialog-hidden');
    dialog.showModal();
  };

  openMenu = () => {
    this.game.scene.run(SPScenes.MainMenu);
    this.game.scene.getScene(SPScenes.MainMenu).data.set('callerScene', SPScenes.Experimental);
    this.game.scene.pause(this);
    // this.game.scene.run(SPScenes.GuiOverGame);
    // const guiOverGame = this.game.scene.getScene(SPScenes.GuiOverGame) as GuiOverGame;
    // guiOverGame.data.set('callerScene', SPScenes.Experimental);
    // guiOverGame.showModal('main-menu');
    // this.game.scene.pause(this);
  };

  openNewStory = () => {
    this.scene.start('story-play');
  };

  cleanupBackground() {
    if (this._testPulseTween) {
      this._testPulseTween.stop();
      this._testPulseTween.remove();
    }
    if (this._testSprite) {
      this._testSprite.destroy();
      this.anims.remove('main');
    }
  }

  updateEnabledButons(fullscren: boolean) {
    this._btnSetWindowed?.setDisabled(!fullscren);
    this._btnSetFullscreen?.setDisabled(fullscren);
  }

  backgroundAsVoid = () => {
    this.cleanupBackground();
  };

  backgroundAsStatic = () => {
    this.cleanupBackground();
    ({ sprite: this._testSprite } = SceneFiller.PlaceBackgroundStatic(this, 'main'));
    this._testSprite.setDepth(-100);
  };

  backgroundAsPulsing = () => {
    this.cleanupBackground();
    const configDefault = { scale: 2.0, speed: 2200, repeats: -1, yoyo: true };
    ({ sprite: this._testSprite, pulseTween: this._testPulseTween } = SceneFiller.PlaceBackgroundPulsing(
      this,
      'main',
      configDefault,
    ));
    this._testSprite.setDepth(-100);
  };

  backgroundAsAnimation = () => {
    this.cleanupBackground();
    const frames = [
      'frame_1_08_10',
      'frame_1_08_11',
      'frame_1_08_12',
      'frame_1_08_13',
      'frame_1_08_14',
      'frame_1_08_15',
      'frame_1_08_16',
      'frame_1_08_17',
    ];
    const configDefault = { frames, repeats: -1, frameRate: 8, yoyo: false };
    ({ sprite: this._testSprite } = SceneFiller.PlaceBackgroundAnimdated(this, 'main', configDefault));
    this._testSprite.setDepth(-100);
  };

  create() {
    this.game.canvas.style.cursor = TitleScene.CURSOR;

    SceneFiller.PlaceTestDialogBackground(this, 100, 400, 1720, 400);

    let [b, t] = SceneFiller.PlaceTestButton(this, 100, 100, 'Fullscreen', this.setFullscreen, false);
    this._btnSetFullscreen = b;
    [b, t] = SceneFiller.PlaceTestButton(this, 520, 100, 'Windowed', this.setWindowed, true);
    this._btnSetWindowed = b;
    SceneFiller.PlaceTestButton(this, 940, 100, 'Screenshot', this.setTakeScreenshot, false);
    SceneFiller.PlaceTestButton(this, 100, 200, 'Open Modal', this.openHtmlModal);
    SceneFiller.PlaceTestButton(this, 520, 200, 'Open Menu', this.openMenu);
    SceneFiller.PlaceTestButton(this, 940, 200, 'Play Story', this.openNewStory);

    SceneFiller.PlaceTestButton(this, 100, 300, 'Static Backgorund', this.backgroundAsStatic);
    SceneFiller.PlaceTestButton(this, 520, 300, 'Pulsing Backgorund', this.backgroundAsPulsing);
    SceneFiller.PlaceTestButton(this, 940, 300, 'Animated Backgorund', this.backgroundAsAnimation);
    SceneFiller.PlaceTestButton(this, 1360, 300, 'No Backgorund', this.backgroundAsVoid);

    const title = SceneFiller.PlaceGameTitleText(this, 'Story Title\r\nThe quick brown fox\r\njumps over the lazy dog');
    const pos = title.getBottomCenter();
    const s1 = SceneFiller.PlaceGameSubtitleCenterText(
      this,
      'A story by Author\r\nThe quick brown fox jumps over the lazy dog',
      pos.y + AspectConstants.SCREEN_SPACING_V,
    );
    const posS1 = s1.getBottomCenter();
    const s2 = SceneFiller.PlaceGameSubtitleRightText(
      this,
      'A story by Author\r\nThe quick brown fox jumps over the lazy dog',
      posS1.y + AspectConstants.SCREEN_SPACING_V,
    );
    const posS2 = s2.getBottomCenter();
    const s3 = SceneFiller.PlaceGameSubtitleLeftText(
      this,
      'A story by Author\r\nThe quick brown fox jumps over the lazy dog',
      posS1.y + AspectConstants.SCREEN_SPACING_V,
    );
    const narrationText =
      'The quick brown fox jumps over the lazy dog urabitur non pulvinar ipsum. Duis sit amet dolor velit. Nulla facilisi. Donec quis ornare metus. Integer sit amet sem luctus, imperdiet risus id, accumsan mauris. Nullam nunc lorem, malesuada eget ante sit amet, lacinia maximus leo. Vestibulum tincidunt lacinia sem, aliquam accumsan nisi tristique in. ';
    SceneFiller.PlaceNarrationText(this, narrationText);

    const scrollingText =
      'The quick brown fox\r\njumps over the lazy dog\r\nurabitur non pulvinar ipsum. Duis sit amet dolor velit. Nulla facilisi. Donec quis ornare metus. Integer sit amet sem luctus, imperdiet risus id, accumsan mauris. Nullam nunc lorem, malesuada eget ante sit amet, lacinia maximus leo. Vestibulum tincidunt lacinia sem, aliquam accumsan nisi tristique in. Curabitur accumsan lacus nunc, vitae ultricies dui eleifend ut. Morbi eu consectetur mi, sed tincidunt dui. Sed sed velit sit amet ligula molestie fringilla. Suspendisse eget eros pretium, feugiat eros at, consequat nibh. Morbi ultricies dolor laoreet tristique lobortis.\r\nPraesent pellentesque augue non ultrices sagittis. Nullam tempus risus sed pretium pulvinar. Phasellus tincidunt dolor in velit viverra, non vulputate diam iaculis. Aenean ullamcorper fringilla enim, sit amet scelerisque quam egestas vel. Aliquam sit amet dictum mi. Praesent eget sem nisi. Nulla dui dolor, commodo eu mi sed, vestibulum vestibulum ligula.\r\nEtiam non viverra diam. Suspendisse non ex in lectus consectetur pharetra a eget eros. Integer cursus pharetra tincidunt. Mauris ut est nunc. Maecenas libero ex, pellentesque quis augue sed, mollis gravida augue. Nam semper eros sit amet felis scelerisque convallis. In hac habitasse platea dictumst. Nulla tincidunt eget lectus non fermentum. ';
    this._testText = SceneFiller.PlaceScrollingLetterText(this, scrollingText, 1920 / 2, 1080, 1920 * 0.7);
  }

  update(): void {
    if (this._testText && this._testText.scrollFactorY) {
      this._testText.y += this._testText.scrollFactorY;
      if (this._testText.height + this._testText.y < 0) {
        this._testText.destroy();
      }
    }
  }
}
