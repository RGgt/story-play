import {
  BoxCreator,
  GroupBox,
  Highlightable,
  TextCreator,
} from '@rggt/gui-elements';
import { Metrics } from './Metrics';

type SlotComponents = {
  hasData: boolean;
  slotBox: GroupBox;
  slotLargeText?: Phaser.GameObjects.Text;
  slotHighlightable: Highlightable;
  slotPreviewImage?: Phaser.GameObjects.Sprite;
  slotPreviewLabel?: Phaser.GameObjects.Text;
};

class SlotBuilder {
  public static buildEmptySlot(
    scene: Phaser.Scene,
    slotIndex: number,
    largeText: string,
    onClick: undefined | (() => void),
  ): SlotComponents {
    const slotLeft = Metrics.getSlotLeft(slotIndex);
    const slotTop = Metrics.getSlotTop(slotIndex);

    const slotBox = SlotBuilder.buildSlotBox(scene, slotLeft, slotTop);
    const slotLargeText = SlotBuilder.buildSlotLargeText(
      scene,
      slotLeft,
      slotTop,
      largeText,
    );
    const slotHighlightable = SlotBuilder.buildSlotHighlightable(
      scene,
      slotLeft,
      slotTop,
      onClick,
    );

    return {
      hasData: false,
      slotBox,
      slotLargeText,
      slotHighlightable,
    };
  }

  public static buildFilledSlot(
    scene: Phaser.Scene,
    slotIndex: number,
    textureName: string,
    labelText: string,
    onClick: undefined | (() => void),
  ): SlotComponents {
    const slotLeft = Metrics.getSlotLeft(slotIndex);
    const slotTop = Metrics.getSlotTop(slotIndex);

    const slotBox = SlotBuilder.buildSlotBox(scene, slotLeft, slotTop);
    const slotPreviewImage = SlotBuilder.buildSlotPreviewImage(
      scene,
      slotLeft,
      slotTop,
      textureName,
    );
    const slotPreviewLabel = SlotBuilder.buildSlotPreviewLabel(
      scene,
      slotLeft,
      slotTop,
      labelText,
    );
    const slotHighlightable = SlotBuilder.buildSlotHighlightable(
      scene,
      slotLeft,
      slotTop,
      onClick,
    );

    return {
      hasData: true,
      slotBox,
      slotPreviewImage,
      slotPreviewLabel,
      slotHighlightable,
    };
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
      Metrics.SLOT_WIDTH,
      Metrics.SLOT_HEIGHT,
    );
  }

  private static buildSlotLargeText(
    scene: Phaser.Scene,
    slotLeft: number,
    slotTop: number,
    largeText: string,
  ) {
    const boxText = TextCreator.createTitleText(
      scene,
      slotLeft +
        Metrics.IN_SLOT_LARGE_TEXT_AREA_LEFT +
        Metrics.SLOT_LARGE_TEXT_AREA_WIDTH / 2,
      slotTop +
        Metrics.IN_SLOT_LARGE_TEXT_AREA_TOP +
        Metrics.SLOT_LARGE_TEXT_AREA_HEIGHT / 2,
      largeText,
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
      Metrics.SLOT_WIDTH,
      Metrics.SLOT_HEIGHT,
    );
    boxHighlightable.onClick = onClick;
    if (!onClick) {
      boxHighlightable.setActive(false);
    }
    return boxHighlightable;
  }

  private static buildSlotPreviewImage(
    scene: Phaser.Scene,
    slotLeft: number,
    slotTop: number,
    textureName: string,
  ) {
    const sprite = scene.add.sprite(
      slotLeft + Metrics.IN_SLOT_IMAGE_LEFT,
      slotTop + Metrics.IN_SLOT_IMAGE_TOP,
      textureName,
    );
    sprite.setOrigin(0, 0);
    return sprite;
  }

  private static buildSlotPreviewLabel(
    scene: Phaser.Scene,
    slotLeft: number,
    slotTop: number,
    labelText: string,
  ) {
    const textLeft =
      slotLeft +
      Metrics.IN_SLOT_TEXT_AREA_LEFT +
      Metrics.SLOT_TEXT_AREA_WIDTH / 2;
    const textTop = slotTop + Metrics.IN_SLOT_TEXT_AREA_TOP;
    const label = TextCreator.createSaveButtonText(
      scene,
      textLeft,
      textTop,
      labelText,
      Metrics.SLOT_TEXT_AREA_WIDTH,
    );
    label.setOrigin(0.5, 0);
    scene.add.existing(label);
    return label;
  }
}
export { SlotBuilder };
export type { SlotComponents };
