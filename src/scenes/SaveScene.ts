import Phaser from 'phaser';
import {
  Save,
  SaveOptions,
  SaveViewData,
  DialogOptions,
} from '@rggt/gui-custom-elements';
import { SPScenes } from '../types/enums';

export default class SaveScene extends Phaser.Scene {
  constructor() {
    super(SPScenes.Save);
    this.events = new Phaser.Events.EventEmitter();
  }

  private _savedData: SaveViewData[] = [
    { HasData: false, AutoText: 'dddd', ImageB64: 'ddd' },
    { HasData: false, AutoText: 'dddd', ImageB64: 'ddd' },
    { HasData: false, AutoText: 'dddd', ImageB64: 'ddd' },
    { HasData: false, AutoText: 'dddd', ImageB64: 'ddd' },
    { HasData: false, AutoText: 'dddd', ImageB64: 'ddd' },
    { HasData: false, AutoText: 'dddd', ImageB64: 'ddd' },
  ];

  create() {
    // const options: SaveOptions = {
    //   onSave: this.onSave.bind(this),
    //   getViewData: this.getViewData.bind(this),
    //   onClose: this.restoreSceneBellow.bind(this),
    // };
    const options: DialogOptions = {
      isSaveMode: true,
      activePageIndex: 1,
      onClose: () => {},
      onPageChanged: () => {},
      onLoadFromSlot: () => {},
      onSaveToSlot: () => {},
      allSlots: [
        {
          Slots: [
            {
              emptySlotText: 'Available slot',
              isAvailableSlot: true,
              isEmptySlot: true,
              previewLabel: '',
              previewTexture: '',
            },
            {
              emptySlotText: 'Free slot',
              isAvailableSlot: true,
              isEmptySlot: true,
              previewLabel: '',
              previewTexture: '',
            },
            {
              emptySlotText: 'Slot not available',
              isAvailableSlot: false,
              isEmptySlot: true,
              previewLabel: '',
              previewTexture: '',
            },
            {
              emptySlotText: '',
              isAvailableSlot: false,
              isEmptySlot: false,
              previewLabel: 'this save is damaged!',
              previewTexture: 'SAMPLE_screenshot_0_5',
            },
            {
              emptySlotText: '',
              isAvailableSlot: true,
              isEmptySlot: false,
              previewLabel: 'Friday, October 15 2021\r\n23:42',
              previewTexture: 'SAMPLE_screenshot_0_5',
            },
            {
              emptySlotText: '',
              isAvailableSlot: true,
              isEmptySlot: false,
              previewLabel: 'Friday, October 15 2021\r\n23:48',
              previewTexture: 'SAMPLE_screenshot_0_5',
            },
          ],
        },
        {
          Slots: [
            {
              emptySlotText: 'Did you know you are on page 2?',
              isAvailableSlot: true,
              isEmptySlot: true,
              previewLabel: '',
              previewTexture: '',
            },
            {
              emptySlotText: 'Free slot',
              isAvailableSlot: true,
              isEmptySlot: true,
              previewLabel: '',
              previewTexture: '',
            },
            {
              emptySlotText: 'Slot not available',
              isAvailableSlot: false,
              isEmptySlot: true,
              previewLabel: '',
              previewTexture: '',
            },
            {
              emptySlotText: '',
              isAvailableSlot: false,
              isEmptySlot: false,
              previewLabel: 'this save is damaged!',
              previewTexture: 'SAMPLE_screenshot_0_5',
            },
            {
              emptySlotText: '',
              isAvailableSlot: true,
              isEmptySlot: false,
              previewLabel: 'Friday, October 15 2021\r\n23:42',
              previewTexture: 'SAMPLE_screenshot_0_5',
            },
            {
              emptySlotText: '',
              isAvailableSlot: true,
              isEmptySlot: false,
              previewLabel: 'Friday, October 15 2021\r\n23:48',
              previewTexture: 'SAMPLE_screenshot_0_5',
            },
          ],
        },
      ],
    };
    Save.createSaveDialog(this, options);
  }

  restoreSceneBellow() {
    const callerScene = this.data.get('callerScene');
    if (!callerScene) return;
    this.game.scene.resume(callerScene);
    this.game.scene.sleep(SPScenes.Save);
  }

  onSave(
    scene: Phaser.Scene,
    options: SaveOptions,
    pageIndex: number,
    slotIndex: number,
    callbak: (
      scene: Phaser.Scene,
      options: SaveOptions,
      pageIndex: number,
      slotIndex: number,
      textureName: string,
    ) => void,
  ) {
    this._savedData[slotIndex].HasData = true;
    this._tempSave(scene, options, pageIndex, slotIndex, callbak);
    return;
  }

