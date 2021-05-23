import Phaser from 'phaser';

import * as AudioKeys from './consts/AudioKeys'


const ENDGAMEMESSAGE = [
  'If the answer is 0 for a Robot, you can hit enter without typing the number!\n\n Is it a bug or feature?!?',
  'This is my First published game! Hope you enjoyied it',
  'If multiple robots have the same answer, it will only target the robot that spawned first',
  'Brag to your friends about your high score',
  'You can restart the game whenever by hitting the r key',
  'You can end the game early whenever by hitting the q key',
  'The Robots get faster over time, be sure to rack up as much points as possible before they get too fast!',
  'I recommend playing with a numpad if you have one',
  'Take your score and divide by 50 to figure how many bots you took down that round',
  'The robots forced you into environmental studies, you came out of it learning a lot!',
  'I used Phaser 3 and parcel to create this',
  'In this game you play as the bad guy',
  'Play this game blind folded while you have a friend shout out the answers',
  'No robots were harmed in the making of this game',
  'Hopefully you learned how to do math quickly',
  'My highest Score is 6600',

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
      fontFamily:'"Press Start 2P"',
      fontSize: 14,
      lineSpacing: 10,
      wordWrap: { width: this.cameras.main.width - 32 }
    }).setOrigin(0.5, .5);

    messageText.lineSpacing = 0;

  }
}
