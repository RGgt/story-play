interface GameMemoryData {
  gameScene: string;
  currentFrame: string;
  currentLanguage: string;
  framesHistory: string[];
}
interface SPGame extends Phaser.Game {
  gameData: GameMemoryData | undefined;
}
