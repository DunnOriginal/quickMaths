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
    this.scoreLable = '0';

    // Input
    this.textField = '';
    this.textValue = 0;
  }

  create () {
    this.add.image(400, 300, 'space');

    /// The text input the put in
		this.textInput = this.add.text(300, 125, '',  {
			fontSize: 48,
		}).setOrigin(0.5, 0.5);

    this.physics.world.setBounds(0,-100, this.cameras.main.width, this.cameras.main.height +100);

    //// Player Input
    this.processPlayerInput();

    /// Create and set Invaders through look
    this.arrayInvaders = this.add.group();
    // this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.createInvader, callbackScope: this, loop: 5 });
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
      // this.gameOver();
			return;
		}    
   
    this.updatInvaders();
  }

  processPlayerInput()
	{
    // Grab any key
    this.input.keyboard.on('keydown', function (event) { 

      console.log(event.key);

      if(['1','2','3','4','5','6','7','8','9','0'].includes(event.key)) {
        this.scene.updateText(event.key);
      }

      else if (event.key == 'Backspace') {
        // Remove Key
        this.scene.backSpace();
      }

      else if (event.key == "Enter") {
        // Send fire request
        this.scene.playerFire(this.scene.textInput.text)
        this.scene.clearText();

      }
     });
	}

  playerFire(number){
    // This will be when the user hits enter
    // See this if entered number matches any of the invaders clear
    let flag = false
    this.arrayInvaders.children.each(function(invader){

      console.log(invader.getData('answer'));

      if(!flag && number == invader.getData('answer')){
        invader.destroy();
        flag = true;
      }

    });
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

  /////////////////////
  //                //
  //    Invaders    //
  //                //
  /////////////////////
  createInvader() {
    
    let selectedOperator = Math.floor(Math.random()*operators.length);
    let number1 = Phaser.Math.Between(0,2);
    let number2 = Phaser.Math.Between(0,2);
    let string = [ number1,' ', operators[selectedOperator].sign , ' ' , number2].join('');
    
    // Create Invaders
    let invader = this.arrayInvaders.create(Phaser.Math.Between(0, this.cameras.main.width), 0, 'logo').setOrigin(0.5, 0.5);
    this.physics.add.existing(invader);
    invader.body.collideWorldBounds=true;
    invader.body.onWorldBounds=true;
    invader.body.setVelocityY(20);
    invader.label = this.add.text(invader.body.position.x, invader.body.position.x, string ,{fontSize: 48}).setOrigin(0.5, 0.5);
    invader.setData('equation', [ number1,' ', operators[selectedOperator].sign , ' ' , number2].join(''));
    invader.setData('answer', operators[selectedOperator].method(number1, number2));

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
    this.timedEvent.remove(false);
  }


}
