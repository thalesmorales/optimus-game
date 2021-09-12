window.onload = function () {
  let game = new Phaser.Game(800, 600, Phaser.CANVAS, "", {
    preload: preload,
    create: create,
  });

  function preload() {
    game.load.image("logo", "assets/astronauta.png");
  }

  function create() {
    let s = game.add.sprite(80, 0, "logo");
    s.rotation = 0.14;
  }
};
