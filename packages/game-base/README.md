# `@rggt/game-base`

This package contains the base interfaces and common types that are going to be used by all my games.

## Usage

### ICursorControllingGame

```typescript
// In a custom control, get a reference to the game:
const phaserGame = this.scene.game;
// Cast it to ICursorControllingGame
const cursorController = phaserGame as unknown as ICursorControllingGame;
// Mark the cursor as "active':
cursorController.setCursorEnabled();
```

On the implementation of the Phaser game, implement this interface:

```typescript
class MyGame extends Phaser.Game implements SPGame, ICursorControllingGame {
  // ... more code
  public setCursorEnabled() {
    // set the cursor style here!
  }
}
```
