window.onload = function () {
  let game = new Phaser.Game(800, 600, Phaser.AUTO, "", {
    preload: preload,
    create: create,
    update: update,
  });

  WebFontConfig = {
    active: function () {
      game.time.events.add(Phaser.Timer.SECOND, createText, this);
    },
    google: {
      families: ["Bangers"],
    },
  };

  function preload() {
    game.load.image("planet", "assets/fase01_background-01.png");

    // load the Google WebFont Loader script
    game.load.script(
      "webfont",
      "//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js"
    );

    game.load.spritesheet(
      "astronaut",
      "assets/astronauta145x298.png",
      145,
      203,
      7
    );
    game.load.atlas(
      "game_sprites",
      "assets/elements_sprites-04.png",
      "assets/elements_sprites-04.json"
    );
    game.load.audio("soundtrack_stage1", [
      "assets/Trilha_fase01.ogg",
      "assets/Trilha_fase01.mp3",
    ]);
    game.load.audio("jump_sound1", ["assets/jump_sfx_01.ogg"]);
    game.load.audio("jump_sound2", ["assets/jump_sfx_02.ogg"]);
  }

  function createText() {
    text = game.add.text(700, 50, counter);
    text.fontSize = 60;
    text.font = "Bangers";
    game.time.events.loop(Phaser.Timer.SECOND, decreaseCounter, this);
  }

  let astronaut;
  let backgrounds;
  let soundtrack;
  let jump1, jump2;
  let canJump = true;
  let text;
  let back;
  let startY;
  let rocks;
  let counter = 30;

  function create() {
    // load the background of stage 1
    back = game.add.image(0, 0, "planet");
    back.scale.set(1);

    // load audios
    soundtrack = game.add.audio("soundtrack_stage1");
    soundtrack.loopFull(0.6);

    jump1 = game.add.audio("jump_sound1");
    jump2 = game.add.audio("jump_sound2");

    backgrounds = game.add.group();
    backgrounds.add(back);

    back = game.add.image(back.width, 0, "planet");
    backgrounds.add(back);

    // load the game hero
    astronaut = game.add.sprite(0, 397, "astronaut");
    astronaut.scale.set(1);
    astronaut.animations.add("walk");
    astronaut.animations.play("walk", 10, true);

    // Load physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable(astronaut, Phaser.Physics.ARCADE);

    astronaut.body.gravity.y = 1000;
    astronaut.body.collideWorldBounds = true;
    startY = astronaut.y;

    rocks = game.add.group();
    game.time.events.loop(Phaser.Timer.SECOND, makeRocks, this);
  }

  function decreaseCounter() {
    counter--;
    text.setText(counter);
  }

  function collision() {
    counter += 5;
    text.setText("+" + counter);
  }

  function update() {
    if (
      game.input.keyboard.isDown(Phaser.Keyboard.UP) &&
      astronaut.y === startY
    ) {
      astronaut.body.velocity.y -= 350;

      // play jump sound
      let jump_set = game.rnd.integerInRange(0, 1);
      if (jump_set && canJump) {
        jump1.play();
        canJump = false;
        setTimeout(function () {
          canJump = true;
        }, 300);
      } else if (canJump) {
        jump2.play();
        canJump = false;
        setTimeout(function () {
          canJump = true;
        }, 300);
      }
    }

    if (astronaut.x < 200) astronaut.x += 2;

    game.physics.arcade.collide(astronaut, rocks);

    backgrounds.forEach(function (background) {
      background.x -= 4;
      if (background.x <= -background.width) {
        background.x = background.width - 4;
      }
    });
  }

  function makeRocks() {
    let blockHeight = game.rnd.integerInRange(0, 1);
    if (blockHeight) {
      game.add.sprite(
        game.width,
        backgrounds.height - 150,
        "game_sprites",
        "rock0002",
        rocks
      );
    } else {
      game.add.sprite(
        game.width,
        backgrounds.height - 370,
        "game_sprites",
        "rock0001",
        rocks
      );
    }
    rocks.forEach(function (rock) {
      if (rock.x < game.world.left) {
        rock.destroy();
      }
      game.physics.enable(rock, Phaser.Physics.ARCADE);
      rock.body.velocity.x = -500;
      game.physics.arcade.collide(astronaut, rock, collision);

      rock.body.bounce.set(1, 1);
    });
  }
};
