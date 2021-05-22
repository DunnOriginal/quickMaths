import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
  constructor () {
    super({ key: 'menu' });
  }

  create () {
    this.add.image(400, 300, 'space');

    this.add.text(400, 200, 'Quick Maths \n\n< Press Enter >', {
      align: 'center',
      fill: 'white',
      fontFamily: 'sans-serif',
      fontSize: 48
    })
      .setOrigin(0.5, 0);

    this.input.keyboard.on('keydown', function (event) {
      if (event.key == 'Enter') {
        this.scene.switch('play');
      }
    }, this);
  }
}
