class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    
    preload() {
        this.load.image('bg', './assets/back.png');
        this.load.image('menu', './assets/menu.png');
        this.load.image('closeMenu', './assets/dropMenu.png');
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

        this.add.image(0, 0, 'bg').setOrigin(0,0);

        //initiallization section
        const TOP = 3;
        const MIDDLE = 2;
        const BOTTOM = 1;
        this.scoreText = this.add.text(game.config.width/4 * 2, borderPadding, "Life Essence: ", playTextConfig).setOrigin(0,0);
        this.pointer = game.input.activePointer;
        this.score = 0;
        this.canPress = false;
        this.displayMenu = false;
        var rect;

        this.menuButton = this.add.image(game.config.width - 41, game.config.height - 25, 'menu').setOrigin(0,0).setInteractive();
        this.closeMenuButton = this.add.image(game.config.width - 37, game.config.height - 100, 'closeMenu').setOrigin(0,0);
        this.closeMenuButton.depth = TOP;
        this.closeMenuButton.alpha = 0;


        this.menuButton.on('pointerdown', function(){
            this.displayMenu = true;
            rect = this.add.rectangle(0, game.config.height-100, game.config.width, 100, 0x2A7EFB, 1).setOrigin(0,0);
            this.menuButton.disableInteractive();
            this.closeMenuButton.alpha = 1;
            this.closeMenuButton.setInteractive();
            console.log("hi");

        }, this);
        this.closeMenuButton.on('pointerdown', function(){
            this.displayMenu = false;
            this.closeMenuButton.alpha = 0;
            this.closeMenuButton.disableInteractive();
            this.menuButton.setInteractive();

            rect.destroy();
            console.log("bye");
        }, this);

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

    //method cannot be called for some reason
    displayMenu(){
        console.log("displayMenu function");
    }
}