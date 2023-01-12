class Metrics {
  public static readonly SCREEN_WIDTH = 1920;

  public static readonly SCREEN_HEIGHT = 1080;

  public static readonly PAGINATION_AREA_HEIGHT = 75;

  public static readonly PAGINATION_AREA_SLOTS_COUNT = 5;

  public static readonly PAGINATION_AREA_SLOT_WIDTH = 100;

  public static readonly PAGINATION_AREA_SPACING_HORIZONTAL = 24;

  public static readonly CLOSE_BUTTON_HEIGHT = 120;

  public static readonly TITLE_HEIGHT = 60;

  public static readonly PADDING_HORIZONTAL = 12 + 25;

  public static readonly PADDING_VERTICAL = 24;

  public static readonly SPACING_HORIZONTAL = 24;

  public static readonly SPACING_VERTICAL = 24;

  public static readonly SLOT_IMAGE_WIDTH = 384;

  public static readonly SLOT_IMAGE_HEIGHT = 216;

  public static readonly SLOT_PADDING_HORIZONTAL = 8;

  public static readonly SLOT_PADDING_VERTICAL = 8;

  public static readonly SLOT_SPACING_VERTICAL = 8;

  public static readonly SLOT_SPACING_HORIZONTAL = 8;

  public static readonly SLOT_TEXT_AREA_HEIGHT = 50;

  public static readonly SLOT_HEIGHT =
    Metrics.SLOT_PADDING_VERTICAL +
    Metrics.SLOT_IMAGE_HEIGHT +
    Metrics.SLOT_SPACING_VERTICAL +
    Metrics.SLOT_TEXT_AREA_HEIGHT +
    Metrics.SLOT_PADDING_VERTICAL;

  public static readonly SLOT_WIDTH =
    Metrics.SLOT_PADDING_HORIZONTAL +
    Metrics.SLOT_IMAGE_WIDTH +
    Metrics.SLOT_PADDING_HORIZONTAL;

  public static readonly SLOTS_AREA_HEIGHT =
    2 * Metrics.SLOT_HEIGHT + Metrics.SPACING_VERTICAL;

  public static readonly SLOTS_AREA_WIDTH =
    3 * Metrics.SLOT_WIDTH + 2 * Metrics.SPACING_HORIZONTAL;

  public static readonly WINDOW_WIDTH =
    Metrics.PADDING_HORIZONTAL +
    Metrics.SLOTS_AREA_WIDTH +
    Metrics.PADDING_HORIZONTAL;

  public static readonly WINDOW_HEIGHT =
    Metrics.PADDING_VERTICAL +
    Metrics.TITLE_HEIGHT +
    Metrics.SPACING_VERTICAL +
    Metrics.SLOTS_AREA_HEIGHT +
    Metrics.SPACING_VERTICAL +
    Metrics.CLOSE_BUTTON_HEIGHT +
    Metrics.SPACING_VERTICAL +
    Metrics.PAGINATION_AREA_HEIGHT +
    Metrics.PADDING_VERTICAL;

  public static readonly WINDOW_LEFT =
    (Metrics.SCREEN_WIDTH - Metrics.WINDOW_WIDTH) / 2;

  public static readonly WINDOW_TOP =
    (Metrics.SCREEN_HEIGHT - Metrics.WINDOW_HEIGHT) / 2;

  public static readonly TITLE_LEFT =
    Metrics.WINDOW_LEFT + Metrics.PADDING_HORIZONTAL;

  public static readonly TITLE_TOP =
    Metrics.WINDOW_TOP + Metrics.PADDING_VERTICAL;

  public static readonly TITLE_WIDTH = Metrics.SLOTS_AREA_WIDTH;

  public static readonly SLOTS_AREA_LEFT =
    Metrics.WINDOW_LEFT + Metrics.PADDING_HORIZONTAL;

  public static readonly SLOTS_AREA_TOP =
    Metrics.TITLE_TOP + Metrics.TITLE_HEIGHT + Metrics.SPACING_VERTICAL;

  public static readonly PAGINATION_AREA_WIDTH = Metrics.SLOTS_AREA_WIDTH;

  public static readonly PAGINATION_AREA_LEFT =
    Metrics.WINDOW_LEFT + Metrics.PADDING_HORIZONTAL;

  public static readonly PAGINATION_AREA_TOP =
    Metrics.SLOTS_AREA_TOP +
    Metrics.SLOTS_AREA_HEIGHT +
    Metrics.SPACING_VERTICAL;

  public static readonly CLOSE_BUTTON_WIDTH = Metrics.SLOTS_AREA_WIDTH;

  public static readonly CLOSE_BUTTON_LEFT =
    Metrics.WINDOW_LEFT + Metrics.PADDING_HORIZONTAL;

  public static readonly CLOSE_BUTTON_TOP =
    Metrics.PAGINATION_AREA_TOP +
    Metrics.PAGINATION_AREA_HEIGHT +
    Metrics.SPACING_VERTICAL;

  public static readonly SLOT_TEXT_AREA_WIDTH = Metrics.SLOT_IMAGE_WIDTH;

  public static readonly IN_SLOT_IMAGE_LEFT = Metrics.SLOT_PADDING_HORIZONTAL;

  public static readonly IN_SLOT_IMAGE_TOP = Metrics.SLOT_PADDING_VERTICAL;

  public static readonly IN_SLOT_TEXT_AREA_TOP =
    Metrics.IN_SLOT_IMAGE_TOP + Metrics.SLOT_IMAGE_HEIGHT;

  public static readonly IN_SLOT_TEXT_AREA_LEFT =
    Metrics.SLOT_PADDING_HORIZONTAL;

  public static readonly SLOT_LARGE_TEXT_AREA_WIDTH = Metrics.SLOT_IMAGE_WIDTH;

  public static readonly SLOT_LARGE_TEXT_AREA_HEIGHT =
    Metrics.SLOT_HEIGHT - 2 * Metrics.SLOT_PADDING_VERTICAL;

  public static readonly IN_SLOT_LARGE_TEXT_AREA_LEFT =
    Metrics.SLOT_PADDING_HORIZONTAL;

  public static readonly IN_SLOT_LARGE_TEXT_AREA_TOP =
    Metrics.SLOT_PADDING_VERTICAL;

  public static getSlotLeft(slotIndex: number) {
    const index = slotIndex % 3;
    return (
      Metrics.SLOTS_AREA_LEFT +
      index * (Metrics.SLOT_WIDTH + Metrics.SPACING_HORIZONTAL)
    );
  }

  public static getSlotTop(slotIndex: number) {
    const index = slotIndex - (slotIndex % 3);
    return (
      Metrics.SLOTS_AREA_TOP +
      (index * (Metrics.SLOT_HEIGHT + Metrics.SPACING_VERTICAL)) / 3
    );
  }

  public static getPaginationSlotLeft(slotIndex: number) {
    // there are N slots and the middle one is in the center
    const indexOfCentralSlot =
      (Metrics.PAGINATION_AREA_SLOTS_COUNT -
        (Metrics.PAGINATION_AREA_SLOTS_COUNT % 2)) /
      2;
    const leftOfCentralSlot =
      Metrics.PAGINATION_AREA_LEFT +
      Metrics.PAGINATION_AREA_WIDTH / 2 -
      Metrics.PAGINATION_AREA_SLOT_WIDTH / 2;
    return (
      leftOfCentralSlot +
      (Metrics.PAGINATION_AREA_SLOT_WIDTH +
        Metrics.PAGINATION_AREA_SPACING_HORIZONTAL) *
        (slotIndex - indexOfCentralSlot)
    );
  }

  /**
   *
   * @param slotIndex is not currently used, as all slots are
   * on a single line, but I left it here so that it is used
   * and new code will automatically work when I decide to use
   * multiple lines.
   * @returns
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static getPaginationSlotTop(slotIndex: number) {
    return Metrics.PAGINATION_AREA_TOP;
  }
}
export { Metrics };
