import Phaser from "../lib/phaser.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super("game"); //unique key defined by a Scene
  }
  preload() {
    // called to allow us to specify images,audio or other assets to laod before starting the Scene

    this.load.image("background", "assets/bg_layer1.png");

    //load the platform image
    this.load.image("platform", "assets/ground_grass_broken.png");
  }

  create() {
    // called once all the assets for the Scene have been loaded.Only assets that have been loaded can be used in create()

    this.add.image(240, 320, "background");

    // //add a platfrom image in the middle
    // this.physics.add.image(240, 320, "platform").setScale(0.5);

    //create the group
    const platforms = this.physics.add.staticGroup();

    //then create 5 platforms from the group
    for (let i = 0; i < 5; ++i) {
      const x = Phaser.Math.Between(80, 400);
      const y = 150 * i;

      /*@type{Phaser.Physics.arcade.Sprite} */
      const platform = platforms.create(x, y, "platform");
      platform.scale = 0.5;

      /**@type{Phaser.Physics.Arcade.StaticBody} */
      const body = platform.body;
      body.updateFromGameObject(); // this will refresh tehe physics body based on any changes we made to the GameObject like position and scale
    }
  }
}
