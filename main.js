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
    game.load.image("pistol", "assets/pistola.png");
    game.load.image("title", "assets/logo-primo-01.png");

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

    game.load.atlas(
      "nave_prisao",
      "assets/prisao-e-nave.png",
      "assets/prisao-e-nave.json"
    );

    game.load.atlas(
      "explosao",
      "assets/explosion-01.png",
      "assets/explosion-01.json"
    );

    game.load.audio("soundtrack_stage1", [
      "assets/Trilha_fase01.ogg",
      "assets/Trilha_fase01.mp3",
    ]);

    game.load.audio("audio_primo", ["assets/audio_primo.ogg"]);

    game.load.audio("jump_sound1", ["assets/jump_sfx_01.ogg"]);
    game.load.audio("jump_sound2", ["assets/jump_sfx_02.ogg"]);

    game.load.audio("obrigado", ["assets/obrigado.ogg"]);

    game.load.audio("explosion_audio", ["assets/explosion_powerful.ogg"]);
  }

  function createText() {
    text = game.add.text(700, 50, counter);
    text.fontSize = 60;
    text.font = "Bangers";
    textLoop = game.time.events.loop(
      Phaser.Timer.SECOND,
      decreaseCounter,
      this
    );
  }

  let astronaut, pistol_hero;
  let backgrounds;
  let soundtrack;
  let jump1, jump2;
  let canJump = true;
  let text;
  let back;
  let startY;
  let rocks;
  let rocket, prison;
  let counter = 30;
  let shot = false,
    already_shot = false;
  let loop, textLoop;
  let explosion, explosion_audio;
  let obrigado,
    obrigado_played = false;

  function create() {
    // load the background of stage 1
    back = game.add.image(0, 0, "planet");
    back.scale.set(1);

    // load audios
    soundtrack = game.add.audio("soundtrack_stage1");
    soundtrack.loopFull(0.3);

    let start_audio = game.add.audio("audio_primo");

    jump1 = game.add.audio("jump_sound1");
    jump2 = game.add.audio("jump_sound2");

    obrigado = game.add.audio("obrigado");

    explosion_audio = game.add.audio("explosion_audio");

    backgrounds = game.add.group();
    backgrounds.add(back);

    back = game.add.image(back.width, 0, "planet");
    backgrounds.add(back);

    // load the game hero
    astronaut = game.add.sprite(0, 397, "astronaut");
    astronaut.scale.set(1);
    astronaut.animations.add("walk");
    astronaut.animations.play("walk", 10, true);

    pistol_hero = game.add.image(150, 397, "pistol");
    pistol_hero.exists = false;

    //load rocket and prison
    rocket = game.add.sprite(1000, 500, "nave_prisao", "nave");

    prison = game.add.sprite(800, 300, "nave_prisao", "prisao");
    prison.scale.setTo(0.8);

    //load explosion
    explosion = game.add.sprite(300, 200, "explosao");
    explosion.scale.setTo(2);
    explosion.exists = false;
    explosion.animations.add("explode");

    // Load physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable(astronaut, Phaser.Physics.ARCADE);

    astronaut.body.gravity.y = 1000;
    astronaut.body.collideWorldBounds = true;
    startY = astronaut.y;

    //load the game title
    let title = game.add.image(0, 0, "title");
    title.exists = true;

    rocks = game.add.group();
    loop = game.time.events.loop(Phaser.Timer.SECOND, makeRocks, this);

    start_audio.play();
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
      astronaut.y === startY &&
      loop.loop
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

    if (astronaut.x < 150) astronaut.x += 2;

    if (astronaut.x === 150 && rocket.x === 500) {
      astronaut.animations.stop("walk", true);
      if (!already_shot) {
        astronaut.exists = false;
        pistol_hero.exists = true;
      }
      if (!shot) {
        shot = true;
        game.time.events.add(Phaser.Timer.SECOND * 1.5, shoot, this);
      }
    }
    if (already_shot)
      if (rocket.x > 300) rocket.x -= 2;
      else if (!obrigado_played) {
        obrigado.play();
        obrigado_played = true;
      }

    game.physics.arcade.collide(astronaut, rocks);

    if (rocket.x > 500) {
      backgrounds.forEach(function (background) {
        background.x -= 4;
        if (background.x <= -background.width) {
          background.x = background.width - 4;
        }
      });
    }

    if (counter <= 0) {
      //stop the loops
      loop.loop = false;
      textLoop.loop = false;
      console.log(rocket.x);

      //destroy existing objects
      rocks.exists = false;
      if (rocket.x > 500) rocket.x -= 4;
      if (prison.x > 300) prison.x -= 4;
      text.exists = false;
      rocks.forEach(function (rock) {
        rock.destroy();
      });
    }
  }

  function shoot() {
    explosion.exists = true;
    explosion.animations.play("explode", 10, false);
    explosion_audio.play();

    game.time.events.add(
      Phaser.Timer.SECOND / 8,
      function () {
        //prison.exists = false;
        game.add
          .tween(prison)
          .to({ alpha: 0 }, 100, Phaser.Easing.Linear.None, true);

        game.time.events.add(
          Phaser.Timer.SECOND / 3,
          function () {
            explosion.exists = false;
            already_shot = true;
            pistol_hero.exists = false;
            astronaut.exists = true;
          },
          this
        );
      },
      this
    );
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
