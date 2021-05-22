import Phaser from 'phaser';

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
  }
];

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
    this.invaderVelocity = 50;

  }

  create () {
    this.add.image(400, 300, 'space');

    /// The text input the put in
		this.textInput = this.add.text(300, 125, '',  {
			fontSize: 48,
		}).setOrigin(0.5, 0.5);
    this.scoreLabel = this.add.text(50, 50, '0', {fontSize:24});
    this.scoreLabel.depth = 5;

    this.physics.world.setBounds(0,-100, this.cameras.main.width, this.cameras.main.height +100);

    //// Player Input
    this.processPlayerInput();

    /// Create and set Invaders through look
    this.arrayInvaders = this.add.group();
    this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.createInvader, callbackScope: this,  repeat: 4 });

    //If Invaders colide with bottom of world
    this.physics.world.on('worldbounds', (body, up, down, left, right)=>{      
      if(down){
        this.gameState =  GameState.PlayerLoss;
      }
    });

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

    this.arrayInvaders.children.each(function(invader){
      invader.label.destroy();
      invader.destroy();
    });

    // this.arrayInvaders.clear(true);

    /// The text input the put in
		this.textInput = this.add.text(300, 125, '',  {
			fontSize: 48,
		}).setOrigin(0.5, 0.5);

    this.scoreLabel.destroy();
    this.scoreLabel = this.add.text(50, 50, '0', {fontSize:24});

    this.time.removeEvent(this.timedEvent ); 

    this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.createInvader, callbackScope: this,  repeat: 4 });
  }

  processPlayerInput()
	{
    // Grab any key
    this.input.keyboard.on('keydown', function (event) { 

      // console.log(event.key);

      if(['-','1','2','3','4','5','6','7','8','9','0'].includes(event.key)) {
        this.scene.updateText(event.key);
      }

      else if (event.key == 'Backspace') {
        this.scene.backSpace();
      }

      else if (event.key == "Enter") {
        this.scene.playerFire(this.scene.textInput.text)
        this.scene.clearText();
      }

      else if(event.key == "r") {
        this.scene.restartGame();
      }
     });
	}

  playerFire(number){
    let flag = false
    this.arrayInvaders.children.each(function(invader) {

      if(!flag && number == invader.getData('answer')){
        invader.label.destroy();
        invader.destroy();
        this.createInvader();
        this.invaderVelocity += 0.5;
        this.updateScore(50);
        flag = true;
      }

    },this);
  }

  backSpace(){
    let text = this.textInput.text.slice(0,-1);
    this.textInput.text = text;
  }

  updateText(key) { 
    let text = this.textInput.text + key;
    this.textInput.text = text; 
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
    
    let selectedOperator = Math.floor(Math.random()*operators.length);
    let number1 = Phaser.Math.Between(0,2);
    let number2 = Phaser.Math.Between(0,2);
    
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
    let string = [ number1, operators[selectedOperator].sign , number2].join('');
    let textConfig = {
      fontSize: 30, 
      color:'#000', 
      backgroundColor:'#fff'
    }

    if( invader.body.position.x - (invader.body.width/2) < 50 ){
        labelXPos = 50;
    }
    else if( invader.body.position.x - (invader.body.width/2) > this.cameras.main.width - 50 ){
      labelXPos = this.cameras.main.width - 50;
  }

    invader.label = this.add.text(labelXPos, labelYPos , string , textConfig).setOrigin(0.15, 0.5);
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

  gameOver() {
    this.arrayInvaders.children.each(function(invader){
      invader.body.setVelocityY(0);
    })
    this.time.removeEvent(this.timedEvent); 
    // this.timedEvent.remove(false);
  }


}
