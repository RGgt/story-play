import Phaser from 'phaser';
import {
  Save,
  DialogOptions,
  SaveLoadDialogComponents,
  Metrics,
} from '@rggt/gui-custom-elements';
import { SPScenes } from '../types/enums';

export default class SaveScene extends Phaser.Scene {
  constructor() {
    super(SPScenes.Save);
    this.events = new Phaser.Events.EventEmitter();
  }

  private _dialogComponents?: SaveLoadDialogComponents;

  private _options?: DialogOptions;

  create() {
    this._options = {
      isSaveMode: true,
      activePageIndex: 2,
      onClose: this.restoreSceneBellow.bind(this),
      onPageChanged: this.onPageChanged.bind(this),
      onLoadFromSlot: () => {},
      onSaveToSlot: this.onSaveToSlot.bind(this),
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
        SaveScene._createEmptyPageSlots(),
        SaveScene._createEmptyPageSlots(),
        SaveScene._createEmptyPageSlots(),
      ],
    };
    this._dialogComponents = Save.createSaveDialog(this, this._options);
  }

  onPageChanged(pageIndex: number) {
    if (!this._options || !this._dialogComponents) return;
    this._options.activePageIndex = pageIndex;
    this._dialogComponents = Save.UpdateOnPageChanges(
      this,
      this._dialogComponents,
      this._options,
    );
  }

  onSaveToSlot(pageIndex: number, slotIndex: number): void {
    if (!this._options || !this._dialogComponents) return;
    this.game.scene.sleep(this);
    // capture screenshot
    this.renderer.snapshot((snapshot) => {
      if (!this._options || !this._dialogComponents) return;
      const previewLabel = SaveScene._formatDateTime(
        new Date(),
        'yyyy-mm-dd,\r\nhh:ii:ss',
      );

      // draw the image on a canvas having the specified size
      // and the the image as dataURL.
      const dataURL = SaveScene.screenshotToBase64(
        snapshot as HTMLImageElement,
        Metrics.SLOT_IMAGE_WIDTH,
        Metrics.SLOT_IMAGE_HEIGHT,
      );
      // TODO: save dataURL
      const textureName = `savegame_screenshot_pg${pageIndex}_slot${slotIndex}`;
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.addEventListener('error', (e: ErrorEvent) => {
        // eslint-disable-next-line no-console
        console.log(`Error saving screenshot: ${e} || ${e.target}`, e, this);
        this.game.scene.wake(this);
      });

      image.addEventListener('load', () => {
        if (!this._options || !this._dialogComponents) return;
        this.game.scene.wake(this);
        this.textures.remove(textureName);
        this.textures.addImage(textureName, image);
        this._options.allSlots[pageIndex].Slots[slotIndex].isEmptySlot = false;
        this._options.allSlots[pageIndex].Slots[slotIndex].previewLabel =
          previewLabel;
        this._options.allSlots[pageIndex].Slots[slotIndex].previewTexture =
          textureName;
        this._options.activePageIndex = pageIndex;
        this._dialogComponents = Save.UpdateOnPageChanges(
          this,
          this._dialogComponents,
          this._options,
        );
        this.restoreSceneBellow();
      });
      image.src = dataURL;
    });
  }

  restoreSceneBellow() {
    const callerScene = this.data.get('callerScene');
    if (!callerScene) return;
    this.game.scene.resume(callerScene);
    this.game.scene.sleep(SPScenes.Save);
  }

  private static _createEmptyPageSlots() {
    return {
      Slots: [
        {
          emptySlotText: 'Free slot',
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
          emptySlotText: 'Free slot',
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
          emptySlotText: 'Free slot',
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
      ],
    };
  }

  private static _formatDateTime(date: Date, format: string) {
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
}
