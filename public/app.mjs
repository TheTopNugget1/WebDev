import { ChosenImage } from "./largestImage.js";

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
      debug: true, // To show debut stuff
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
let gank;
let gank2;
let gank3;
let gank4;
let vertgank;
let move;
let platforms;
let cursors;
let player;
let death = 0;
let PlatformData = [];

PlatformData = [
  // Floor platforms
  { x: 32, y: 850, tag: "flat", scale: 0.5 },
  { x: 96, y: 850, tag: "flat", scale: 0.5 },
  { x: 160, y: 850, tag: "flat", scale: 0.5 },
  { x: 500, y: 850, tag: "flat", scale: 0.5 },
  { x: 840, y: 850, tag: "flat", scale: 0.5 },
  { x: 1200, y: 850, tag: "flat", scale: 0.5 },

  // Corner platforms
  { x: 182, y: 828, tag: "bcrd", scale: 0.5 },
  { x: 182, y: 815, tag: "bcr", scale: 0.5 },
  { x: 171, y: 815, tag: "bcl", scale: 0.5 },
  { x: 470, y: 828, tag: "bcld", scale: 0.5 },
  { x: 530, y: 828, tag: "bcrd", scale: 0.5 },
  { x: 810, y: 828, tag: "bcld", scale: 0.5 },
  { x: 870, y: 828, tag: "bcrd", scale: 0.5 },
  { x: 1170, y: 828, tag: "bcld", scale: 0.5 },
  { x: 1230, y: 828, tag: "bcrd", scale: 0.5 },

  // Floating platforms
  { x: 280, y: 830, tag: "float", scale: 0.3 },
  { x: 380, y: 830, tag: "float", scale: 0.25 },
  { x: 620, y: 830, tag: "float", scale: 0.2 },
  { x: 720, y: 830, tag: "float", scale: 0.15 },
  { x: 1430, y: 830, tag: "float", scale: 0.25 },
  { x: 900, y: 700, tag: "float", scale: 0.25 },
  { x: 550, y: 625, tag: "float", scale: 0.25 },
  { x: 1430, y: 660, tag: "float", scale: 0.25 },
  { x: 60, y: 600, tag: "float", scale: 0.2 },
  { x: 60, y: 464, tag: "float", scale: 0.25 },
  { x: 343, y: 464, tag: "float", scale: 0.25 },

  //flipped platforms
  { x: 108, y: 435, tag: "flipped", scale: 0.5 },
  { x: 172, y: 435, tag: "flipped", scale: 0.5 },
  { x: 234, y: 435, tag: "flipped", scale: 0.5 },
  { x: 295, y: 435, tag: "flipped", scale: 0.5 },
];

function GeneratePlatforms(scene, array) {
  let platforms = scene.physics.add.staticGroup();
  array.forEach((data) => {
    let platform = platforms
      .create(data.x, data.y, data.tag)
      .setScale(data.scale)
      .refreshBody()
      .setImmovable(true)
      .setGravityY(0).body.allowGravity;
  });
  return platforms;
}

function GenerateDebug(scene) {
  // Graphics object for drawing outlines
  const graphics = scene.add.graphics();
  graphics.lineStyle(2, 0xff0000, 1); // Red color for the outline

  // Define the upside-down gravity area
  const upsideDownArea = new Phaser.Geom.Rectangle(0, 535, config.width, 10);

  // Draw the outline for the upside-down gravity area
  graphics.strokeRectShape(upsideDownArea);
}

