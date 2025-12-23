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

    // Display available power-ups with duration
    const powerUps = [
      {
        name: "Super Jump",
        cost: 10,
        description: "Higher Jumps",
        duration: 5000,
        key: "superJump",
      },
      {
        name: "Speed Boost",
        cost: 15,
        description: "Faster Movement",
        duration: 7000,
        key: "speedBoost",
      },
      {
        name: "Double Points",
        cost: 20,
        description: "2x carrots",
        duration: 10000,
        key: "doublePoints",
      },
    ];

    powerUps.forEach((powerUp, index) => {
      const y = height * 0.3 + index * 100;

      // Power-up name
      this.add
        .text(width * 0.5, y, powerUp.name, {
          fontSize: 24,
        })
        .setOrigin(0.5);

      // Power-up description
      this.add
        .text(width * 0.5, y + 30, powerUp.description, {
          fontSize: 18,
        })
        .setOrigin(0.5);

      // Power-up cost
      this.add
        .text(width * 0.7, y, `${powerUp.cost} carrots`, {
          fontSize: 24,
        })
        .setOrigin(0.5);

      // Purchase button for each power-up
      const purchaseButton = this.add
        .text(width * 0.3, y, "Purchase", {
          fontSize: 24,
          backgroundColor: "#4CAF50",
          padding: 10,
        })
        .setOrigin(0.5)
        .setInteractive()
        .on("pointerdown", () => this.purchasePowerUp(powerUp));
    });

    // Back button
    this.add
      .text(width * 0.5, height * 0.9, "Press SPACE TO Return", {
        fontSize: 24,
      })
      .setOrigin(0.5);

    this.input.keyboard.once("keydown-SPACE", () => {
      this.scene.start("start-menu");
    });
  }

  purchasePowerUp(powerUp) {
    const currency = this.registry.get("currency");
    if (currency >= powerUp.cost) {
      this.registry.set("currency", currency - powerUp.cost);
      this.scene.start("game", { powerUp: powerUp });
    } else {
      //Show insufficient funds message
      this.add
        .text(
          this.scale.width / 2,
          this.scale.height / 2,
          "Insufficient Funds !",
          {
            fontSize: 24,
            color: "#ff0000",
          }
        )
        .setOrigin(0.5);
    }
  }
}
