import {
  PaginationSlotBuilder as Builder,
  PaginationSlotComponents,
} from './PaginationSlotBuilder';

class PaginationAreaBuilder {
  public static buildPaginationArea(
    scene: Phaser.Scene,
    activePageIndex: number,
    onPageChanged: (pageIndex: number) => void,
  ) {
    const paginationSlotComponents: PaginationSlotComponents[] = [];
    paginationSlotComponents.push(
      PaginationAreaBuilder.buildPaginationAreaSlot(
        scene,
        0,
        onPageChanged,
        activePageIndex,
      ),
    );
    paginationSlotComponents.push(
      PaginationAreaBuilder.buildPaginationAreaSlot(
        scene,
        1,
        onPageChanged,
        activePageIndex,
      ),
    );
    paginationSlotComponents.push(
      PaginationAreaBuilder.buildPaginationAreaSlot(
        scene,
        2,
        onPageChanged,
        activePageIndex,
      ),
    );
    paginationSlotComponents.push(
      PaginationAreaBuilder.buildPaginationAreaSlot(
        scene,
        3,
        onPageChanged,
        activePageIndex,
      ),
    );
    paginationSlotComponents.push(
      PaginationAreaBuilder.buildPaginationAreaSlot(
        scene,
        4,
        onPageChanged,
        activePageIndex,
      ),
    );
    return paginationSlotComponents;
  }

  private static buildPaginationAreaSlot(
    scene: Phaser.Scene,
    pageIndex: number,
    onPageChanged: (pageIndex: number) => void,
    activePageIndex: number,
  ) {
    return Builder.buildActivePaginationSlot(
      scene,
      pageIndex,
      activePageIndex === pageIndex
        ? undefined
        : () => {
            onPageChanged(pageIndex);
          },
    );
  }

  public static destroyPaginationArea(components: PaginationSlotComponents[]) {
    components.forEach((value) => {
      value.slotBox.destroy();
      value.slotHighlightable.destroy();
      value.slotText.destroy();
    });
  }
}
export { PaginationAreaBuilder };
