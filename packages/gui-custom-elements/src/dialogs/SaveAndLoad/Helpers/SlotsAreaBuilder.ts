import { SlotData } from '../DialogOptions';
import { SlotBuilder, SlotComponents } from './SlotBuilder';

class SlotsAreaBuilder {
  public static buildSlotsArea(
    scene: Phaser.Scene,
    pageIndex: number,
    onUseSlot: (pageIndex: number, slotIndex: number) => void,
    slotsData: SlotData[],
  ) {
    const result = slotsData.map((value, index) => {
      return SlotsAreaBuilder.buildSlotsAreaSlot(
        scene,
        pageIndex,
        index,
        value.isEmptySlot,
        value.emptySlotText,
        value.previewTexture,
        value.previewLabel,
        value.isAvailableSlot,
        onUseSlot,
      );
    });
    return result;
  }

  private static buildSlotsAreaSlot(
    scene: Phaser.Scene,
    pageIndex: number,
    slotIndex: number,
    isEmptySlot: boolean,
    emptySlotText: string,
    previewTexture: string,
    previewLabel: string,
    isAvailableSlot: boolean,
    onUseSlot: (pageIndex: number, slotIndex: number) => void,
  ) {
    if (isEmptySlot)
      return SlotBuilder.buildEmptySlot(
        scene,
        slotIndex,
        emptySlotText,
        isAvailableSlot
          ? () => {
              onUseSlot(pageIndex, slotIndex);
            }
          : undefined,
      );
    return SlotBuilder.buildFilledSlot(
      scene,
      slotIndex,
      previewTexture,
      previewLabel,
      isAvailableSlot
        ? () => {
            onUseSlot(pageIndex, slotIndex);
          }
        : undefined,
    );
  }

  public static destroySlotsArea(components: SlotComponents[]) {
    components.forEach((component) => {
      component.slotBox.destroy();
      component.slotHighlightable.destroy();
      component.slotLargeText?.destroy();
      component.slotPreviewImage?.destroy();
      component.slotPreviewLabel?.destroy();
    });
  }
}
export { SlotsAreaBuilder };
