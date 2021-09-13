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
      "assets/nave_sprite.png",
      "assets/nave_sprite.json"
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
    game.add.sprite(0, 0, "spaceship_sprites", "spaceship0001");
    game.add.sprite(0, 150, "spaceship_sprites", "spaceship0002");
    game.add.sprite(0, 300, "spaceship_sprites", "spaceship0003");
    game.add.sprite(0, 450, "spaceship_sprites", "spaceship0004");
    game.add.sprite(0, 600, "spaceship_sprites", "spaceship0005");
    // Load physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    rocks = game.add.group();
    // setInterval(makeRocks, 1000);
  }

  function update() {}

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
