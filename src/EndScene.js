import Phaser from 'phaser';

import * as AudioKeys from './consts/AudioKeys'
export default class EndScene extends Phaser.Scene {
  constructor () {
    super({ key: 'end' });
  }

  /**
	 *
	 * @param {{ highscore: number }} data
	 */
  create (data) {
    this.add.image(400, 300, 'space');

    this.game.sound.stopAll();
    let playMusic = this.sound.add(AudioKeys.ending,{ volume: 0.1, loop: true }); 
    playMusic.play();

    this.add.text(400, 100, 'Game Over\n\n High Score: '+ data.highScore +'\n\n< Press R to Restart >', {
      align: 'center',
      fill: 'white',
      fontFamily: 'sans-serif',
      fontSize: 48
    })
      .setOrigin(0.5, 0);

    this.input.keyboard.on('keydown', function (event) {
     
      if (event.key == 'r') { 
        this.game.sound.stopAll();
        this.scene.start('play');
      }

      else if (event.key == 'q') {
        this.game.sound.stopAll();
        this.scene.switch('menu');
      }
    }, this);
  }
}
