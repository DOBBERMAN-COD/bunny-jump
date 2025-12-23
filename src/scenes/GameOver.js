import Phaser from "../lib/phaser.js";

export default class GameOver extends Phaser.Scene {
  constructor() {
    super("game-over");
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    //Get the score from registry before transitioning
    const finalScore = this.registry.get("currentScore") || 0;

    //Add high score button
    const highScoreButton = this.add
      .text(
        this.scale.width * 0.5,
        this.scale.height * 0.85,
        " Press H for High Scores",
        {
          fontSize: 24,
        }
      )
      .setOrigin(0.5);

    this.add
      .text(width * 0.5, height * 0.3, "GameOver", {
        fontSize: 48,
      })
      .setOrigin(0.5);

    this.input.keyboard.once("keydown-SPACE", () => {
      this.scene.start("game");
    });

    // Add a replay button
    const replayButton = this.add
      .text(
        this.scale.width * 0.5,
        this.scale.height * 0.75,
        "Press SPACE to Play Again",
        {
          fontSize: 24,
        }
      )
      .setOrigin(0.5);

    //Add a menu button
    const menuButton = this.add
      .text(
        this.scale.width * 0.5,
        this.scale.height * 0.8,
        "Press M for Menu",
        {
          fontSize: 24,
        }
      )
      .setOrigin(0.5);

    //add input handlers
    this.input.keyboard.once("keydown-SPACE", () => {
      this.scene.start("game");
    });
    this.input.keyboard.once("keydown-M", () => {
      this.scene.start("start-menu");
    });
    this.input.keyboard.once("keydown-H", () => {
      this.scene.start("high-score", { score: finalScore });
    });

    //Display final score
    this.add
      .text(
        this.scale.width * 0.5,
        this.scale.height * 0.5,
        `Final Score: ${finalScore} carrots`,
        {
          fontSize: 36,
        }
      )
      .setOrigin(0.5);

    //Display currency earned
    this.add
      .text(
        this.scale.width * 0.5,
        this.scale.height * 0.65,
        ` Currency Earned :${this.registry.get("currency")} coins`,
        {
          fontSize: 24,
        }
      )
      .setOrigin(0.5);
  }
}
