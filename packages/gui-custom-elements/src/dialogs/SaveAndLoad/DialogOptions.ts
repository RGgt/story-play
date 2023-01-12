type SlotData = {
  isEmptySlot: boolean;
  emptySlotText: string;
  previewTexture: string;
  previewLabel: string;
  isAvailableSlot: boolean;
};
type PageSlots = {
  Slots: SlotData[];
};
type DialogOptions = {
  isSaveMode: boolean;
  activePageIndex: number;
  allSlots: PageSlots[];
  onClose: () => void;
  onPageChanged: (pageIndex: number) => void;
  onSaveToSlot: (pageIndex: number, slotIndex: number) => void;
  onLoadFromSlot: (pageIndex: number, slotIndex: number) => void;
};
export type { DialogOptions, PageSlots, SlotData };
