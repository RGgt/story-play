import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'phaser',
  backgroundColor: '#4488aa',
  scale: {
    width: 960,
    height: 540,
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};
