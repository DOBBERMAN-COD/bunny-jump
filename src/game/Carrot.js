import Phaser from "../lib/phaser.js";

export default class Carrot extends Phaser.GameObjects.Sprite {
  /**
   * @param {Phaser.Scene} scene
   * @param  {number} x
   * @param  {number} y
   * @param {string} texture
   */

  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.setScale(0.5);

    //Add physics body to the carrot
    scene.physics.add.existing(this);
    this.body.setAllowGravity(true);
    this.body.setCollideWorldBounds(false);
    this.body.setSize(this.width, this.height);
  }
}
