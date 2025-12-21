import Phaser from "../lib/phaser.js";

export default class HighScore extends Phaser.Scene {
  constructor() {
    super("high-score");
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    //title
    this.add
      .text(width * 0.5, height * 0.1, "High Scores", {
        fontSize: 48,
      })
      .setOrigin(0.5);

    // Display scores
    const scores = this.getHighScores();
    scores.forEach((score, index) => {
      this.add
        .text(
          width * 0.5,
          height * 0.3 + index * 40,
          `${index + 1}. ${score} carrots`,
          {
            fontSize: 24,
          }
        )
        .setOrigin(0.5);
    });

    //Back button
    this.add
      .text(width * 0.5, height * 0.9, "Press SPACE to Return", {
        fontSize: 24,
      })
      .setOrigin(0.5);

    this.input.keyboard.once("keydown-SPACE", () => {
      this.scene.start("start-menu");
    });
  }

  getHighScores() {
    //Implement local storage or s
    return [100, 85, 70, 50, 30];
  }
}