function GenerateOtherPlatforms(scene){
  //bouncey 1
  bounce = scene.physics.add.image(210, 700, "bounce").setScale(0.25);
  bounce.setImmovable(true);
  bounce.body.allowGravity = false;

  //bouncey 2
  bounce2 = scene.physics.add.image(600, 700, "bounce").setScale(0.25);
  bounce2.setImmovable(true);
  bounce2.body.allowGravity = false;

  //bouncey 3
  bounce3 = scene.physics.add.image(60, 700, "bounce").setScale(0.25);
  bounce3.setImmovable(true);
  bounce3.body.allowGravity = false;

  //bouncey moving
  bounceGank = scene.physics.add.image(490, 700, "bounce").setScale(0.25);
  bounceGank.setImmovable(true);
  bounceGank.body.allowGravity = false;
  bounceGank.setVelocityX(50);

  //gank1
  gank = scene.physics.add.image(900, 830, "gank").setScale(0.18);
  gank.setImmovable(true);
  gank.body.allowGravity = false;
  gank.setVelocityX(50);

  //gank2
  gank2 = scene.physics.add.image(1260, 830, "gank").setScale(0.15);
  gank2.setImmovable(true);
  gank2.body.allowGravity = false;
  gank2.setVelocityX(80);

  //gank3
  gank3 = scene.physics.add.image(1350, 700, "gank").setScale(0.25);
  gank3.setImmovable(true);
  gank3.body.allowGravity = false;
  gank3.setVelocityX(80);

  //gank4
  gank4 = scene.physics.add.image(860, 700, "gank").setScale(0.15);
  gank4.setImmovable(true);
  gank4.body.allowGravity = false;
  gank4.setVelocityX(80);

  //vertgank
  vertgank = scene.physics.add.image(1500, 830, "gank").setScale(0.2);
  vertgank.setImmovable(true);
  vertgank.body.allowGravity = false;
  vertgank.setVelocityY(-50);

  move = scene.physics.add.image(120, 480, "move");
  move.setImmovable(false);
  move.body.allowGravity = true;
  move.setScale(0.75);
  move.setGravityY(-800);

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

function preload() {
  // Load other assets

  this.load.image("float", "assets/blocks/float.png");
  this.load.image("flat", "assets/blocks/flat.png");
  this.load.image("flipped", "assets/blocks/flipped.png");
  this.load.image("bcr", "assets/blocks/bcr.png");
  this.load.image("bcl", "assets/blocks/bcl.png");
  this.load.image("bcld", "assets/blocks/bcld.png");
  this.load.image("bcrd", "assets/blocks/bcrd.png");

  this.load.image("bounce", "assets/blocks/ice.png");
  this.load.image("gank", "assets/blocks/gank.png");
  this.load.image("move", "assets/blocks/move.png");
  this.load.image("dust", "assets/dust01.png");

  this.load.spritesheet('charTest', `assets/${ChosenImage}`, {
    frameWidth: 22,
    frameHeight: 32,
  });

  this.load.spritesheet('char', "assets/char4.png", {
    frameWidth: 22,
    frameHeight: 32,
  });
}

function create() {

  if (config.physics.arcade.debug == true) {
    GenerateDebug(this);
  }

  player = this.physics.add.sprite(45, 770, 'charTest').setScale(1).setBounce(0.0).setCollideWorldBounds(true);

  GeneratePlayerAnimations(this, 'charTest');

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
  DebugText_DeathCount = this.add
    .text(10, 10, "", { font: "40px Arial", fill: "#34AD07" })
    .setAlpha(0.7);
  DebugText_XandY = this.add.text(10, 70, "", { fill: "#00ff00" });
  DebugText_Timer = this.add
    .text(10, 40, "Time: 0", { font: "40px Arial", fill: "#ff0000" })
    .setAlpha(0.7);
  DebugText_XandYPlayer = this.add.text(10, 10, "", { fill: "#00ff00" });

  startTime = this.time.now;

  GenerateOtherPlatforms(this);


  // Generate platforms using PlatformData
  platforms = GeneratePlatforms(this, PlatformData);

  //this creates the key inputs for the movment and the reset
  cursors = this.input.keyboard.createCursorKeys();

  this.physics.add.collider(player, platforms);
  this.physics.add.collider(player, bounce);
  this.physics.add.collider(player, bounce2);
  this.physics.add.collider(player, bounce3);
  this.physics.add.collider(player, bounceGank);
  this.physics.add.collider(player, gank);
  this.physics.add.collider(player, gank2);
  this.physics.add.collider(player, gank3);
  this.physics.add.collider(player, gank4);
  this.physics.add.collider(player, vertgank);
  this.physics.add.collider(player, move);
  this.physics.add.collider(move, platforms);
}

function update() {
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
  if (player.y < 535) {
    player.setGravityY(-1600);
    player.flipY = true;
  } else if (player.y > 545) {
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

  //player bouncing on bounce platform
  if (bounce.body.touching.up && player.body.touching.down) {
    player.setVelocityY(-400);
  }
  if (bounce2.body.touching.up && player.body.touching.down) {
    player.setVelocityY(-400);
  }
  if (bounce3.body.touching.up && player.body.touching.down) {
    player.setVelocityY(-450);
  }
  if (bounceGank.body.touching.up && player.body.touching.down) {
    player.setVelocityY(-400);
  }

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
