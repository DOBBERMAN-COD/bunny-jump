import Phaser from "../lib/phaser.js";

export default class StartMenu extends Phaser.Scene {
  constructor() {
    super("start-menu");
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    //Title
    this.add
      .text(width * 0.5, height * 0.3, "Bunny Jump", {
        fontSize: 48,
        color: "#8B4513",
      })
      .setOrigin(0.5);

    //Instructions
    this.add
      .text(width * 0.5, height * 0.7, "Use Arrow Keys to Move", {
        fontSize: 18,
      })
      .setOrigin(0.5);

    this.input.keyboard.once("keydown-SPACE", () => {
      this.scene.start("game");
    });
  }
}
