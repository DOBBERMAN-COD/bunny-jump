import Phaser from "../lib/phaser.js";

export default class Shop extends Phaser.Scene {
  constructor() {
    super("shop");
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    //Title
    this.add
      .text(width * 0.5, height * 0.1, "Power-Up Shop", {
        fontSize: 48,
      })
      .setOrigin(0.5);

    // Display available power-ups
    const powerUps = [
      { name: "Super Jump", cost: 10, description: "Higher Jumps" },
      { name: "Speed Boost", cost: 15, description: "Faster Movement" },
      { name: "Double Points", cost: 20, description: "2x carrots" },
    ];

    powerUps.forEach((powerUp, index) => {
      const y = height * 0.3 + index * 100;

      this.add
        .text(width * 0.7, y, `${powerUp.cost} carrots`, {
          fontSize: 24,
        })
        .setOrigin(0.5);

      this.add
        .text(width * 0.5, y + 30, powerUp.description, {
          fontSize: 18,
        })
        .setOrigin(0.5);
    });

    //Back button
    this.add
      .text(width * 0.5, height * 0.9, " Press SPACE TO Return", {
        fontSize: 24,
      })
      .setOrigin(0.5);

    this.input.keyboard.once("keydown-SPACE", () => {
      this.scene.start("game");
    });
  }
}
