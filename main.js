window.onload = function () {
  let game = new Phaser.Game(1885, 600, Phaser.AUTO, "", {
    preload: preload,
    create: create,
    update: update,
  });

  function preload() {
    game.load.image("planet", "assets/fase02_backgroundpng-03.png");
  }

  let back;


  function create() {
    // load the background of stage 1
    back = game.add.image(0, 0, "planet");
    back.scale.set(1);
  }

  function update() {
  }
};
