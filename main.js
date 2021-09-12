window.onload = function () {
  let game = new Phaser.Game(1885, 400, Phaser.AUTO, "", {
    preload: preload,
    create: create,
    update: update,
  });

  function preload() {
    game.load.image("planet", "assets/fase01_background-01.png");

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
      "assets/elements.json"
    );
  }

  let astronaut;
  let back;
  let startY;
  let rocks;

  function create() {
    // load the background of stage 1
    back = game.add.image(0, 0, "planet");
    back.scale.set(1);

    // load the game hero
    astronaut = game.add.sprite(0, 197, "astronaut");
    astronaut.scale.set(1);
    astronaut.animations.add("walk");
    astronaut.animations.play("walk", 10, true);

    // Load physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable(astronaut, Phaser.Physics.ARCADE);

    astronaut.body.gravity.y = 800;
    astronaut.body.collideWorldBounds = true;
    startY = astronaut.y;

    rocks = game.add.group();
    makeRocks();
    setInterval(makeRocks, 2000);
  }

  function update() {
    if (
      game.input.keyboard.isDown(Phaser.Keyboard.UP) &&
      astronaut.y === startY
    )
      astronaut.body.velocity.y -= 600;
    if (astronaut.x < 200) astronaut.x += 2;
    game.physics.arcade.collide(astronaut, rocks);
    console.log(astronaut.y);
  }

  function makeRocks() {
    let blockHeight = game.rnd.integerInRange(0, 1);
    if (blockHeight) {
      let rock = game.add.sprite(
        game.world.right,
        290,
        "game_sprites",
        "rock0002"
      );
      rocks.add(rock);
    } else {
      let rock = game.add.sprite(
        game.world.right,
        20,
        "game_sprites",
        "rock0001"
      );
      rocks.add(rock);
    }
    rocks.forEach(function (rock) {
      if (rock.x < game.world.left) {
        rock.destroy();
      }
      game.physics.enable(rock, Phaser.Physics.ARCADE);
      rock.body.velocity.x = -500;
      rock.scale.set(0.7);

      rock.body.bounce.set(1, 1);
    });
  }
};
