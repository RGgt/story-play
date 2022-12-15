interface ComponentData {
  code: string;
  data: string;
  config: object;
}
interface FrameData {
  code: string;
  components: ComponentData[];
}
interface StoryFlowData {
  startingFrame: string;
  endingFrame: string;
  frames: FrameData[];
}
