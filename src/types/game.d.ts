interface GameMemoryData {
  gameScene: string = SPScenes.Experimental;
  currentFrame: string;
  currentLanguage: string = 'en-GB';
  framesHistory: string[] = [] as string[];
}
interface SPGame extends Phaser.Game {
  mySharedData: GameMemoryData;
}
