class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    
    preload() {

    }

    create() {
        let playTextConfig = {
            fontSize: '28px',
            backgroundColor: '#111',
            color: '#1EEBD6',
            padding: {
                x: 5,
                y: 5
            },
            align: 'left',
            stroke: '#1EEBD6',
            strokeThickness: 2,
            fixedWidth: game.config.width/2 - borderPadding
        }
        //this.bgText = this.add.text(game.config.width/2, game.config.height/2, "Playing", playTextConfig).setOrigin(.5,.5);

        //initiallization section
        this.scoreText = this.add.text(game.config.width/4 * 2, borderPadding, "Life Essence: ", playTextConfig).setOrigin(0,0);
        this.pointer = game.input.activePointer;
        this.score = 0;
        this.canPress = false;
    }
    update(){
        if(this.pointer.leftButtonDown() && this.canPress){
            this.canPress = false;
            this.score += 1;
        }
        if(this.pointer.leftButtonReleased() &&  !this.canPress){
            this.canPress = true;
        }
        this.scoreText.text = "Life Essence: " + this.score;
    }
}