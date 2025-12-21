import Phaser from "./lib/phaser.js";
import Game from "./scenes/Game.js";
import GameOver from "./scenes/GameOver.js";
import StartMenu from "./scenes/StartMenu.js";
import HighScore from "./scenes/HighScore.js";
import Shop from "./scenes/Shop.js";

export default new Phaser.Game({
  type: Phaser.AUTO,
  width: 480,
  height: 640,
  scene: [StartMenu, Game, GameOver, HighScore, Shop],
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 200,
      },
      debug: false,
    },
  },
});

console.dir(Phaser);
