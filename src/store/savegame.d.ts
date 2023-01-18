type SlotData = {
  isEmptySlot: boolean;
  emptySlotText: string;
  previewTexture: string;
  previewLabel: string;
  isAvailableSlot: boolean;
  gameData: GameMemoryData;
};
type PageSlots = {
  Slots: SlotData[];
};
export type { SlotData, PageSlots };
