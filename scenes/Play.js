class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    
    preload() {
        this.load.image('bg', './assets/back.png');
        this.load.image('menu', './assets/menu.png');
        this.load.image('closeMenu', './assets/dropMenu.png');
        this.load.image('podsTab', './assets/podsTab.png');
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

        this.menuButton = this.add.image(game.config.width - 37, game.config.height - 23, 'menu').setOrigin(0,0).setInteractive();

        this.closeMenuButton = this.add.image(game.config.width - 41, game.config.height - 150, 'closeMenu').setOrigin(0,0);
        this.closeMenuButton.depth = TOP;
        this.closeMenuButton.alpha = 0;

        this.pods = this.add.image(0/*(112)*/, game.config.height - 150 - 33, 'podsTab').setOrigin(0,0);
        this.pods.alpha = 0;

        this.buy1 = this.add.image(game.config.width/4 * 1, game.config.height - borderUISize - 50, 'ccc');
        this.buy1.alpha = 0;
        this.buy1.depth = MIDDLE;

        this.buy2 = this.add.image(game.config.width/4 * 2, game.config.height - borderUISize - 50, 'rcc');
        this.buy2.alpha = 0;
        this.buy2.depth = MIDDLE;

        this.buy3 = this.add.image(game.config.width/4 * 3, game.config.height - borderUISize - 50, 'ucc');
        this.buy3.alpha = 0;
        this.buy3.depth = MIDDLE;

        this.buy1.on('pointerdown', function(){
            if(this.score >= 10){
                this.score -= 10;
            }
        }, this);
        this.buy2.on('pointerdown', function(){
            if(this.score >= 100){
                this.score -= 100;
            }
        }, this);
        this.buy3.on('pointerdown', function(){
            if(this.score >= 1000){
                this.score -= 1000;
            }
        }, this);

        this.menuButton.on('pointerdown', function(){
            this.displayMenu = true;
            rect = this.add.rectangle(0, game.config.height-150, game.config.width, 150, 0x2A7EFB, 1).setOrigin(0,0);
            this.menuButton.disableInteractive();

            this.closeMenuButton.alpha = 1;
            this.closeMenuButton.setInteractive();

            this.pods.alpha = 1;
            this.pods.setInteractive();

            this.buy1.alpha = 1;
            this.buy1.setInteractive();
            this.buy2.alpha = 1;
            this.buy2.setInteractive();
            this.buy3.alpha = 1;
            this.buy3.setInteractive();
            console.log("hi");

        }, this);

        this.closeMenuButton.on('pointerdown', function(){
            this.displayMenu = false;
            this.closeMenuButton.alpha = 0;
            this.closeMenuButton.disableInteractive();

            this.pods.alpha = 0;
            this.pods.disableInteractive();

            this.menuButton.setInteractive();

            rect.destroy();

            this.buy1.alpha = 0;
            this.buy1.disableInteractive();
            this.buy2.alpha = 0;
            this.buy2.disableInteractive();
            this.buy3.alpha = 0;
            this.buy3.disableInteractive();

            console.log("bye");
        }, this);

        this.pods.on('pointerdown', function(){
            console.log("pods clicked");
            this.buy1.alpha = 1;
            this.buy1.setInteractive();
            this.buy2.alpha = 1;
            this.buy2.setInteractive();
            this.buy3.alpha = 1;
            this.buy3.setInteractive();
            //display perchasable containers for creatures
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

    purchase(cost){
        this.score -= cost;
    }
}