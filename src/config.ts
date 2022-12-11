import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'phaser',
  scale: {
    width: 800,
    height: 600,
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};
