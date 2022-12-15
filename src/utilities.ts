export default class Utilities {
  public static restoreFocusToGame() {
    const canvas = document.getElementsByTagName('canvas')[0];
    canvas.focus();
  }
}
