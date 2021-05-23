import Phaser from 'phaser';


export default class StoryText extends Phaser.Scene { 

    constructor () {
        super({ key: 'story' });
    }

    init() {
        this.content = [
            "In the year 20XX, Earth Robots were created to save our planet.", 
            "But in a totally unforeseen and original event they found humans were the root of the problem.",
            "All over the world Robots started capturing the humans and force them to watch David Suzuki documentaries.",
            "They have withstand our most powerfull weapons and it seems like the are phycially untouchable",
            "But the Robots do have one weakness though!",
            "You have a device that can send kill codes to the robots that will stop that robot in its track",
            "Unfortunately each robot has a different code that is a simple Math problem",
            "Type in the number and press enter to fire!",
            "Make sure they dont get to the bottom of the screen ( Thats where you are )",
            "You are the last hope for Humanity"
        ];
        
        this.line = [];

        this.wordIndex = 0;
        this.lineIndex = 0;
        
        this.wordDelay = 220;
        this.lineDelay = 350;
    }

    create(){
        this.text = this.add.text(32, 32, '', { 
            fontSize: 16,
            fontFamily:'"Press Start 2P"',
            align: "left",
            wordWrap: { width: this.cameras.main.width - 32 }
        });
        this.text.lineSpacing = 10;

        this.input.keyboard.on('keydown', function (event) { 
            if (event.key == "Enter") { 
                this.scene.start('menu');
            }
        }, this);

        this.nextLine();
    }

    nextLine() {
        if (this.lineIndex === this.content.length)  {
            //  We're finished
            // this.scene.start('menu');

            this.add.text( 32 , this.text.height + this.text.y , ' Press Enter to Continue' )
            return;
        }
         //  Split the current line on spaces, so one word per array element
        this.line = this.content[this.lineIndex].split(' ');

        //  Reset the word index to zero (the first word in the line)
        this.wordIndex = 0;

        //  Call the 'nextWord' function once for each word in the line (line.length)
        // this.time.events.repeat(this.wordDelay, this.line.length, this.nextWord, this);
        this.time.addEvent({delay:this.wordDelay, repeat:this.line.length -1 , callback: this.nextWord, callbackScope:this});

        //  Advance to the next line
        this.lineIndex++;

    }
    nextWord() {

        //  Add the next word onto the text string, followed by a space
        this.text.text = this.text.text.concat(this.line[this.wordIndex] + " ");
        // debugger;
    
        //  Advance the word index to the next word in the line
        this.wordIndex++;
    
        //  Last word?
        if (this.wordIndex === this.line.length)
        {
            //  Add a carriage return
            this.text.text = this.text.text.concat("\n");
    
            //  Get the next line after the lineDelay amount of ms has elapsed
            this.time.addEvent({delay:this.lineDelay, callback: this.nextLine, callbackScope:this});
        }
    
    }
}