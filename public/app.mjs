// -------------------------------
// pgt generated 2%
// Hugh generated 98%
// James generated 0%
// Hugh Understanding 100%
// James Understanding 0%
// ------------------------------

import { ChosenImage, ChosenBlock } from "./SelectedImage.js";

document.addEventListener('DOMContentLoaded', () => {

  // Ensure that the elements are ready before setting the src attribute
  const flatImage = document.getElementById('chosen-block-flat');
  const flippedImage = document.getElementById('chosen-block-flipped');
  const bclImage = document.getElementById('chosen-block-bcl');
  const bcldImage = document.getElementById('chosen-block-bcld');
  const bcrImage = document.getElementById('chosen-block-bcr');
  const bcrdImage = document.getElementById('chosen-block-bcrd');
  const MoveImage = document.getElementById('chosen-block-move');
  const FloatImage = document.getElementById('chosen-block-float');
  const GankImage = document.getElementById('chosen-block-gank');
  const IceImage = document.getElementById('chosen-block-ice');

  let debugMode = true; // Global variable to track debug state

  var config = {
    type: Phaser.AUTO,
    //i made the game full screen if you open it in a new tab
    width: 1519,
    height: 850,
    disableContextMenu: true,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 800 },
        debug: debugMode , // To show debut stuff
      },
    },
    scene: {  
      preload: preload,
      create: create,
      update: update,
    },
  };

  var game = new Phaser.Game(config);
  let DebugText_XandY;
  let DebugText_DeathCount;
  let DebugText_Timer;
  let DebugText_XandYPlayer;
  let startTime;
  let bounce;
  let bounce2;
  let bounce3;
  let bounceGank;
  let vertgank;
  let move;
  let platforms;
  let cursors;
  let player;
  let death = 0;
  let PlatformData = [];
  let PlatformData2 = [];
  let CurrentLevel = 1;

  PlatformData = [
    { x: (32 *1), y: 830, tag: "flat", scale: 0.5 }, 
    { x: (32 *3), y: 830, tag: "flat", scale: 0.5 }, 
    { x: (32 *5), y: 830, tag: "flat", scale: 0.5 },
    { x: (32 *7), y: 830, tag: "flat", scale: 0.5 }, 
    { x: (32 *9), y: 830, tag: "flat", scale: 0.5 }, 
    { x: (32 *11), y: 830, tag: "flat", scale: 0.5 }, 
    { x: (32 *13), y: 830, tag: "flat", scale: 0.5 }, 
    { x: (32 *15), y: 830, tag: "flat", scale: 0.5 }, 
    { x: (32 *17), y: 830, tag: "flat", scale: 0.5 }, 
    { x: (32 *19), y: 830, tag: "flat", scale: 0.5 }, 
    { x: (32 *21), y: 830, tag: "flat", scale: 0.5 }, 
    { x: (32 *23), y: 830, tag: "flat", scale: 0.5 }, 
    { x: (32 *25), y: 830, tag: "flat", scale: 0.5 }, 
    { x: (32 *27), y: 830, tag: "flat", scale: 0.5 }, 
    { x: (32 *29), y: 830, tag: "flat", scale: 0.5 }, 
    { x: (32 *31), y: 830, tag: "flat", scale: 0.5 }, 
    { x: (32 *33), y: 830, tag: "flat", scale: 0.5 }, 
    { x: (32 *35), y: 830, tag: "flat", scale: 0.5 }, 
    { x: (32 *37), y: 830, tag: "flat", scale: 0.5 }, 
    { x: (32 *39), y: 830, tag: "flat", scale: 0.5 }, 
    { x: (32 *41), y: 830, tag: "flat", scale: 0.5 }, 
    { x: (32 *43), y: 830, tag: "flat", scale: 0.5 }, 
    { x: (32 *45), y: 830, tag: "flat", scale: 0.5 }, 
    { x: (32 *47), y: 830, tag: "flat", scale: 0.5 }, 
    { x: (32 *17), y: 800, tag: "bounce", scale: 0.25, bounce: -400},
    { x: (32 *18), y: 800, tag: "bouncegank", scale: 0.25, bounce: -400, MoRes1: (32 * 18), MoRes2: (32 *20) },
    { x: (32 *19), y: 700, tag: "gank", scale: 0.2, MoRes1: 608, MoRes2: 672 },
    { x: (32 *30), y: 700, tag: "gank", scale: 0.2, MoRes1: (32 * 32), MoRes2: (32 *30) },
    { x: (32 *30), y: 700, tag: "vertgank", scale: 0.2, MoRes1: 700, MoRes2: 800 },
    { x: 700, y: 800, tag: "door", scale: 0.2 }, 
  ];

  PlatformData2 = [
    
    { x: 400, y: 800, tag: "door", scale: 0.2 }, 
    { x: 100, y: 700, tag: "bounce", scale: 0.2 }, 

    { x: 32, y: 830, tag: "flat", scale: 0.5 }, 
    { x: 96, y: 830, tag: "flat", scale: 0.5 },
    { x: 160, y: 830, tag: "flat", scale: 0.5 },
    { x: 280, y: 830, tag: "float", scale: 0.3 },
    { x: 380, y: 830, tag: "float", scale: 0.3 },
    { x: 500, y: 830, tag: "flat", scale: 0.5 },
    { x: 620, y: 830, tag: "float", scale: 0.3 },
    { x: 720, y: 830, tag: "float", scale: 0.3 },
    { x: 840, y: 830, tag: "flat", scale: 0.5 },
    { x: 1200, y: 830, tag: "flat", scale: 0.5 },
    { x: 1430, y: 830, tag: "float", scale: 0.3 },
    { x: 1430, y: 660, tag: "float", scale: 0.3 },
    { x: 900, y: 700, tag: "float", scale: 0.3 },
    { x: 20, y: 580, tag: "float", scale: 0.3 },
    { x: 60, y: 425, tag: "float", scale: 0.3 },
    { x: 108, y: 425, tag: "flipped", scale: 0.5 },
    { x: 172, y: 425, tag: "flipped", scale: 0.5 },
    { x: 234, y: 425, tag: "flipped", scale: 0.5 },
    { x: 300, y: 425, tag: "flipped", scale: 0.5 },
    { x: 350, y: 425, tag: "float", scale: 0.3 },
    { x: 285, y: 580, tag: "float", scale: 0.3 },
    { x: 333, y: 580, tag: "flat", scale: 0.5 },
    { x: 397, y: 580, tag: "flat", scale: 0.5 },
    { x: 460, y: 580, tag: "flat", scale: 0.5 },
    { x: 510, y: 440, tag: "float", scale: 0.3 },
    { x: 700, y: 550, tag: "float", scale: 0.3 },
    { x: 900, y: 450, tag: "float", scale: 0.3 },
    { x: 1100, y: 350, tag: "float", scale: 0.3 },
    { x: 1300, y: 250, tag: "float", scale: 0.3 },
    { x: 1450, y: 150, tag: "float", scale: 0.3 },    
  ];

  function movePlatformX(platform, MoRes1, MoRes2, scene) {

    console.log(platform);

    const duration = 1000; // Duration for the movement
    scene.tweens.timeline({ 
        targets: platform,
        ease: 'Linear',
        loop: -1, // Loop indefinitely
        tweens: [
            { x: MoRes1, duration: duration, yoyo: true },
            { x: MoRes2, duration: duration, yoyo: true }
        ]
    });
  }

  function movePlatformY(platform, MoRes1, MoRes2, scene) {

    console.log(platform);

    const duration = 1000; // Duration for the movement
    scene.tweens.timeline({ 
        targets: platform,
        ease: 'Linear',
        loop: -1, // Loop indefinitely
        tweens: [
            { y: MoRes1, duration: duration, yoyo: true },
            { y: MoRes2, duration: duration, yoyo: true }
        ]
    });
  }

  function GeneratePlatforms(scene, array) {
    let platforms = scene.physics.add.staticGroup();
    array.forEach((data) => {
      try {
        let platform = platforms
          .create(data.x, data.y, data.tag)
          .setScale(data.scale)
          .refreshBody()
          .setImmovable(true)
          .setAngle(data.rotation)
          .setGravityY(0);
        
        // Set custom data for each platform
        platform.setData('type', data.tag);
        platform.setData('bounce', data.bounce);
        platform.setData('MoRes1', data.MoRes1);
        platform.setData('MoRes2', data.MoRes2);
        platform.setData('axis', data.axis);
      }
      catch(err) {
        console.error("Error creating platforms: ", err);
        platforms.setAngle(0);
      }
    });

    return platforms;
  }

  function applyPlatformRules(scene) {

    platforms.children.entries.forEach((platform) => {

      if (platform.getData('type') === 'flat') {
        // Apply rule for flat platforms
        platform.setTint(0xff0000);  // For example, tint all flat platforms red
      }

      if (platform.getData('type') === 'gank' || platform.getData('type') === 'bouncegank') {
        movePlatformX(platform, platform.getData('MoRes1'), platform.getData('MoRes2'), scene); 
      }

      if (platform.getData('type') === 'vertgank') {
        movePlatformY(platform, platform.getData('MoRes1'), platform.getData('MoRes2'), scene); 
      }

      if (platform.getData('type') === 'door') {

        scene.tweens.add({
          targets: platform,
          alpha: 0.5,
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut'
        }); 

      }

    });
  }

  function GenerateDebug(scene) {
    // Graphics object for drawing outlines
    const graphics = scene.add.graphics();
    graphics.lineStyle(2, 0xff0000, 1); // Red color for the outline

    // Define the upside-down gravity area
    const upsideDownArea = new Phaser.Geom.Rectangle(0, 530, config.width, 10);

    // Draw the outline for the upside-down gravity area
    graphics.strokeRectShape(upsideDownArea);

    // Get the scene's width and height
    const sceneWidth = config.width;
    const sceneHeight = config.height;

    // Draw a grid of 32 by 32 squares
    const gridSize = 64;
    for (let x = 0; x < sceneWidth; x += gridSize) {
        for (let y = 0; y < sceneHeight; y += gridSize) {
            graphics.strokeRect(x, y, gridSize, gridSize);
        }
    }
}

  function GenerateOtherPlatforms(scene){

    

    //bouncey moving
    bounceGank = scene.physics.add.image(490, 700, "bounce").setScale(0.3);
    bounceGank.setImmovable(true);
    bounceGank.body.allowGravity = false;
    bounceGank.setVelocityX(50);

    /*
    //gank1
    gank = scene.physics.add.image(900, 830, "gank").setScale(0.3);
    gank.setImmovable(true);
    gank.body.allowGravity = false;
    gank.setVelocityX(50);

    //gank2
    gank2 = scene.physics.add.image(1260, 830, "gank").setScale(0.3);
    gank2.setImmovable(true);
    gank2.body.allowGravity = false;
    gank2.setVelocityX(80);

    //gank3
    gank3 = scene.physics.add.image(1350, 700, "gank").setScale(0.3);
    gank3.setImmovable(true);
    gank3.body.allowGravity = false;
    gank3.setVelocityX(80);

    //gank4
    gank4 = scene.physics.add.image(860, 700, "gank").setScale(0.3);
    gank4.setImmovable(true);
    gank4.body.allowGravity = false;
    gank4.setVelocityX(80);

    

    //vertgank
    vertgank = scene.physics.add.image(1500, 830, "gank").setScale(0.3);
    vertgank.setImmovable(true);
    vertgank.body.allowGravity = false;
    vertgank.setVelocityY(-50);

    */

    move = scene.physics.add.image(120, 470, "move");
    move.setImmovable(false);
    move.body.allowGravity = true;
    move.setScale(0.25);
    move.setGravityY(-1000);

  }

  function GeneratePlayerAnimations(scene, sheet){

    // Move left
    scene.anims.create({
      key: "left",
      frames: scene.anims.generateFrameNumbers(sheet, { start: 8, end: 11 }),
      frameRate: 7,
      repeat: -1,
    });

    // Turn-strait forward
    scene.anims.create({
      key: "idle",
      frames: scene.anims.generateFrameNumbers(sheet, { start: 0, end: 3 }),
      frameRate: 5,
    });

    // Move right
    scene.anims.create({
      key: "right",
      frames: scene.anims.generateFrameNumbers(sheet, { start: 4, end: 7 }),
      frameRate: 7,
      repeat: -1,
    });

    // Shift slide not working
    scene.anims.create({
      key: "shift",
      repeat: -1,
    });
  }

  function loadNextLevel(scene) {

    console.log("Loading next level...");
    player.setPosition(50, 770);
    CurrentLevel++;
    
    if (CurrentLevel > 2) {  // Assuming you have only 2 levels
        CurrentLevel = 1;  // Reset to first level if all levels are completed
    }
    
     // Clear existing platforms
     platforms.clear(true, true);
    
    // Generate new platforms based on the current level
    if (CurrentLevel === 1) {
      platforms = GeneratePlatforms(scene, PlatformData2);
    } else if (CurrentLevel === 2) {
      platforms = GeneratePlatforms(scene, PlatformData);
    }
    
    applyPlatformRules(scene);
    
    // Re-add collision between player and new platforms
    scene.physics.add.collider(player, platforms);
    
    
  }

  function preload() {
    // Load other assets

    this.load.image("bcl", `assets/blocks/${ChosenBlock[0]}`);
    this.load.image("bcld", `assets/blocks/${ChosenBlock[1]}`);
    this.load.image("bcr", `assets/blocks/${ChosenBlock[2]}`);
    this.load.image("bcrd", `assets/blocks/${ChosenBlock[3]}`);
    this.load.image("bounce", `assets/blocks/${ChosenBlock[8]}`);
    this.load.image("flat", `assets/blocks/${ChosenBlock[4]}`);
    this.load.image("flipped", `assets/blocks/${ChosenBlock[5]}`);
    this.load.image("float", `assets/blocks/${ChosenBlock[6]}`);
    this.load.image("gank", `assets/blocks/${ChosenBlock[7]}`);
    this.load.image("bouncegank", `assets/blocks/${ChosenBlock[8]}`);
    this.load.image("vertgank", `assets/blocks/${ChosenBlock[7]}`);
    this.load.image("move", `assets/blocks/${ChosenBlock[9]}`);

    this.load.image("dust", "assets/dust01.png");

    this.load.image('door', "assets/blocks/Door.png");  
    

    this.load.spritesheet('charTest', `assets/${ChosenImage}`, {
      frameWidth: 22,
      frameHeight: 32,
    });

    this.load.spritesheet('char', "assets/character.png", {
      frameWidth: 22,
      frameHeight: 42,
    });
  }

  function create() {

    if (config.physics.arcade.debug == true) {
      GenerateDebug(this);
    }

    player = this.physics.add.sprite(45, 770, 'char').setScale(1).setBounce(0.0).setCollideWorldBounds(false);

    GeneratePlayerAnimations(this, 'char');

    // Create particle emitter
    this.dustEmitter = this.add.particles("dust").createEmitter({
      x: 0,
      y: 0,
      lifespan: 200,
      speed: { min: -100, max: 100 },
      scale: { start: 0.2, end: 0 },
      quantity: 3,
      on: false, // The emitter will be triggered manually
    });

    // debug texts
    DebugText_DeathCount = this.add.text(10, 10, "", { font: "40px Arial", fill: "#34AD07" }).setAlpha(0.7);
    DebugText_XandY = this.add.text(10, 70, "", { fill: "#00ff00" });
    DebugText_Timer = this.add.text(10, 40, "Time: 0", { font: "40px Arial", fill: "#ff0000" }).setAlpha(0.7);
    DebugText_XandYPlayer = this.add.text(10, 10, "", { fill: "#00ff00" });

    startTime = this.time.now;

    GenerateOtherPlatforms(this);

    

    // Generate platforms using PlatformData

    platforms = GeneratePlatforms(this, PlatformData);
    applyPlatformRules(this);

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, bounce);
    this.physics.add.collider(player, bounce2);
    this.physics.add.collider(player, bounce3);
    this.physics.add.collider(player, bounceGank);
    this.physics.add.collider(player, vertgank);
    this.physics.add.collider(player, move);
    this.physics.add.collider(move, platforms);
    //this.physics.add.collider(player, Door, handlePlatformCollisions, null, this);

    //this creates the key inputs for the movment and the reset
    cursors = this.input.keyboard.createCursorKeys();
  }

  function update() {

    platforms.children.entries.forEach((platform) => {

      if (platform.getData('type') === 'flat' && Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), platform.getBounds())) {
        console.log('Flat platform');
      }

      if (platform.getData('type') === 'door' && Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), platform.getBounds())) {
        loadNextLevel(this);
        console.log('Door platform');
      }

      if (platform.getData('type') === 'bounce' && Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), platform.getBounds())) {
        player.setVelocityY(platform.getData('bounce'));
        console.log('Bounce platform');
      }

      if (platform.getData('type') === 'bouncegank' && Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), platform.getBounds())) {
        player.setVelocityY(platform.getData('bounce'));
        console.log('BounceGank platform');
      }

      if (platform.getData('type') === 'gank' && Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), platform.getBounds())) {
        console.log('Gank platform');
      }

      try{
        platform.body.reset();
      }

      catch {
        console.log(" o  shit");
      }

    });

    // Trigger the dust effect when the player jumps
    if (cursors.up.isDown && player.body.touching.down) {
      this.dustEmitter.setPosition(player.x, player.y + player.height / 2); // Set the position at player's feet
      this.dustEmitter.explode(); // Trigger the emitter
      player.setVelocityY(-300);
    }

    // Trigger the dust effect when   the player runs
    if (cursors.left.isDown) {
      player.setVelocityX(-160);
      player.anims.play("left", true);

      if (player.body.touching.down) {
        this.dustEmitter.setPosition(
          player.x + player.width / 2,
          player.y + player.height / 2
        ); // Position the emitter behind the player
        this.dustEmitter.explode();
      }
    }

    // Trigger the dust effect when   the player runs
    else if (cursors.right.isDown) {
      player.setVelocityX(160);
      player.anims.play("right", true);

      if (player.body.touching.down) {
        this.dustEmitter.setPosition(
          player.x - player.width / 2,
          player.y + player.height / 2
        ); // Position the emitter behind the player
        this.dustEmitter.explode();
      }
    } else {
      player.setVelocityX(0);
      player.anims.play("idle", true);
    }

    //upside down gravity
    if (player.y < 520) {
      player.setGravityY(-1600);
      player.flipY = true;
    } else if (player.y > 520) {
      player.setGravityY(0);
      player.flipY = false;
    }

    //death counter and reset
    if (player.y > 850 || player.x < -5 || player.x > 1519 || player.y < -5) {
      player.setPosition(50, 770);
      death++;
      player.setVelocity(0);
    }

    //debug flying with shift
    if (cursors.up.shiftKey) {
      player.body.setVelocity(0);

      if (cursors.left.isDown) {
        player.body.setVelocityX(-300);
      } else if (cursors.right.isDown) {
        player.body.setVelocityX(300);
      }

      if (cursors.up.isDown) {
        player.body.setVelocityY(-300);
      } else if (cursors.down.isDown) {
        player.body.setVelocityY(300);
      }
    }

    /*

    //gank movement
    if (gank.x >= 1140) {
      gank.setVelocityX(-75);
    } else if (gank.x <= 900) {
      gank.setVelocityX(75);
    }
    if (gank2.x >= 1400) {
      gank2.setVelocityX(-50);
    } else if (gank2.x <= 1260) {
      gank2.setVelocityX(50);
    }
    if (gank3.x >= 1400) {
      gank3.setVelocityX(-125);
    } else if (gank3.x <= 1000) {
      gank3.setVelocityX(125);
    }
    if (gank4.x >= 860) {
      gank4.setVelocityX(-55);
    } else if (gank4.x <= 700) {
      gank4.setVelocityX(55);
    }


    //vertgank movement
    if (vertgank.y >= 830) {
      vertgank.setVelocityY(-75);
    } else if (vertgank.y <= 690) {
      vertgank.setVelocityY(75);
    }

     */ 

    //bounceGank
    if (bounceGank.x <= 300) {
      bounceGank.setVelocityX(55);
    } else if (bounceGank.x >= 500) {
      bounceGank.setVelocityX(-55);
    }

    if (move.body.touching.right && player.body.touching.left) {
      move.setVelocityX(-80);
    } else if (player.body.touching.right && move.body.touching.left) {
      move.setVelocityX(80);
    } else {
      move.setVelocityX(0);
    }

    //Gank and bounce and ice end --------------------------------------------------------

    //reset char to spawn
    if (cursors.space.isDown) {
      player.setPosition(50, 770);
      player.setVelocity(0);
    }

    //player jump
    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-300);
    } else if (cursors.up.isDown && player.y < 550 && player.body.touching.up) {
      player.setVelocityY(300);
    }
    //player Walk left
    else if (cursors.left.isDown) {
      player.setVelocityX(-160);
      player.anims.play("left", true);
    }

    //player Walk right
    else if (cursors.right.isDown) {
      player.setVelocityX(160);
      player.anims.play("right", true);
    }

    //player idle
    else {
      player.setVelocityX(0);
      player.anims.play("idle", true);
    }

    //player movement end------------------------

    var pointer = this.input.activePointer;
    let elapsedTime = Math.floor((this.time.now - startTime) / 1000);

    DebugText_XandY.setText(["x: " + pointer.worldX, "y: " + pointer.worldY]);

    DebugText_XandYPlayer.setText(["x: " + player.x, "y: " + player.y]);

    DebugText_DeathCount.setText("Deaths : " + death);

    DebugText_Timer.setText("Time: " + elapsedTime);
  
  }
});


