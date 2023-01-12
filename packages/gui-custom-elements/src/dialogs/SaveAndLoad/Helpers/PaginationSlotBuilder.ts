import {
  BoxCreator,
  GroupBox,
  Highlightable,
  TextCreator,
} from '@rggt/gui-elements';
import { type } from 'os';
import { Metrics } from './Metrics';

type PaginationSlotComponents = {
  slotBox: GroupBox;
  slotText: Phaser.GameObjects.Text;
  slotHighlightable: Highlightable;
};
class PaginationSlotBuilder {
  public static buildActivePaginationSlot(
    scene: Phaser.Scene,
    pageIndex: number,
    onClick: undefined | (() => void),
  ): PaginationSlotComponents {
    const slotLeft = Metrics.getPaginationSlotLeft(pageIndex);
    const slotTop = Metrics.getPaginationSlotTop(pageIndex);

    const slotBox = PaginationSlotBuilder.buildSlotBox(
      scene,
      slotLeft,
      slotTop,
    );
    const slotText = PaginationSlotBuilder.buildSlotText(
      scene,
      slotLeft,
      slotTop,
      (pageIndex + 1).toString(),
    );
    const slotHighlightable = PaginationSlotBuilder.buildSlotHighlightable(
      scene,
      slotLeft,
      slotTop,
      onClick,
    );

    return { slotBox, slotText, slotHighlightable };
  }

  private static buildSlotBox(
    scene: Phaser.Scene,
    slotLeft: number,
    slotTop: number,
  ) {
    return BoxCreator.createGroupBox(
      scene,
      slotLeft,
      slotTop,
      Metrics.PAGINATION_AREA_SLOT_WIDTH,
      Metrics.PAGINATION_AREA_HEIGHT,
    );
  }

  private static buildSlotText(
    scene: Phaser.Scene,
    slotLeft: number,
    slotTop: number,
    text: string,
  ) {
    const boxText = TextCreator.createTitleText(
      scene,
      slotLeft + Metrics.PAGINATION_AREA_SLOT_WIDTH / 2,
      slotTop + Metrics.PAGINATION_AREA_HEIGHT / 2,
      text,
      Metrics.SLOT_LARGE_TEXT_AREA_WIDTH,
    );
    boxText.setOrigin(0.5, 0.5);
    scene.add.existing(boxText);
    return boxText;
  }

  private static buildSlotHighlightable(
    scene: Phaser.Scene,
    slotLeft: number,
    slotTop: number,
    onClick: undefined | (() => void),
  ) {
    const boxHighlightable = BoxCreator.createHighlightable(
      scene,
      slotLeft,
      slotTop,
      Metrics.PAGINATION_AREA_SLOT_WIDTH,
      Metrics.PAGINATION_AREA_HEIGHT,
    );
    boxHighlightable.onClick = onClick;
    if (!onClick) {
      boxHighlightable.setActive(false);
    }
    return boxHighlightable;
  }
}
export { PaginationSlotBuilder };
export type { PaginationSlotComponents };
