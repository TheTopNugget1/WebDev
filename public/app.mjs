let hello = "hello";


import { ChosenBlock } from "./SelectedImage.js";

document.addEventListener('DOMContentLoaded', () => {

  let debugMode = false; // Global variable to track debug state

  let scaleFact = 1;
  let gameWidth = 1400 * scaleFact;
  let gameHeight = 700 * scaleFact;

  const gridWidth = 40;  // Number of columns
  const gridHeight = 20; // Number of rows  

  let gridBlockWidth;
  let gridBlockHeight;


  function resetSX(){
    let gameWidth = 1400 * scaleFact;
    return gameWidth;
  }

  function resetSY (){
    let gameHeight = 700 * scaleFact;
    return gameHeight;
  }

  while (true) {

    while (gameWidth <= window.innerWidth - 15 || gameHeight <= window.innerHeight - 100){
      scaleFact += 0.000001;
      gameWidth = resetSX();
      gameHeight = resetSY();
    }

    while (gameWidth >= window.innerWidth - 15 || gameHeight >= window.innerHeight - 100){
      scaleFact -= 0.000001;
      gameWidth = resetSX();
      gameHeight = resetSY();
    }

    break;
  }

  function calculateGridBlockSize() {
    gridBlockWidth = gameWidth / gridWidth;
    gridBlockHeight = gameHeight / gridHeight;

  }

  function getPixCord(gridX, gridY) {
    const x = (gridX - 1) * gridBlockWidth;
    const y = (gridY - 1) * gridBlockHeight;
    return {x, y} ;
  }

  function velocity(velocity){

    let gridVel = velocity * gameHeight / 700;

    return gridVel;

  }

  function scalePlatform() {
    const scaleX = (gridBlockWidth / 132) + 0.01;
    const scaleY = gridBlockHeight / 132;
    return [scaleX, scaleY];
  }

  function playerDie(){
    player.setPosition(getPixCord(2, 18).x, getPixCord(2, 18).y );
    player.setVelocity(0);
    KeyFollow = false;

    if(cursors.space.isDown != true){
      death++;
    }

    move.setPosition(getPixCord(10, 2).x, getPixCord(10, 2).y );
    move.setVelocity(0);
  }

  var config = {
    type: Phaser.AUTO,
    //i made the game full screen if you open it in a new tab
    width: gameWidth,
    height: gameHeight,

    disableContextMenu: true,

    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: velocity(800) },
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
  let DebugText_XandY_Grid;
  let DebugText_DeathCount;
  let DebugText_Timer;
  let DebugText_XandYPlayer;
  let DebugText_CurrentLevel;
  let Construct;

  let startTime;
  let move;
  let platforms;
  let cursors;
  let player;
  let death = 0;
  let PlatformData1 = [];
  let PlatformData2 = [];
  let PlatformData3 = [];
  let PlatformData4 = [];
  let PlatformData5 = [];

  let KeyFollow = false;

  let CurrentLevel = 1;

  let score = 0;


  calculateGridBlockSize();

  console.log(gameWidth, gameHeight, gridBlockWidth, gridBlockHeight);

  PlatformData1 = [

    { x: 2, y: 20, tag: "flat", scale: [1, 1] }, 
    { x: 3, y: 20, tag: "flat", scale: [1, 1] }, 

    { x: 4, y: 20, tag: "flat", scale: [1, 1] }, 
    { x: 5, y: 20, tag: "flat", scale: [1, 1] },
    { x: 6, y: 20, tag: "flat", scale: [1, 1] },
    { x: 7, y: 20, tag: "flat", scale: [1, 1] },

    { x: 5.5, y: 19.8, tag: "spikes", scale: [1, 1] },

    { x: 4, y: 19, tag: "coin", scale: [1, 1] },
    
    { x: 8, y: 20, tag: "flat", scale: [1, 1] },
    { x: 9, y: 20, tag: "flat", scale: [1, 1] },
    { x: 10, y: 20, tag: "flat", scale: [1, 1] },
    { x: 11, y: 20, tag: "flat", scale: [1, 1] },
    { x: 12, y: 20, tag: "flat", scale: [1, 1] },

    { x: 12, y: 18.5, tag: "float", scale: [1, 1] },
    { x: 12, y: 19.5, tag: "float", scale: [1, 1] },
    
    { x: 8, y: 18, tag: "key", scale: [1.5, 1.5] },

    { x: 13, y: 20, tag: "flat", scale: [1, 1] },
    { x: 14, y: 20, tag: "flat", scale: [1, 1] },
    { x: 15, y: 20, tag: "flat", scale: [1, 1] },

    { x: 16, y: 20, tag: "bounce", scale: [1, 1], bounce: -400},

    { x: 21, y: 20, tag: "gank", scale: [1, 1], MoRes1: 25},
    { x: 20, y: 20, tag: "float", scale: [1, 1] },

    { x: 27, y: 20, tag: "flat", scale: [1, 1] },
    { x: 28, y: 20, tag: "flat", scale: [1, 1] },
    { x: 29, y: 20, tag: "flat", scale: [1, 1] },
    { x: 30, y: 20, tag: "flat", scale: [1, 1] },
    { x: 31, y: 20, tag: "flat", scale: [1, 1] },
    { x: 32, y: 20, tag: "flat", scale: [1, 1] },

    { x: 34, y: 20, tag: "bounce", scale: [1, 1], bounce: -400},

    { x: 35.5, y: 18.5, tag: "spikes", scale: [1, 1] },

    { x: 37, y: 20, tag: "bounce", scale: [1, 1], bounce: -400},

    { x: 40, y: 20, tag: "vertgank", scale: [1, 1], MoRes1: 15 },

    
    { x: 40, y: 20, tag: "float", scale: [1, 1] },

    { x: 37, y: 15, tag: "float", scale: [1, 1] },

    { x: 36, y: 14, tag: "bounce", scale: [1, 1], bounce: -700},

    { x: 38, y: 2, tag: "flipped", scale: [1, 1] },
    { x: 37, y: 2, tag: "flipped", scale: [1, 1] },
    { x: 36, y: 2, tag: "flipped", scale: [1, 1] },
    { x: 35, y: 2, tag: "flipped", scale: [1, 1] },

    { x: 35, y: 6, tag: "flipped", scale: [1, 1] },
    { x: 36, y: 6, tag: "flipped", scale: [1, 1] },

    { x: 40, y: 5, tag: "coin", scale: [1, 1] },

    { x: 31.5, y: 2.5, tag: "float", scale: [1, 1] },

    { x: 30, y: 2, tag: "gank", scale: [1, 1], MoRes1: 27 },

    { x: 23, y: 3, tag: "flipped", scale: [1, 1] },

    { x: 22, y: 3, tag: "flipped", scale: [1, 1] },
    { x: 20, y: 4, tag: "flipped", scale: [1, 1] },
    { x: 18, y: 5, tag: "flipped", scale: [1, 1] },
    { x: 20, y: 7, tag: "flipped", scale: [1, 1] },
    { x: 22, y: 9, tag: "flipped", scale: [1, 1] },

    { x: 20, y: 7, tag: "flipped", scale: [1, 1] },

    { x: 22, y: 15, tag: "bounce", scale: [1, 1], bounce: -500},

    { x: 25, y: 9, tag: "flipped", scale: [1, 1] },

    { x: 26, y: 13, tag: "flat", scale: [1, 1] },
    { x: 27, y: 13, tag: "flat", scale: [1, 1] },
  
   
    
    { x: 27, y: 12.2, tag: "door", scale: [0.5, 0.5] }, 

    { x: 16, y: 16, tag: "coin", scale: [1, 1] },
    { x: 18, y: 2, tag: "coin", scale: [1, 1] },
    

  ];

  PlatformData2 = [
    { x: 2, y: 20, tag: "flat", scale: [1, 1] },
    { x: 3, y: 20, tag: "flat", scale: [1, 1] },
    { x: 4, y: 20, tag: "flat", scale: [1, 1] },
    { x: 3, y: 12, tag: "flat", scale: [1, 1] },
    { x: 4, y: 19, tag: "flat", scale: [1, 1] },
    { x: 5, y: 10, tag: "gank", scale: [1, 1], MoRes1: 7 },
    { x: 6, y: 26, tag: "bounce", scale: [1, 1], bounce: -400 },
    { x: 7, y: 19, tag: "key", scale: [1, 1] },
    { x: 8, y: 17, tag: "flat", scale: [1, 1] },
    { x: 9, y: 20, tag: "bouncegank", scale: [1, 1], bounce: -400, MoRes1: 5 },
    { x: 10, y: 20, tag: "flat", scale: [1, 1] },
    { x: 11, y: 20, tag: "coin", scale: [1, 1] },
    { x: 12, y: 19, tag: "float", scale: [1, 1] },
    { x: 13, y: 15, tag: "vertgank", scale: [1, 1], MoRes1: 19 },
    { x: 14, y: 20, tag: "flat", scale: [1, 1] },
    { x: 15, y: 19, tag: "flat", scale: [1, 1] },
    { x: 16, y: 16, tag: "flat", scale: [1, 1] },
    { x: 17, y: 19, tag: "spikes", scale: [1, 1] },
    { x: 18, y: 20, tag: "float", scale: [1, 1] },
    { x: 19, y: 19, tag: "flat", scale: [1, 1] },
    { x: 20, y: 20, tag: "flat", scale: [1, 1] },
    { x: 21, y: 19, tag: "gank", scale: [1, 1], MoRes1: 22 },
    { x: 22, y: 10, tag: "flat", scale: [1, 1] },
    { x: 23, y: 20, tag: "key", scale: [1, 1] },
    { x: 24, y: 19, tag: "float", scale: [1, 1] },
    { x: 25, y: 17, tag: "coin", scale: [1, 1] },
    { x: 26, y: 20, tag: "flat", scale: [1, 1] },
    { x: 27, y: 19, tag: "spikes", scale: [1, 1] },
    { x: 28, y: 18, tag: "gank", scale: [1, 1], MoRes1: 30 },
    { x: 29, y: 20, tag: "float", scale: [1, 1] },
    { x: 30, y: 19, tag: "vertgank", scale: [1, 1], MoRes1: 20},
    { x: 31, y: 21, tag: "flat", scale: [1, 1] },
    { x: 32, y: 20, tag: "bounce", scale: [1, 1], bounce: -400 },
    { x: 33, y: 19, tag: "flat", scale: [1, 1] },
    { x: 34, y: 17, tag: "bouncegank", scale: [1, 1], bounce: -400, MoRes1: 20 },
    { x: 35, y: 20, tag: "flat", scale: [1, 1] },
    { x: 36, y: 16, tag: "door", scale: [0.5, 0.5] },
    { x: 37, y: 10, tag: "float", scale: [1, 1] },
    { x: 38, y: 14, tag: "flat", scale: [1, 1] },
    { x: 39, y: 19, tag: "spikes", scale: [1, 1] },
    { x: 40, y: 20, tag: "coin", scale: [1, 1] },
  ];

  PlatformData5 = [
    { x: 2, y: 20, tag: "flat", scale: [1, 1] }, 
    { x: 3, y: 20, tag: "flat", scale: [1, 1] }, 

    { x: 3, y: 19, tag: "coin", scale: [1, 1] }, 

    { x: 4, y: 19, tag: "flat", scale: [1, 1] }, 
    { x: 5, y: 21, tag: "flat", scale: [1, 1] }, 
    { x: 8, y: 20, tag: "flat", scale: [1, 1] }, 
    { x: 8, y: 20, tag: "flat", scale: [1, 1] }, 
    { x: 9, y: 20, tag: "flat", scale: [1, 1] }, 
    { x: 10, y: 20, tag: "flat", scale: [1, 1] },

    { x: 17, y: 14, tag: "key", scale: [1, 1] },

    { x: 17, y: 20, tag: "flat", scale: [1, 1] }, 
    { x: 17, y: 19, tag: "flat", scale: [1, 1] }, 
    { x: 17, y: 20, tag: "flat", scale: [1, 1] }, 
    { x: 17, y: 20, tag: "flat", scale: [1, 1] },  
    { x: 15.5, y: 20, tag: "flat", scale: [1, 1] }, 

    { x: 5, y: 5, tag: "flat", scale: [1, 1] }, 
    { x: 8, y: 5, tag: "bounce", scale: [1, 1], bounce: -400},
    { x: 11, y: 5, tag: "bouncegank", scale: [1, 1], bounce: -400, MoRes1: 11, MoRes2: 12 },
    { x: 14, y: 5, tag: "gank", scale: [1, 1], MoRes1: 14, MoRes2: 15 },
    { x: 17, y: 5, tag: "vertgank", scale: [1, 1], MoRes1: 5, MoRes2: 6 },
    { x: 20, y: 5, tag: "door", scale: [0.5, 0.5] }, 
    

    { x: 20, y: 18, tag: "flat", scale: [1, 1] }, 

    { x: 17, y: 20, tag: "bounce", scale: [1, 1], bounce: -400},
    { x: 20, y: 20, tag: "bouncegank", scale: [1, 1], bounce: -400, MoRes1: 20, MoRes2: 25 },
    { x: 17, y: 20, tag: "gank", scale: [1, 1], MoRes1: 17, MoRes2: 20 },
    { x: 17, y: 20, tag: "gank", scale: [1, 1], MoRes1: 17, MoRes2: 20 },
    { x: 17, y: 20, tag: "vertgank", scale: [1, 1], MoRes1: 20, MoRes2: 16 },
    { x: 20, y: 20, tag: "door", scale: [0.5, 0.5] }, 
  ];

  PlatformData3 = [

    { x: 2, y: 20, tag: "flat", scale: [1, 1] }, 
    { x: 3, y: 20, tag: "flat", scale: [1, 1] }, 

    { x: 4, y: 20, tag: "flat", scale: [1, 1] }, 
    { x: 5, y: 20, tag: "flat", scale: [1, 1] },
    { x: 6, y: 20, tag: "flat", scale: [1, 1] },
    { x: 7, y: 20, tag: "flat", scale: [1, 1] },
    { x: 8, y: 20, tag: "flat", scale: [1, 1] },
    { x: 9, y: 20, tag: "flat", scale: [1, 1] },
    { x: 10, y: 20, tag: "flat", scale: [1, 1] },
    { x: 11, y: 20, tag: "flat", scale: [1, 1] },
    { x: 12, y: 20, tag: "flat", scale: [1, 1] },

    { x: 12, y: 18.5, tag: "float", scale: [1, 1] },
    
    { x: 8, y: 18, tag: "key", scale: [1.5, 1.5] },

    { x: 13, y: 20, tag: "flat", scale: [1, 1] },
    { x: 14, y: 20, tag: "flat", scale: [1, 1] },
    { x: 15, y: 20, tag: "flat", scale: [1, 1] },

    { x: 16, y: 20, tag: "bounce", scale: [1, 1], bounce: -400},

    { x: 20, y: 20, tag: "gank", scale: [1, 1], MoRes1: 20, MoRes2: 25 },
    { x: 20, y: 20, tag: "float", scale: [1, 1] },

    { x: 27, y: 20, tag: "flat", scale: [1, 1] },
    { x: 28, y: 20, tag: "flat", scale: [1, 1] },
    { x: 29, y: 20, tag: "flat", scale: [1, 1] },
    { x: 30, y: 20, tag: "flat", scale: [1, 1] },
    { x: 31, y: 20, tag: "flat", scale: [1, 1] },
    { x: 32, y: 20, tag: "flat", scale: [1, 1] },

    { x: 34, y: 20, tag: "bounce", scale: [1, 1], bounce: -400},

    { x: 37, y: 20, tag: "bounce", scale: [1, 1], bounce: -400},

    { x: 40, y: 20, tag: "vertgank", scale: [1, 1], MoRes1: 20, MoRes2: 15 },

    { x: 40, y: 15, tag: "flat", scale: [1, 1] },

    { x: 37, y: 15, tag: "float", scale: [1, 1] },

  
   
    
    { x: 31, y: 19.2, tag: "door", scale: [0.5, 0.5] }, 

  ];

  PlatformData4 = [

    { x: 2, y: 20, tag: "flat", scale: [1, 1] }, 
    { x: 3, y: 20, tag: "flat", scale: [1, 1] }, 

    { x: 4, y: 20, tag: "flat", scale: [1, 1] }, 
    { x: 5, y: 20, tag: "flat", scale: [1, 1] },
    { x: 6, y: 20, tag: "flat", scale: [1, 1] },
    { x: 7, y: 20, tag: "flat", scale: [1, 1] },
    { x: 8, y: 20, tag: "flat", scale: [1, 1] },
    { x: 9, y: 20, tag: "flat", scale: [1, 1] },
    { x: 10, y: 20, tag: "flat", scale: [1, 1] },
    { x: 11, y: 20, tag: "flat", scale: [1, 1] },
    { x: 12, y: 20, tag: "flat", scale: [1, 1] },

    { x: 12, y: 18.5, tag: "float", scale: [1, 1] },
    
    { x: 8, y: 18, tag: "key", scale: [1, 1] },

    { x: 13, y: 20, tag: "flat", scale: [1, 1] },
    { x: 14, y: 20, tag: "flat", scale: [1, 1] },
    { x: 15, y: 20, tag: "flat", scale: [1, 1] },

    { x: 16, y: 20, tag: "bounce", scale: [1, 1], bounce: -400},

    { x: 20, y: 20, tag: "gank", scale: [1, 1], MoRes1: 20, MoRes2: 25 },
    { x: 20, y: 20, tag: "float", scale: [1, 1] },

    { x: 27, y: 20, tag: "flat", scale: [1, 1] },
    { x: 28, y: 20, tag: "flat", scale: [1, 1] },
    { x: 29, y: 20, tag: "flat", scale: [1, 1] },
    { x: 30, y: 20, tag: "flat", scale: [1, 1] },
    { x: 31, y: 20, tag: "flat", scale: [1, 1] },
    { x: 32, y: 20, tag: "flat", scale: [1, 1] },

    { x: 34, y: 20, tag: "bounce", scale: [1, 1], bounce: -400},

    { x: 37, y: 20, tag: "bounce", scale: [1, 1], bounce: -400},

    { x: 40, y: 20, tag: "vertgank", scale: [1, 1], MoRes1: 20, MoRes2: 15 },

    { x: 40, y: 15, tag: "flat", scale: [1, 1] },

    { x: 37, y: 15, tag: "float", scale: [1, 1] },

  
   
    
    { x: 31, y: 19.2, tag: "door", scale: [0.5, 0.5] }, 
  ];

  function movePlatformX(platform, MoRes1, scene) {

    MoRes1 = getPixCord(MoRes1, 1).x;
    
    const duration = 1000; // Duration for the movement
    scene.tweens.timeline({ 
        targets: platform,
        ease: 'Sine.easeInOut',
        loop: -1, // Loop indefinitely
        tweens: [
            { x: MoRes1, duration: duration, yoyo: true },
        ]
    });
  }

  function movePlatformY(platform, MoRes1, scene) {

    MoRes1 = getPixCord(1, MoRes1).y;

    const duration = 3000; // Duration for the movement
    scene.tweens.timeline({ 
        targets: platform,
        ease: 'Sine.easeInOut',
        loop: -1, // Loop indefinitely
        tweens: [
            { y: MoRes1, duration: duration, yoyo: true },
        ]
    });
  }

  function GeneratePlatforms(scene, array) {
    let platforms = scene.physics.add.staticGroup();
    array.forEach((data) => {
      try {
        const { x, y } = getPixCord(data.x, data.y);

        let platform = platforms
          .create(x, y, data.tag)
          .setScale(scalePlatform()[0] * data.scale[0], scalePlatform()[1] * data.scale[1])
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
        platform.setData('x', data.x);
        platform.setData('y', data.y);
        platform.body.reset();
      }
      catch(err) {
        console.error("Error creating platforms: ", err);
        platforms.setAngle(0);
      }
    });

    move = scene.physics.add.image(getPixCord(10, 2).x, getPixCord(10, 2).y, "move");
    move.setImmovable(false);
    move.body.allowGravity = true;
    move.setScale(scalePlatform()[0]*0.75, scalePlatform()[1]*0.75)
    move.setGravityY(1000);
  
    return platforms;
  }

  function applyPlatformRules(scene) {

    platforms.children.entries.forEach((platform) => {

      if (platform.getData('type') === 'gank' || platform.getData('type') === 'bouncegank') {
        movePlatformX(platform, platform.getData('MoRes1'), scene); 
      }

      if (platform.getData('type') === 'vertgank') {
        movePlatformY(platform, platform.getData('MoRes1'), scene); 
      }

      //door fade in out
      // dore doesnt colide
      if (platform.getData('type') === 'door') {

        platform.body.checkCollision.none = true;

        scene.tweens.add({
          targets: platform,
          alpha: 0.5,
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut'
        }); 

      }

      //coin bounces
      // coin doesnt colide
      if (platform.getData('type') === 'coin') {

        platform.body.checkCollision.none = true;

        scene.tweens.add({
          targets: platform,
          y: platform.y + 10,
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut'
        }); 

      }

      // key doesnt collide
      if (platform.getData('type') === 'key') {

        platform.body.checkCollision.none = true;
      }

    });

    scene.physics.add.collider(player, platforms);;
    scene.physics.add.collider(player, move);
    scene.physics.add.collider(move, platforms);

  }

  function GenerateDebug(scene) {

    // Graphics object for drawing outlines
    const graphics = scene.add.graphics();
    graphics.lineStyle(2, 0xff0000, 1); // Red color for the outline

    // Define the upside-down gravity area
    const upsideDownArea = new Phaser.Geom.Rectangle(0, getPixCord(2, 10).y, config.width, 10);

    // Draw the outline for the upside-down gravity area
    graphics.strokeRectShape(upsideDownArea);

    // Draw the grid
    for (let x = 0; x <= gameWidth; x += gridBlockWidth) {
        for (let y = 0; y <= gameHeight; y += gridBlockHeight) {
            graphics.strokeRect(x, y, gridBlockWidth, gridBlockHeight);
        }
    }

    DebugText_XandYPlayer = scene.add.text(10, 10, "", { fill: "#00ff00" });
    DebugText_XandY = scene.add.text(10, 50, "", { fill: "#00ff00" });
    DebugText_XandY_Grid = scene.add.text(10, 90, "", { fill: "#00ff00" });

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

    player.setPosition(getPixCord(2, 18).x, getPixCord(2, 18).y).setScale(scalePlatform()[0]*4, scalePlatform()[1]*4);

    // Clear existing platforms
    platforms.clear(true, true);
    move.destroy();
    
    // Generate new platforms based on the current level
    if (CurrentLevel === 1) {
      Construct = scene.add.text(getPixCord(15, 1).x, getPixCord(1, 10).y, "Apologies, this level is under construction \n I hope you enjoyed the demo", { font: "40px Arial", fill: "#34AD07" }).setAlpha(0.7);
      platforms = GeneratePlatforms(scene, PlatformData2);
    } 
    else if (CurrentLevel === 2) {
      platforms = GeneratePlatforms(scene, PlatformData3);
    }
    else if (CurrentLevel === 3) {
      platforms = GeneratePlatforms(scene, PlatformData4);
    }
      
    CurrentLevel++;

    console.log(CurrentLevel);

    applyPlatformRules(scene);  

    KeyFollow = false;
    
  }

  function preload() {
    // Load other assets

    this.load.image("bcl", `assets/blocks/${ChosenBlock[0]}`);
    this.load.image("bcld", `assets/blocks/${ChosenBlock[1]}`);
    this.load.image("bcr", `assets/blocks/${ChosenBlock[2]}`);
    this.load.image("bcrd", `assets/blocks/${ChosenBlock[3]}`);
    this.load.image('door', `assets/blocks/${ChosenBlock[4]}`);
    this.load.image("flat", `assets/blocks/${ChosenBlock[5]}`);
    this.load.image("flipped", `assets/blocks/${ChosenBlock[6]}`);
    this.load.image("float", `assets/blocks/${ChosenBlock[7]}`);
    this.load.image("gank", `assets/blocks/${ChosenBlock[8]}`);
    this.load.image("vertgank", `assets/blocks/${ChosenBlock[8]}`);
    this.load.image("bounce", `assets/blocks/${ChosenBlock[9]}`);
    this.load.image("bouncegank", `assets/blocks/${ChosenBlock[9]}`);
    this.load.image("move", `assets/blocks/${ChosenBlock[10]}`);
    this.load.image("background", `assets/blocks/${ChosenBlock[11]}`)
    this.load.image("spikes", `assets/blocks/${ChosenBlock[12]}`);
   

    this.load.image("dust", "assets/items/dust.png");   
    this.load.image('key', "assets/items/key.png");
    this.load.image('coin', "assets/items/coin.png");
    

    this.load.spritesheet('char', "assets/character.png", {
      frameWidth: 22,
      frameHeight: 42,
    });
  }

  function create() {

    let backs = this.physics.add.staticGroup();

    let back = backs.create(getPixCord(21, 10).x, getPixCord(10, 10).y, 'background');
    back.setScale(scalePlatform()[0] *5.6, scalePlatform()[1] *5);
    back.setGravityY(0);
    back.setImmovable(true);
    back.setAlpha(0.5);

    if (config.physics.arcade.debug == true) {
      GenerateDebug(this);
    }

    player = this.physics.add.sprite(getPixCord(2, 18).x, getPixCord(2, 18).y, 'char')
    .setScale(scalePlatform()[0] *4, scalePlatform()[1] *4)
    .setBounce(0.0)
    .setCollideWorldBounds(false);

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
    DebugText_DeathCount = this.add.text(10, 10, "Deaths = 0", { font: "40px Arial", fill: "#34AD07" }).setAlpha(0.7);
    DebugText_Timer = this.add.text(10, 55, "Time: 0", { font: "40px Arial", fill: "#ff0000" }).setAlpha(0.7);
    DebugText_CurrentLevel = this.add.text(10, 100, "Current Level = 0", { font: "40px Arial", fill: "#ff0000"}).setAlpha(0.7);

    startTime = this.time.now;    

    // Generate platforms using PlatformData

    if (CurrentLevel === 1){
      platforms = GeneratePlatforms(this, PlatformData1);
    }

    if (CurrentLevel === 2){
      platforms = GeneratePlatforms(this, PlatformData2);
    }

    if (CurrentLevel === 3){
      platforms = GeneratePlatforms(this, PlatformData3);
    }

    if (CurrentLevel === 4){
      platforms = GeneratePlatforms(this, PlatformData4);
    }

    applyPlatformRules(this);

  
    //this.physics.add.collider(player, Door, handlePlatformCollisions, null, this);

    //this creates the key inputs for the movment and the reset
    cursors = this.input.keyboard.createCursorKeys();

    //console.log(platforms);

  }

  function update() {

    // special things ___________________________________________________

    let kids = platforms.children.entries


    kids.forEach((platform) => {

      if (platform.getData('type') === 'flat' && Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), platform.getBounds())) {
        //console.log('Flat platform');
      }

      if (platform.getData('type') === 'door' && Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), platform.getBounds())) {
        if (KeyFollow){
          loadNextLevel(this);
        }
        //console.log('Door platform');
      }

      if (platform.getData('type') === 'bounce' && Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), platform.getBounds())) {
        if (player.body.touching.left ==false && player.body.touching.right == false){
          player.setVelocityY(velocity(platform.getData('bounce')));
        //console.log('BounceGank platform');
        }
      }

      if (platform.getData('type') === 'bouncegank' && Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), platform.getBounds())) {
        if (player.body.touching.left != true && player.body.touching.right != true){
          player.setVelocityY(velocity(platform.getData('bounce')));
        //console.log('BounceGank platform');
        }
      }

      if (platform.getData('type') === 'gank' && Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), platform.getBounds())) {
        //console.log('Gank platform');
        if (player.body.touching.down || player.body.touching.up){
          player.setPosition(platform.x, player.y);
        }
      }

      if (platform.getData('type') === 'vertgank' && Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), platform.getBounds())) {
        //console.log('Gank platform');
        //player.setPosition(player.x, platform.y - player.height *2);
      }

      // the key collection
      if (platform.getData('type') === 'key' && Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), platform.getBounds())) {
        KeyFollow = true;
        //console.log('BounceGank platform');
      }

      // key follows the player once collected
      if (platform.getData('type') === 'key'){
        if (KeyFollow){
            this.tweens.add({
              targets: platform,
              x: player.x - player.width*2,
              y: player.y,
              yoyo: true,
              repeat: 1,
              duration: 50,
              ease: 'Sine.easeInOut'
            }); 
        } else {
            platform.setPosition(getPixCord(platform.getData('x'), 1).x, getPixCord(1, platform.getData('y')).y );
        }
      }

      if (platform.getData('type') === 'coin' && Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), platform.getBounds())){
        score ++;
        platform.destroy();
        
      }

      if (platform.getData('type') === 'coin'){
        platform.body.checkCollision.none = true;
      }

      if (platform.getData('type') === 'spikes' && Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), platform.getBounds())) {
        playerDie();
      }

      //console.log(player.x);

      try{
        platform.body.reset();
      }

      catch {
        
      }
    });

    // special things ___________________________________________________
    
    //upside down gravity
    if (player.y < getPixCord(2, 10).y) {
      player.setVelocityY(player.body.velocity.y + velocity(-25));
      player.flipY = true;
    } else if (player.y > getPixCord(2, 10).y) {
      player.setGravityY(0);
      player.flipY = false;
    }

    //console.log(player.body.velocity);

    //death counter and reset
    if (player.y > gameHeight || player.x < -5 || player.x > gameWidth || player.y < -5 || cursors.space.isDown) {
      playerDie();

    }

    if (move.y > gameHeight || move.x < -5 || move.x > gameWidth || move.y < -5 || cursors.space.isDown) {
      move.setPosition(getPixCord(10, 2).x, getPixCord(10, 2).y );
      move.setVelocity(0);
    }

    try{
      if (move.body.touching.right && player.body.touching.left) {
        move.setVelocityX(velocity(-80));
      } else if (player.body.touching.right && move.body.touching.left) {
        move.setVelocityX(velocity(80));
      } else {
        move.setVelocityX(0);
      }
    }

    catch{
      console.log("aaaahhhhhhhhhh");
    }

    //Gank and bounce and ice end --------------------------------------------------------

    //player jump
    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(velocity(-300));
      this.dustEmitter.setPosition(player.x, player.y+player.height*0.4);
      this.dustEmitter.explode(10);
      
    } else if (cursors.up.isDown && player.y < getPixCord(2, 10).y && player.body.touching.up) {
      player.setVelocityY(velocity(300));
      this.dustEmitter.setPosition(player.x, player.y);
      this.dustEmitter.explode(10);
    }

    //player Walk left
    else if (cursors.left.isDown) {
      player.setVelocityX(velocity(-160));
      player.anims.play("left", true);

      if (player.body.touching.down){
        this.dustEmitter.setPosition(player.x+ player.width/2, player.y+player.height*0.8);
        this.dustEmitter.explode();
      }
    }

    //player Walk right
    else if (cursors.right.isDown) {
      player.setVelocityX(velocity(160));
      player.anims.play("right", true);

      if (player.body.touching.down){
        this.dustEmitter.setPosition(player.x- player.width/2, player.y+player.height*0.8);
        this.dustEmitter.explode();
      }
    }

    //player idle
    else {
      player.setVelocityX(0);
      player.anims.play("idle", true);
    }

    //debug flying with shift
    if (cursors.up.shiftKey) {
      player.body.setVelocityY(-10);

      if (cursors.left.isDown) {
        player.body.setVelocityX(velocity(-500));
      }

      if (cursors.right.isDown) {
        player.body.setVelocityX(velocity(500));
      }

      if (cursors.up.isDown) {
        player.body.setVelocityY(velocity(-500));
      }
      if (cursors.down.isDown) {
        player.body.setVelocityY(velocity(500));
      }
      
    }

    //player movement end------------------------

    var pointer = this.input.activePointer;
    let elapsedTime = Math.floor((this.time.now - startTime) / 1000);

    if (debugMode){

      DebugText_XandY.setText(["x: " + Math.round(pointer.worldX), "y: " + Math.round(pointer.worldY)]);
      DebugText_XandYPlayer.setText(["x: " + Math.round(player.x), "y: " + Math.round(player.y)]);

      DebugText_XandY_Grid.setText(["x: " + Math.round(pointer.worldX/gridBlockWidth +1) , "y: " + Math.round(pointer.worldY/gridBlockHeight +1) ]);
  
    }

    DebugText_DeathCount.setText("Deaths : " + death);

    DebugText_Timer.setText("Time: " + elapsedTime + "        Score: " + score);

    DebugText_CurrentLevel.setText("Current Level: " + CurrentLevel + " \nKey collected: " + KeyFollow);
  
  }

});



