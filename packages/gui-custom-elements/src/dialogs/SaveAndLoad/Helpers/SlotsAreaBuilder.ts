import { SlotBuilder, SlotComponents } from './SlotBuilder';

class SlotsAreaBuilder {
  public static buildSlotsArea(
    scene: Phaser.Scene,
    onUseSlot: (slotIndex: number) => void,
  ) {
    const slotComponents: SlotComponents[] = [];

    slotComponents.push(
      SlotsAreaBuilder.buildSlotsAreaSlot(
        scene,
        0,
        true,
        'Free Slot',
        '',
        '',
        true,
        onUseSlot,
      ),
    );
    slotComponents.push(
      SlotsAreaBuilder.buildSlotsAreaSlot(
        scene,
        1,
        true,
        'Slot not available',
        '',
        '',
        false,
        onUseSlot,
      ),
    );
    slotComponents.push(
      SlotsAreaBuilder.buildSlotsAreaSlot(
        scene,
        2,
        true,
        'Free Slot',
        '',
        '',
        true,
        onUseSlot,
      ),
    );
    slotComponents.push(
      SlotsAreaBuilder.buildSlotsAreaSlot(
        scene,
        3,
        false,
        '',
        'SAMPLE_screenshot_0_5',
        'Slot not available',
        false,
        onUseSlot,
      ),
    );
    slotComponents.push(
      SlotsAreaBuilder.buildSlotsAreaSlot(
        scene,
        4,
        true,
        'Free Slot',
        '',
        '',
        true,
        onUseSlot,
      ),
    );
    slotComponents.push(
      SlotsAreaBuilder.buildSlotsAreaSlot(
        scene,
        5,
        false,
        '',
        'SAMPLE_screenshot_0_5',
        'Friday, October 15 2021\r\n23:42',
        true,
        onUseSlot,
      ),
    );
    return slotComponents;
  }

  private static buildSlotsAreaSlot(
    scene: Phaser.Scene,
    slotIndex: number,
    isEmptySlot: boolean,
    emptySlotText: string,
    previewTexture: string,
    previewLabel: string,
    isAvailableSlot: boolean,
    onUseSlot: (slotIndex: number) => void,
  ) {
    if (isEmptySlot)
      return SlotBuilder.buildEmptySlot(
        scene,
        slotIndex,
        emptySlotText,
        isAvailableSlot
          ? () => {
              onUseSlot(slotIndex);
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
            onUseSlot(slotIndex);
          }
        : undefined,
    );
  }
}
export { SlotsAreaBuilder };
