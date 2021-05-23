import Phaser from 'phaser';

import * as AudioKeys from './consts/AudioKeys'


const ENDGAMEMESSAGE = [
  'If the answer is 0 for a Robot, you can hit enter without typing the number!',
  'This is my first game Jam and first published game! Hope you enjoyied it',
  'If two robots have the same answer, it will only target the robot that spawned earlier',
  'Oh no it seems you got caught, better luck next time',
  'Brag to your friends about your high score',
  'You can restart the game whenever by hitting the r key',
  'You can end the game early whenever by hitting the q key',
  'The Robots get faster over time, be sure to rack up as much points as possible before they get too fast!',
  'Trying playing with the numpad!',
  'Take your score and divide by 50 to figure how many bots you took down that round',
  
]

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

    this.add.text(400, 200, 'Game Over\n\n High Score:'+ data.highScore +'\n\n< Press R to Restart >', {
      align: 'center',
      fill: 'white',
      fontFamily:'"Press Start 2P"',
      fontSize: 32
    })
      .setOrigin(0.5, 0);

      this.displayMessage();

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

  displayMessage() {
    let message = ENDGAMEMESSAGE[Phaser.Math.Between(0, ENDGAMEMESSAGE.length - 1)];

    let messageText = this.add.text(this.cameras.main.width/2, this.cameras.main.height -150, message, {
      align: 'center',
      fill: 'white',
      fontFamily:'"Press Start 2P"',
      fontSize: 14,
      wordWrap: { width: this.cameras.main.width - 32 }
    }).setOrigin(0.5, .5);

    messageText.lineSpacing = 14;

  }
}
