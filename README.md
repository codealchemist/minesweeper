# Minesweeper

The revival! xD

![snapshot](https://cldup.com/H8cSMWL6ik-3000x3000.png)

Minesweeper is a single-player puzzle video game. The objective of the game is to clear a rectangular board containing hidden "mines" or bombs without detonating any of them, with help from clues about the number of neighboring mines in each field.

## Demo

You can play it online at:

https://mine-finder.netlify.app/

## Game logic

With each turn, the game is validated:

- If the player uncovers a bomb tile, the player loses and the game ends.
- If the player uncovers a non-bomb tile (number) and there are remaining non-bomb tiles uncovered, the game continues. Otherwise, the player wins.

## Design constraints

The board should be an N x M grid and by default X hidden mines are randomly placed on the board.

These parameters should be entered by the user before starting the game. The user should be able to select between 3 pre-defined levels (easy, medium, hard).

The user should be able to mark a tile with a flag (right click) that points that the tile could contain a bomb. That tile should be disabled and the user shouldn't be able to click it.

The board header should display the remaining bombs in the game. This counter is modified when the user sets flags on the tiles.

The app should have routing for different pages:

- Game setup
- Game board
- Finished games list (persistant)
  - Start time; format: MM-DD-YYYY hh:mm (12hr format)
  - End Time; format: MM-DD-YYYY hh:mm (12hr format)
  - Difficulty
  - Total time spent
  - Status: won / lost
  - Order: by difficulty, total time spend

## Game features

- Saving/loading (either server side or client side).
- Multiplayer support

## Testing

TODO
