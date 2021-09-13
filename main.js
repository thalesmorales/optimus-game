window.onload = function () {
  let game = new Phaser.Game(1885, 400, Phaser.AUTO, "", {
    preload: preload,
    create: create,
    update: update,
  });

  function preload() {
    game.load.image("planet", "assets/fase02_backgroundpng-03.png");

    game.load.atlas(
      "game_sprites",
      "assets/elements_sprites-04.png",
      "assets/elements.json"
    );
    game.load.atlas(
      "spaceship_sprites",
      "assets/elements_sprites-04.png",
      "assets/spaceship.json"
    );
  }

  let astronaut;
  let back;
  let startY;
  let rocks;
  let spaceships;

  function create() {
    // load the background of stage 1
    back = game.add.image(0, 0, "planet");
    back.scale.set(1);

    // load the game hero
    spaceships = game.add.group();
    // Load physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    rocks = game.add.group();
    // setInterval(makeRocks, 1000);
  }

  function update() {
    if(game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      game.add.sprite(0, 0, "spaceship_sprites", "spaceship0001");
    }
    if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      game.add.sprite(0, 0, "spaceship_sprites", "spaceship0002");
    }
  }

  function makeRocks() {
    // let blockHeight = game.rnd.integerInRange(0, 1);
    // if (blockHeight) {
    //   let rock = game.add.sprite(
    //     game.world.right,
    //     290,
    //     "game_sprites",
    //     "rock0002"
    //   );
    //   rocks.add(rock);
    // } else {
    //   let rock = game.add.sprite(
    //     game.world.right,
    //     50,
    //     "game_sprites",
    //     "rock0001"
    //   );
    //   rocks.add(rock);
    //   rocks.forEach(function (rock) {
    //     game.physics.enable(rock, Phaser.Physics.ARCADE);
    //     rock.body.velocity.x = -500;
    //     rock.scale.set(0.7);
    //     rock.body.bounce.set(1, 1);
    //   });
    // }
  }
};