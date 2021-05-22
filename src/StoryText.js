import Phaser from 'phaser';


export default class StoryText extends Phaser.Scene { 

    constructor () {
        super({ key: 'story' });
    }

    init() {
        this.content = [
            "In the year 20XX, Robots have taken over the world",
            "They see the humans bring no benifits to the planet", 
            "so they plan to get ride of them",
            "They have withstand our most powerfull weapons and it seems like the are phycially untouchable",
            "But the Robots do have one weakness though,",
            "You have a device that can send kill codes to the robots that will stop that robot in its track",
            "Unfortunately each robot has a different code that needs to be decprited.",
            "You are the last hope for Humanity"
        ];
        
        this.line = [];

        this.wordIndex = 0;
        this.lineIndex = 0;
        
        this.wordDelay = 300;
        this.lineDelay = 300;
    }

    create(){
        this.text = this.add.text(32, 32, '', { 
            fontSize: 18,
            fontFamily:'"Press Start 2P"',
            align: "left",
            wordWrap: { width: this.cameras.main.width - 32, useAdvancedWrap: true }
        });

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

            this.add.text( 32 , this.text.height + this.text.y + 50, ' Press Enter to Continue' )
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