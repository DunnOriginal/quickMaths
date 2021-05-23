import Phaser from 'phaser';
import images from './assets/*.png';
import sounds from './assets/sounds/*.wav' ;
import * as AudioKeys from './consts/AudioKeys'
import WebFontFile from './WebFontFile'

export default class BootScene extends Phaser.Scene {
  constructor () {
    super({ key: 'boot' });
  }

  preload () {
    var bg = this.add.rectangle(400, 300, 400, 30, 0x666666);
    var bar = this.add.rectangle(bg.x, bg.y, bg.width, bg.height, 0xffffff).setScale(0, 1);

    console.table(sounds);

    //https://aztrakatze.itch.io/simple-cute-robot
    this.load.image('space', images.space);
    this.load.image('logo', images.botzred);
    // this.load.image('logo', images.ballred);


    this.load.audio(AudioKeys.level1, sounds.level1);
		this.load.audio(AudioKeys.title, sounds.title);
		this.load.audio(AudioKeys.ending, sounds.ending);


    const fonts = new WebFontFile(this.load, 'Press Start 2P')
		this.load.addFile(fonts);

    this.load.on('progress', function (progress) {
      bar.setScale(progress, 1);
    });
  }

  update () {
    this.scene.start('story');
    // this.scene.start('play');
    // this.scene.remove();
  }
}
