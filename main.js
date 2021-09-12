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
  }

  let astronaut;
  let back;

  function create() {
    back = game.add.image(0, 0, "planet");
    back.scale.set(1);
    back.smoothed = false;

    astronaut = game.add.sprite(-24, 128, "astronaut");
    astronaut.scale.set(1);
    astronaut.smoothed = false;
    astronaut.animations.add("run");
    astronaut.animations.play("run", 10, true);
  }

  function update() {
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) astronaut.x -= 4;
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
      astronaut.x += 4;
    else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) astronaut.y -= 4;
    else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) astronaut.y += 4;
  }

  function render() {
    game.debug.sprite(astronaut, 20, 32);
  }
};
