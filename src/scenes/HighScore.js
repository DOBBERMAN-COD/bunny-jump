import Phaser from "../lib/phaser.js";

export default class HighScore extends Phaser.Scene {
  constructor() {
    super("high-score");
  }

  create(data) {
    const width = this.scale.width;
    const height = this.scale.height;

    //title
    this.add
      .text(width * 0.5, height * 0.1, "High Scores", {
        fontSize: 48,
      })
      .setOrigin(0.5);

    //Save the score if passed from GameOver
    if (data && data.score) {
      this.saveScore(data.score);
    }

    // Display scores
    const scores = this.getHighScores();
    scores.forEach((score, index) => {
      const scoreText = this.add
        .text(
          width * 0.5,
          height * 0.3 + index * 40,
          `${index + 1}. ${score} carrots`,
          {
            fontSize: 24,
          }
        )
        .setOrigin(0.5);

      // Highlight current score if it's the latest
      if (score === this.registry.get("currentScore")) {
        scoreText.setColor("#ffd700");
      }
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
    //Get Scores from localStorage
    const savedScores = localStorage.getItem("bunnyJumpHighScores");

    //if no scores exist ,return default scores
    if (!savedScores) {
      const defaultScores = [100, 85, 70, 50, 30];
      localStorage.setItem(
        "bunnyJumpHighScores",
        JSON.stringify(defaultScores)
      );
      return defaultScores;
    }

    //Parse and return saved scores
    return JSON.parse(savedScores);
  }

  saveScore(score) {
    //Get current scores
    const scores = this.getHighScores();

    //Add new score
    scores.push(score);

    //sort in descending order
    scores.sort((a, b) => b - a);

    //Keep only top 5 scores
    const topScores = scores.slice(0, 5);

    //Save back to local Storage
    localStorage.setItem("bunnyJumpHighScores", JSON.stringify(topScores));
  }
}
