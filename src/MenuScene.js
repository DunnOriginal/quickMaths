import Phaser from 'phaser';
import * as AudioKeys from './consts/AudioKeys'

export default class MenuScene extends Phaser.Scene {
  constructor () {
    super({ key: 'menu' });
  }

  create () {
    let playMusic = this.sound.add(AudioKeys.title,{ volume: 0.1, loop: true }); 
    playMusic.play();

    this.add.image(400, 300, 'space');

    let rec2 =this.add.rectangle(100, 100, this.cameras.main.width + 800, this.cameras.main.height/2, '#000');
    rec2.rotation = -.25 ;

    let enemy = this.add.image(100, 100, 'logo').setOrigin(0, 0);
    enemy.displayWidth = 500;
    enemy.scaleY = enemy.scaleX;
    
    let rec1 =this.add.rectangle(200, 600, this.cameras.main.width + 800, this.cameras.main.height/2, '#000');
    rec1.rotation = -.25 ;


    let title = this.add.text(this.cameras.main.width - 50, this.cameras.main.height - 100, 'Quick Maths \n\n< Press Enter >', {
      align: 'center',
      fill: 'white',
      fontFamily:'"Press Start 2P"',
      fontSize: 24
    })
      .setOrigin(1, 1);

      console.log(this.cameras.main);
      console.log(title);

      this.tweens.add({
        targets: title,
        alpha: 1,
        y: title.y + 20,
        ease: 'Quad.easeInOut', 
        duration: 2500,
        repeat: -1,
        yoyo: true
      })

    this.input.keyboard.on('keydown', function (event) {
      if (event.key == 'Enter') {
        this.game.sound.stopAll();
        this.scene.start('play');
      }
    }, this);
  }
}
