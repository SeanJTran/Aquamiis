class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    
    preload() {
        this.load.image('bg', './assets/bg.png');
        this.load.image('menu', './assets/menu.png');
        this.load.image('closeMenu', './assets/dropMenu.png');
        this.load.image('podsTab', './assets/podsTab.png');
        this.load.image('creaturesTab', './assets/creaturesTab.png');
        //Need to change path name for below images when assets are added
        //this.load.image('ccc', './assets/.png');
        //this.load.image('rcc', './assets/.png');
        //this.load.image('lcc', './assets/.png');
        
    }

    create() {
        let playTextConfig = {
            fontSize: '28px',
            backgroundColor: null,
            color: '#1A5BE6',
            padding: {
                x: 5,
                y: 5
            },
            align: 'right',
            stroke: '#1EEBD6',
            strokeThickness: 2,
            fixedWidth: game.config.width/2 - borderPadding
        }

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

        //interactable menu setup
        this.menuButton = this.add.image(game.config.width - 37, game.config.height - 23, 'menu').setOrigin(0,0).setInteractive();
        this.menuButtonText = this.add.text(game.config.width - 37 - 60, game.config.height - 20, "Menu", {
            fontSize: '24px',
            color: '#1A5BE6',
        }).setOrigin(0,0);

        this.closeMenuButton = this.add.image(game.config.width - 41, game.config.height - 150, 'closeMenu').setOrigin(0,0);
        this.closeMenuButton.depth = TOP;
        this.closeMenuButton.alpha = 0;

        this.pods = this.add.image(0/*(112)*/, game.config.height - 150 - 33, 'podsTab').setOrigin(0,0);
        this.pods.alpha = 0;

        this.creatures = this.add.image(112, game.config.height - 150 - 33, 'creaturesTab').setOrigin(0,0);
        this.creatures.alpha = 0;

        this.buy1 = this.add.image(game.config.width/4 * 1, game.config.height - borderUISize - 50, 'ccc');
        this.buy1.alpha = 0;
        this.buy1.depth = MIDDLE;

        this.buy2 = this.add.image(game.config.width/4 * 2, game.config.height - borderUISize - 50, 'rcc');
        this.buy2.alpha = 0;
        this.buy2.depth = MIDDLE;

        this.buy3 = this.add.image(game.config.width/4 * 3, game.config.height - borderUISize - 50, 'lcc');
        this.buy3.alpha = 0;
        this.buy3.depth = MIDDLE;

        this.buy1.on('pointerdown', function(){
            //commonsPulled<4 prevents infinite loop in pullCreature DO NOT REMOVE
            if(this.score >= 10 && commonsPulled<4){
                this.score -= 10;
                this.pullCreature('C');
            }
            
        }, this);
        this.buy2.on('pointerdown', function(){
            if(this.score >= 100 && raresPulled<4){
                this.score -= 100;
                this.pullCreature('R');
            }
            
        }, this);
        this.buy3.on('pointerdown', function(){
            if(this.score >= 1000 && legendariesPulled<4){
                this.score -= 1000;
                this.pullCreature('L');
            }
            
        }, this);

        //bring up menu
        this.menuButton.on('pointerdown', function(){
            this.displayMenu = true;
            rect = this.add.rectangle(0, game.config.height-150, game.config.width, 150, 0x2A7EFB, 1).setOrigin(0,0);
            this.menuButton.disableInteractive();

            this.closeMenuButton.alpha = 1;
            this.closeMenuButton.setInteractive();

            //make tabs interactive
            this.pods.alpha = 1;
            this.pods.setInteractive();

            this.creatures.alpha = 1;
            this.creatures.setInteractive();

            //display creatures content by default
            this.buy1.alpha = 1;
            this.buy1.setInteractive();
            this.buy2.alpha = 1;
            this.buy2.setInteractive();
            this.buy3.alpha = 1;
            this.buy3.setInteractive();
            console.log("hi");
        }, this);


        //close menu button
        this.closeMenuButton.on('pointerdown', function(){
            this.displayMenu = false;
            this.closeMenuButton.alpha = 0;
            this.closeMenuButton.disableInteractive();

            //hide tabs
            this.pods.alpha = 0;
            this.pods.disableInteractive();

            this.creatures.alpha = 0;
            this.creatures.disableInteractive();

            this.menuButton.setInteractive();

            //hide background of menu
            rect.destroy();

            //hide pods tab content
            this.buy1.alpha = 0;
            this.buy1.disableInteractive();
            this.buy2.alpha = 0;
            this.buy2.disableInteractive();
            this.buy3.alpha = 0;
            this.buy3.disableInteractive();

            //hide creatures tab content
            //---Here----
        }, this);

        //pressed pods tab
        this.pods.on('pointerdown', function(){
            //disable creatures tab display
            //----here----

            //display perchasable containers for creatures
            console.log("pods clicked");
            this.buy1.alpha = 1;
            this.buy1.setInteractive();
            this.buy2.alpha = 1;
            this.buy2.setInteractive();
            this.buy3.alpha = 1;
            this.buy3.setInteractive();
        }, this);

        //pressed creatures tab
        this.creatures.on('pointerdown', function(){
            //disable pods tab display
            this.buy1.alpha = 0;
            this.buy1.disableInteractive();
            this.buy2.alpha = 0;
            this.buy2.disableInteractive();
            this.buy3.alpha = 0;
            this.buy3.disableInteractive();
            //code for codex display here

            console.log("creatures clicked");
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
    pullCreature(letter){
        let pull;
        switch(letter){
            case 'C':
                while(true){
                    pull = Phaser.Math.RND.pick(commonCreatures);
                    console.log(pull);
                    if(collectedCreatures.indexOf(pull) == -1){
                        collectedCreatures += pull;
                        commonsPulled++;
                        break;
                    }
                }
                break;
            case 'R':
                while(true){
                    pull = Phaser.Math.RND.pick(rareCreatures);
                    console.log(pull);
                    if(collectedCreatures.indexOf(pull) == -1){
                        collectedCreatures += pull;
                        raresPulled++;
                        break;
                    }
                }
                break;
            case 'L':
                while(true){
                    pull = Phaser.Math.RND.pick(legendaryCreatures);
                    console.log(pull);
                    if(collectedCreatures.indexOf(pull) == -1){
                        collectedCreatures += pull;
                        legendariesPulled++;
                        break;
                    }
                }
                break;
        }
        console.log(collectedCreatures);
    }
}