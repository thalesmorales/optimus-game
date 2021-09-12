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
      298,
      7
    );
    game.load.atlas(
      "game_sprites",
      "assets/elements_sprites-04.png",
      "assets/rocks.json"
    );
  }

  let astronaut;
  let back;
  let startY;
  let blocks;

  function create() {
    // load the background of stage 1
    back = game.add.image(0, 0, "planet");
    back.scale.set(1);

    // load the game hero
    astronaut = game.add.sprite(0, 102, "astronaut");
    astronaut.scale.set(1);
    astronaut.animations.add("walk");
    astronaut.animations.play("walk", 10, true);

    // Load physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable(astronaut, Phaser.Physics.ARCADE);

    astronaut.body.gravity.y = 500;
    astronaut.body.collideWorldBounds = true;
    startY = astronaut.y;

    blocks = game.add.group();
    let rock = game.add.sprite(0, 50, "game_sprites", "rock0001");
    let rock2 = game.add.sprite(250, 250, "game_sprites", "rock0002");
    blocks.add(rock);
    blocks.add(rock2);
    //blocks.createMultiple(5, "game_sprites", ["rock0001", "rock0002"], true);
    //blocks.align(5, 3, 160, 160, Phaser.CENTER);
  }

  function update() {
    if (
      game.input.keyboard.isDown(Phaser.Keyboard.UP) &&
      astronaut.y === startY
    )
      astronaut.body.velocity.y -= 400;
    if (astronaut.x < 200) astronaut.x += 2;
  }
};
