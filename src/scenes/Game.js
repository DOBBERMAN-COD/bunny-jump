import Phaser from "../lib/phaser.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super("game"); //unique key defined by a Scene
  }
  preload() {
    // called to allow us to specify images,audio or other assets to laod before starting the Scene
    this.load.image("background", "assets/bg_layer1.png");
  }

  create() {
    // called once all the assets for the Scene have been loaded.Only assets that have been loaded can be used in create()
  }
}
