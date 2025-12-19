import Phaser from "../lib/phaser.js";
import Carrot from "../game/Carrot.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super("game"); //unique key defined by a Scene
  }
  /**@type {Phaser.Physics.Arcade.Sprite} */
  player;

  /** @type {Phaser.Physics.Arcade.StaticGroup} */
  platforms;

  /**@type {Phaser.Types.Input.Keyboard.CursorKeys} */
  cursors;

  /**@type {Phaser.Physics.Arcade.Group} */
  carrots;

  /** @type {Set<Phaser.GameObjects.Sprite} */
  activeCarrots = new Set();

  carrotCollected = 0;

  preload() {
    // called to allow us to specify images,audio or other assets to laod before starting the Scene

    this.load.image("background", "assets/bg_layer1.png");

    //load the platform image
    this.load.image("platform", "assets/ground_grass_broken.png");

    //load the bunny image
    this.load.image("bunny-stand", "assets/bunny1_stand.png");

    //load the carrot image
    this.load.image("carrot", "assets/carrot.png");

    // enable to move right and left
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    // called once all the assets for the Scene have been loaded.Only assets that have been loaded can be used in create()

    this.add.image(240, 320, "background").setScrollFactor(1, 0); //by setting the y scroll factor to 0 we can keep the background from scrolling up and down
    // with the camera.

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

    //Enables us to follow the bunny
    this.cameras.main.startFollow(this.player);

    //set the horizontal dead zone to 1.5x game width
    this.cameras.main.setDeadzone(this.scale.width * 1.5);

    //create a carrot
    this.carrots = this.physics.add.group({
      classType: Carrot,
    });
    this.carrots.get(240, 320, "carrot");

    this.physics.add.collider(this.platforms, this.carrots);

    this.physics.add.overlap(
      this.player,
      this.carrots,
      this.handleCollectCarrot, //called an overlap
      undefined,
      this
    );

    //Displays the score
    const style = { color: "#000", fontSize: 24 };
    this.add
      .text(240, 10, "Carrots:0", style)
      .setScrollFactor(0)
      .setOrigin(0.5, 0);
  }

  update(t, dt) {
    // find out from Arcade Physics if the player's physics is touching something below it
    const touchingDown = this.player.body.touching.down;

    if (touchingDown) {
      //this makes the bunny jump straight up
      this.player.setVelocityY(-300);
    }

    //left and right input logic
    if (this.cursors.left.isDown && !touchingDown) {
      this.player.setVelocityX(-200);
    } else if (this.cursors.right.isDown && !touchingDown) {
      this.player.setVelocityX(200);
    } else {
      //Stop the movement if not left or right
      this.player.setVelocityX(0);
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

        //Create a carrot above the platform being reused
        this.addCarrotAbove(platform);
      }

      console.log("Active carrots", this.activeCarrots.size);
    });

    // Handle carrot recycling
    this.carrots.children.iterate((child) => {
      /** @type {Carrot} */
      const carrot = child;

      if (!carrot.active) return;

      //check if carrot is below screen
      if (carrot.y > this.cameras.main.scrollY + this.scale.height + 100) {
        //Recycle the carrot
        this.recycleCarrot(carrot);
      }
    });

    this.horizontalWrap(this.player);
  }

  /**
   * @param {Phaser.GameObjects.Sprite} sprite
   */
  horizontalWrap(sprite) {
    const halfWidth = sprite.displayWidth * 0.5;
    const gameWidth = this.scale.width;

    if (sprite.x < -halfWidth) {
      sprite.x = gameWidth + halfWidth;
    } else if (sprite.x > gameWidth + halfWidth) {
      sprite.x = -halfWidth;
    }
  }

  maxCarrots = 10;

  addCarrotAbove(sprite) {
    if (this.activeCarrots.size >= this.maxCarrots) {
      return null;
    }

    const y = sprite.y - sprite.displayHeight;
    const x = sprite.x - Phaser.Math.Between(-30, 30); //Add some horizontal variation

    //Check if there's already a carrot near this position
    const existingCarrot = this.carrots.children.entries.find(
      (carrot) => Math.abs(carrot.x - x) < 30 && Math.abs(carrot.y - y) < 30
    );

    if (existingCarrot) {
      return existingCarrot; // Return existing carrot instead of creating a new one
    }

    /**@type {Phaser.Physics.Arcade.Sprite} */
    const carrot = this.carrots.get(sprite.x, y, "carrot");

    if (carrot) {
      //set active and visible
      carrot.setActive(true);
      carrot.setVisible(true);
      carrot.setPosition(x, y);
      carrot.body.enable = true;
      carrot.body.reset(x, y);
      carrot.body.setSize(carrot.width, carrot.height);

      //add to active set
      this.activeCarrots.add(carrot);
    }

    return carrot;
  }

  //recycle carrot method
  recycleCarrot(carrot) {
    //Remove from active set
    this.activeCarrots.delete(carrot);

    if (this.activeCarrots.size >= this.maxCarrots) {
      return;
    }

    let newPositionFound = false;
    let attempts = 0;
    const maxAttempts = 5; // Prevent Infinite Loop
    let x, y;

    while (!newPositionFound && attempts < maxAttempts) {
      const platform =
        this.platforms.children.entries[
          Phaser.Math.Between(0, this.platforms.children.entries.length - 1)
        ];

      // reset carrot position above a random platform
      x = platform.x + Phaser.Math.Between(-30, 30);
      y = platform.y - platform.displayHeight;

      //Check if there's already a carrot near this position
      const existingCarrot = this.carrots.children.entries.find(
        (c) => c.active && Math.abs(c.x - x) < 30 && Math.abs(c.y - y) < 30
      );

      if (!existingCarrot) {
        newPositionFound = true;
        carrot.setPosition(x, y);
        carrot.body.enable = true;
        carrot.body.reset(x, y);
        carrot.setActive(true);
        carrot.setVisible(true);

        // Add back to active set
        this.activeCarrots.add(carrot);
      }
      attempts++;
    }

    // if no suitable position found after max attempts just disale the carrot
    if (!newPositionFound) {
      this.carrots.killAndHide(carrot);
      this.physics.world.disableBody(carrot.body);
    }
  }

  /**
   * @param {Phaser.Physics.Arcade.Sprite} player
   * @param {Carrot} carrot
   */
  handleCollectCarrot(player, carrot) {
    //Remove from active set
    this.activeCarrots.delete(carrot);

    // hide from display
    this.carrots.killAndHide(carrot);

    //Disable from physics world
    this.physics.world.disableBody(carrot.body);

    //increment by 1
    this.carrotsCollected++;

    //Destroy the carrot completely
    carrot.destroy();
  }
}