  getViewData(page: number, slot: number): SaveViewData {
    return this._savedData[slot];
    // return { AutoText: 'Friday, October 15 2021, 23:42', ImageB64: 'base-64' };
  }

  private static _screenshotScaleFactor = 0.25;

  private _screenshotSprite: Phaser.GameObjects.Sprite | undefined;

  private static _formatDatetime(date: Date, format: string) {
    const padStart = (value: number): string =>
      value.toString().padStart(2, '0');
    return format
      .replace(/yyyy/g, padStart(date.getFullYear()))
      .replace(/dd/g, padStart(date.getDate()))
      .replace(/mm/g, padStart(date.getMonth() + 1))
      .replace(/hh/g, padStart(date.getHours()))
      .replace(/ii/g, padStart(date.getMinutes()))
      .replace(/ss/g, padStart(date.getSeconds()));
  }

  private _tempSave(
    scene: Phaser.Scene,
    options: SaveOptions,
    pageIndex: number,
    slotIndex: number,
    callbak: (
      scene: Phaser.Scene,
      options: SaveOptions,
      pageIndex: number,
      slotIndex: number,
      textureName: string,
    ) => void,
  ) {
    this.renderer.snapshot((snapshot) => {
      const targetWidth = 1920 * SaveScene._screenshotScaleFactor;
      const targetHeight = 1080 * SaveScene._screenshotScaleFactor;
      const dataURL = SaveScene.screenshotToBase64(
        snapshot as HTMLImageElement,
        targetWidth,
        targetHeight,
      );
      // this._savedData[slotIndex].AutoText = new Date().toLocaleString();
      this._savedData[slotIndex].AutoText = SaveScene._formatDatetime(
        new Date(),
        'yyyy-mm-dd,\r\nhh:ii:ss',
      );
      this.base64ToSprite(
        dataURL,
        scene,
        options,
        pageIndex,
        slotIndex,
        callbak,
      );
    });
  }

  private static screenshotToBase64 = (
    screenshot: HTMLImageElement,
    targetWidth: number,
    targetHeight: number,
  ) => {
    const scaledDownCanvas = document.createElement(
      'canvas',
    ) as HTMLCanvasElement;
    scaledDownCanvas.width = targetWidth;
    scaledDownCanvas.height = targetHeight;
    const context = scaledDownCanvas.getContext(
      '2d',
    ) as CanvasRenderingContext2D;
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

  private base64ToSprite = (
    base64DataUrl: string,
    scene: Phaser.Scene,
    options: SaveOptions,
    pageIndex: number,
    slotIndex: number,
    callbak: (
      scene: Phaser.Scene,
      options: SaveOptions,
      pageIndex: number,
      slotIndex: number,
      textureName: string,
    ) => void,
  ) => {
    // /////////////////////////////////////////////////
    // Alternative using addBase64:
    //
    // this.textures.once('addtexture', function () {
    //   this.add.image(400, 300, textureName);
    // }, this);
    // this.textures.addBase64(textureName, dataURL);
    // /////////////////////////////////////////////////
    const textureName = `screenshot_${pageIndex}_${slotIndex}`;
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

      const screenCenterX =
        this.cameras.main.worldView.x + this.cameras.main.width / 2;
      const screenCenterY =
        this.cameras.main.worldView.y + this.cameras.main.height / 2;
      this._screenshotSprite = this.add.sprite(
        screenCenterX,
        screenCenterY,
        textureName,
      );
      this._screenshotSprite.setOrigin(0.0);
      this._screenshotSprite.setPosition(
        0,
        1080 * (1 - SaveScene._screenshotScaleFactor),
      );
      callbak?.(scene, options, pageIndex, slotIndex, textureName);
    });
    image.src = base64DataUrl;
  };

  private base64ToSprite_OLD = (
    base64DataUrl: string,
    pageIndex: number,
    slotIndex: number,
  ) => {
    // /////////////////////////////////////////////////
    // Alternative using addBase64:
    //
    // this.textures.once('addtexture', function () {
    //   this.add.image(400, 300, textureName);
    // }, this);
    // this.textures.addBase64(textureName, dataURL);
    // /////////////////////////////////////////////////
    const textureName = `screenshot_${pageIndex}_${slotIndex}`;
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
      console.log(`writting screenshot_${pageIndex}_${slotIndex}`);

      const screenCenterX =
        this.cameras.main.worldView.x + this.cameras.main.width / 2;
      const screenCenterY =
        this.cameras.main.worldView.y + this.cameras.main.height / 2;
      this._screenshotSprite = this.add.sprite(
        screenCenterX,
        screenCenterY,
        textureName,
      );
      this._screenshotSprite.setOrigin(0.0);
      this._screenshotSprite.setPosition(
        0,
        1080 * (1 - SaveScene._screenshotScaleFactor),
      );
    });
    image.src = base64DataUrl;
  };
}
