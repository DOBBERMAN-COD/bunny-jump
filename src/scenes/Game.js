import Phaser from "../lib/phaser.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super("game"); //unique key defined by a Scene
  }
  /**@type {Phaser.Physics.Arcade.Sprite} */
  player;

  /** @type {Phaser.Physics.Arcade.StaticGroup} */
  platforms;

  preload() {
    // called to allow us to specify images,audio or other assets to laod before starting the Scene

    this.load.image("background", "assets/bg_layer1.png");

    //load the platform image
    this.load.image("platform", "assets/ground_grass_broken.png");

    //load the bunny image
    this.load.image("bunny-stand", "assets/bunny1_stand.png");
  }

  create() {
    // called once all the assets for the Scene have been loaded.Only assets that have been loaded can be used in create()

    this.add.image(240, 320, "background");

    // //add a platfrom image in the middle
    // this.physics.add.image(240, 320, "platform").setScale(0.5);

    //create the group
    this.platforms = this.physics.add.staticGroup();

    //then create 5 platforms from the group
    for (let i = 0; i < 5; ++i) {
      const x = Phaser.Math.Between(80, 400);
      const y = 150 * i;

      /*@type {Phaser.Physics.arcade.Sprite} */
      const platform = this.platforms.create(x, y, "platform");
      platform.scale = 0.5;

      /**@type{Phaser.Physics.Arcade.StaticBody} */
      const body = platform.body;
      body.updateFromGameObject(); // this will refresh tehe physics body based on any changes we made to the GameObject like position and scale
    }

    //Create a bunny sprite
    this.player = this.physics.add
      .sprite(240, 320, "bunny-stand")
      .setScale(0.5);

    //adds collisions
    this.physics.add.collider(this.platforms, this.player);

    // Enables the bunny to jump through platforms,land on them and then jump again
    this.player.body.checkCollision.up = false;
    this.player.body.checkCollision.left = false;
    this.player.body.checkCollision.right = false;

    //Enabls us to follow the bunny
    this.cameras.main.startFollow(this.player);
  }

  update() {
    // find out from Arcade Physics if the player's physics is touching something below it
    const touchingDown = this.player.body.touching.down;

    if (touchingDown) {
      //this makes the bunny jump straight up
      this.player.setVelocityY(-300);
    }

    //the code below iterates over each platfrom in the this.platforms group.The action we are performing is to check if each
    // platform's y value is greater than or equal to the vertical distance that the camera has scrolled plus a fixed 700 pixels.
    //If that is true we move the platfrom to some random amount between 50 and 100 pixels above where the top of the camera is.
    //Then we refresh the platform's physics body to match changes made to the platform -namely the change in y.
    this.platforms.children.iterate((child) => {
      /** @type {Phaser.Physics.Arcade.Sprite} */
      const platform = child;

      const scrollY = this.cameras.main.scrollY;

      if (platform.y >= scrollY + 700) {
        platform.y = scrollY - Phaser.Math.Between(50, 100);
        platform.body.updateFromGameObject();
      }
    });
  }
}
