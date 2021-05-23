import Phaser from 'phaser';

import * as AudioKeys from './consts/AudioKeys'

const GameState = {
	Running: 'running',
	PlayerLoss: 'player-loss',
}

const operators = [
  {
  sign: "+",
  method: function(a,b){ return a + b; }
  },
  {
  sign: "-",
  method: function(a,b){ return a - b; }
  },
  {
  sign:"*",
  method: function(a,b){ return a * b;} 
  },
  {
  // TO make sure we only get whole numbers 
  sign:"/",
  method: function(a,b){ return (a * b)/a;} 
  }
];

const Difficulty = {

}

export default class PlayScene extends Phaser.Scene {
  constructor () {
    super({
      key: 'play',
      physics: {
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      }
    });
  }

  init () {
    this.gameState = GameState.Running;
    
    // The top left right score
    this.score = 0;
    this.scoreLabel = '0';

    // Input
    this.textField = '';
    this.textValue = 0;

    // Invader Vel
    this.invaderVelocity = 20;

  }

  create () {
    this.add.image(400, 300, 'space');

    /// The text input the put in
		this.textInput = this.add.text(this.cameras.main.width/2, this.cameras.main.height - 100, '',  {
			fontSize: 48,
      fontFamily:'"Press Start 2P"',
		}).setOrigin(0.5, 0.5);
    this.scoreLabel = this.add.text(50, 50, '0', {fontSize:24, fontFamily:'"Press Start 2P"',});
    this.scoreLabel.depth = 5;

    this.physics.world.setBounds(0,-100, this.cameras.main.width, this.cameras.main.height +100);

    //// Player Input
    this.processPlayerInput();

    /// Create and set Invaders through look
    this.arrayInvaders = this.add.group();
    this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.createInvader, callbackScope: this,  repeat: 4 });
    this.Addvolicrty = this.time.addEvent({ delay:5000, callback: this.updateInvagerVolocity, callbackScope: this, loop:true});

    //If Invaders colide with bottom of world
    this.physics.world.on('worldbounds', (body, up, down, left, right)=>{      
      if(down){
        this.gameState =  GameState.PlayerLoss;
      }
    });

    
      //// MUSIC
      let playMusic = this.sound.add(AudioKeys.level1,{ volume: 0.1, loop: true }); 
      playMusic.play();
   
    
  }

  update () {
    if (this.paused || this.gameState !== GameState.Running)
		{
      this.gameOver();
      // this.scene.pause('play');
			return;
		}    
   
    this.updatInvaders();
  }

  restartGame(){
    // Start the game
    this.game.sound.stopAll();
    this.scene.restart();
  }

  processPlayerInput()
	{
    // Grab any key
    this.input.keyboard.on('keydown', function (event) { 

      // console.log(event.key);

      if(['-','1','2','3','4','5','6','7','8','9','0'].includes(event.key)) {
        this.updateText(event.key);
      }

      else if (event.key == 'Backspace') {
        this.backSpace();
      }

      else if (event.key == "Enter") {
        this.playerFire(this.textInput.text)
        this.clearText();
      }

      else if(event.key == "p") {
        // pause game
      }

      else if(event.key == "r") {
        this.restartGame();
      }

      else if(event.key == "q") {
        this.gameOver();
      }
     }, this);
	}

  playerFire(number){
    let hitflag = false;// We only want to hit one target if each fire even if some targets have the same value

    this.arrayInvaders.children.each(function(invader) {

      if(!hitflag && number == invader.getData('answer')){
        invader.label.destroy();
        invader.destroy();
        this.createInvader();
        this.updateScore(50);
        hitflag = true;
      }
    },this);
  }

  backSpace(){
    let text = this.textInput.text.slice(0,-1);
    this.textInput.text = text;
  }

  updateText(key) { 
    // May need to change length if we want negative numbers
    if(this.textInput.text.length <= 2) {
      let text = this.textInput.text + key;
      this.textInput.text = text; 
    }
  }

  clearText() {
    this.textInput.text = ''; 
  }

  updateScore(number) {
    this.score += number;
		this.scoreLabel.text = this.score;
  }

  /////////////////////
  //                //
  //    Invaders    //
  //                //
  /////////////////////
  createInvader() {
    
    
    let number1 = Phaser.Math.Between(0,5);
    let number2 = Phaser.Math.Between(0,number1);
    let selectedOperator = Math.floor(Math.random()*operators.length);
    
    // This is so we dont get divide by zero
    if( number2 == 0 && operators[selectedOperator].sign == '/' ) {
      if(number1 == 0) {
        number1 = Phaser.Math.Between(1,5);
      }
      number2 = Phaser.Math.Between(1,number1);
    }
    
    // Create Invaders
    let invader = this.arrayInvaders.create(Phaser.Math.Between(25, this.cameras.main.width -25), 0, 'logo').setOrigin(0.5, 0.5);
    this.physics.add.existing(invader);
    invader.depth= 3;
    invader.body.collideWorldBounds=true;
    invader.body.onWorldBounds=true;
    invader.body.setVelocityY(this.invaderVelocity);
    invader.setData('answer', operators[selectedOperator].method(number1, number2));

    // Get text ready
    let labelXPos = invader.body.position.x;
    let labelYPos = invader.body.position.y;
    let textConfig = {
      fontSize: 30, 
      color:'#000', 
      backgroundColor:'#fff'
    }

    let string = [ number1, operators[selectedOperator].sign , number2].join('');

    if(operators[selectedOperator].sign == '/'){
      string = [number1 * number2, operators[selectedOperator].sign , number1].join('');
    }

    if( invader.body.position.x - (invader.body.width/2) < 50 ){
        labelXPos = 50;
    }
    else if( invader.body.position.x - (invader.body.width/2) > this.cameras.main.width - 50 ){
      labelXPos = this.cameras.main.width - 50;
  }

    invader.label = this.add.text(labelXPos, labelYPos , string , textConfig).setOrigin(0.15, 1);
    invader.label.depth= 4;
  }

  updatInvader(invader) {
    invader.label.y = invader.body.position.y;
  }
 
  updatInvaders () {
    this.arrayInvaders.children.each(function(invader){
      this.updatInvader(invader);
    },this);
  }

  updateInvagerVolocity(){
    this.invaderVelocity += 5;
  }


  //// States
  gameOver() {
    this.arrayInvaders.children.each(function(invader){
      invader.body.setVelocityY(0);
    })
    this.time.removeEvent(this.timedEvent);
    let score = this.score;
    this.scene.start('end', {
      highScore: score,
    });
    // this.timedEvent.remove(false);
  }


}
