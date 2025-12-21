import Phaser from "../lib/phaser.js";

export default class GameOver extends Phaser.Scene {
  constructor() {
    super("game-over");
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    //Get the score from registry before transitioning
    const finalScore = this.registry.get("currentScore");

    //Transition to high score scene and pass the score
    this.scene.start("high-score", { score: finalScore });

    this.add
      .text(width * 0.5, height * 0.5, "GameOver", {
        fontSize: 48,
      })
      .setOrigin(0.5);

    this.input.keyboard.once("keydown-SPACE", () => {
      this.scene.start("game");
    });
  }
}
