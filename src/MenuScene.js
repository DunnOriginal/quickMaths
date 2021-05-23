import Phaser from 'phaser';
import * as AudioKeys from './consts/AudioKeys'

export default class MenuScene extends Phaser.Scene {
  constructor () {
    super({ key: 'menu' });
  }

//   preload() {
//     // alert("Hit");
//     const framesPerRow = 8;
//     const frameTotal = 32;

//     //  Create a CanvasTexture that is 256 x 128 in size.
//     //  The frames will be 32 x 32, which means we'll fit in 8 x 4 of them to our texture size, for a total of 32 frames.
//     const canvasFrame = this.textures.createCanvas('dynamicFrames', 256, 128);

//     let radius = 0;
//     const radiusInc = 16 / frameTotal;

//     let x = 0;
//     let y = 0;
//     let ctx = canvasFrame.context;

//     ctx.fillStyle = '#ffff00';

//     for (let i = 1; i <= frameTotal; i++)
//     {
//         //  Draw an arc to the CanvasTexture
//         ctx.beginPath();
//         ctx.arc(x + 16, y + 16, Math.max(1, radius), 0, Math.PI * 2, false);
//         ctx.closePath();
//         ctx.fill();

//         //  Now we add a frame to the CanvasTexture.
//         //  See the docs for the arguments.
//         canvasFrame.add(i, 0, x, y, 32, 32);

//         x += 32;
//         radius += radiusInc;

//         //  Hit the end of the row? Wrap it around.
//         if (i % framesPerRow === 0)
//         {
//             x = 0;
//             y += 32;
//         }
//     }

//     //  Call this if running under WebGL, or you'll see nothing change
//     canvasFrame.refresh();

//     //  Display the whole of our freshly baked sprite sheet
//     this.add.image(0, 0, 'dynamicFrames', '__BASE').setOrigin(0);

//     //  Let's create an animation from the new frames
//     this.anims.create({
//         key: 'pulse',
//         frames: this.anims.generateFrameNumbers('dynamicFrames', { start: 1, end: frameTotal }),
//         frameRate: 28,
//         repeat: -1,
//         yoyo: true
//     });

//     //  Add a bunch of Sprites that all use the same base texture and animation
//     for (let i = 0; i < 50; i++)
//     {
//         const ball = this.add.sprite(8 + i * 16, 164, 'dynamicFrames').play('pulse');

//         this.tweens.add({
//             targets: ball,
//             y: 584,
//             duration: 2000,
//             ease: 'Quad.easeInOut',
//             delay: i * 30,
//             yoyo: true,
//             repeat: -1
//         });
//     }
// }

  create () {
    let playMusic = this.sound.add(AudioKeys.title,{ volume: 0.1, loop: true }); 
    playMusic.play();

    // this.add.image(400, 300, 'space');

    this.add.text(400, 200, 'Quick Maths \n\n< Press Enter >', {
      align: 'center',
      fill: 'white',
      fontFamily: 'sans-serif',
      fontSize: 48
    })
      .setOrigin(0.5, 0);

    this.input.keyboard.on('keydown', function (event) {
      if (event.key == 'Enter') {
        this.game.sound.stopAll();
        this.scene.start('play');
      }
    }, this);
  }
}
