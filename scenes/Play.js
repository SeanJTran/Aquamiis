class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    
    preload() {
        this.load.image('bg', './assets/bg.png');
        this.load.audio('menuMusic', './assets/menuMusic.mp3');
        this.load.image('menu', './assets/uiassets/MenuTab.png');
        this.load.image('closeMenu', './assets/uiassets/CollapseButton.png');
        this.load.audio('water', './assets/water.wav');
        this.load.image('podsTab', './assets/uiassets/pinkPodsTab.png');
        this.load.image('creaturesTab', './assets/uiassets/pinkCreaturesTab.png');
        this.load.image('pondTab', './assets/uiassets/pinkPondTab.png');
        this.load.spritesheet('drop', './assets/raindrop.png', {frameWidth: 23, frameHeight: 59});
        this.load.image('wpodsTab', './assets/uiassets/whitePodsTab.png');
        this.load.image('wcreaturesTab', './assets/uiassets/whiteCreaturesTab.png');
        this.load.image('wpondTab', './assets/uiassets/whitePondTab.png');

        this.load.image('uibar', './assets/uiassets/uibar.png')

        this.load.image('ccc', './assets/uiassets/basicPod.png');
        this.load.image('rcc', './assets/uiassets/rarePod.png');
        this.load.image('lcc', './assets/uiassets/legendaryPod.png');

        this.load.spritesheet('commonEgg', './assets/commonEggAtlas.png', {frameWidth: 75, frameHeight: 51});
        this.load.spritesheet('rareEgg', './assets/rareEggAtlas.png', {frameWidth: 75, frameHeight: 51});
        this.load.spritesheet('legendaryEgg', './assets/legendaryEggAtlas.png', {frameWidth: 75, frameHeight: 51});
        
    }

    create() {
        this.sound.play('menuMusic', {loop: true, volume: 0.2});
        let playTextConfig = {
            fontSize: '28px',
            backgroundColor: null,
            color: '#FFFFFF',
            padding: {
                x: 5,
                y: 5
            },
            align: 'right',
            stroke: '#FFFFFF',
            strokeThickness: 2,
            fixedWidth: game.config.width/2 - borderPadding
        }

        this.add.image(0, 0, 'bg').setOrigin(0,0);

        this.drop = this.anims.create({
            key: 'drops',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('drop', {start: 0, end: 2, first: 0}),
            frameRate: 4
        })
        
        //initiallization section
        const TOP = 3;
        const MIDDLE = 2;
        const BOTTOM = 1;
        this.scoreText = this.add.text(190, game.config.height - 25, "0", playTextConfig).setOrigin(1,0.5);
        this.scoreText.depth = TOP;
        this.pointer = game.input.activePointer;
        this.score = 0;
        this.canPress = false;
        this.vd = false;
        this.displayMenu = false;
        this.addEssence = false;
        this.pondLevel = 3;
        var rect;
        this.eggs = [new spawnPositions(false, 250, 400), new spawnPositions(false, 400, 450), new spawnPositions(false, 650, 425)];

        //static menu setup
        this.uibar = this.add.image(0, game.config.height - 50, 'uibar').setOrigin(0,0);
        this.uibar.depth = MIDDLE;


        //interactable menu setup
        this.menuButton = this.add.image(game.config.width - 84, game.config.height - 50, 'menu').setOrigin(0,1).setInteractive();
        /*
        this.menuButtonText = this.add.text(game.config.width - 84 - 60, game.config.height - 20, "Menu", {
            fontSize: '24px',
            color: '#1A5BE6',
        }).setOrigin(0,0);
        */

        this.closeMenuButton = this.add.image(game.config.width - 84, game.config.height - 150 - 33, 'closeMenu').setOrigin(0,0);
        this.closeMenuButton.depth = TOP;
        this.closeMenuButton.alpha = 0;

        this.pond = this.add.image(0, game.config.height - 50, 'pondTab').setOrigin(0,1);
        this.pond.depth = BOTTOM;

        this.pods = this.add.image(112, game.config.height - 50, 'podsTab').setOrigin(0,1);
        this.pods.depth = BOTTOM;

        this.creatures = this.add.image(112*2, game.config.height - 50, 'creaturesTab').setOrigin(0,1);
        this.creatures.depth = BOTTOM;

        this.buy1 = this.add.image(game.config.width/4 * 1, game.config.height - 55, 'ccc').setOrigin(0,1);
        this.buy1.alpha = 0;
        this.buy1.depth = MIDDLE;

        this.buy2 = this.add.image(game.config.width/4 * 2, game.config.height - 55, 'rcc').setOrigin(0,1);
        this.buy2.alpha = 0;
        this.buy2.depth = MIDDLE;

        this.buy3 = this.add.image(game.config.width/4 * 3, game.config.height - 55, 'lcc').setOrigin(0,1);
        this.buy3.alpha = 0;
        this.buy3.depth = MIDDLE;

        this.buy1.on('pointerdown', function(){
            //commonsPulled<4 prevents infinite loop in pullCreature DO NOT REMOVE
            if(this.score >= 10 && commonsPulled<4){
                this.pullCreature('C');
            }
        }, this);

        this.buy2.on('pointerdown', function(){
            if(this.score >= 100 && raresPulled<4){
                this.pullCreature('R');
            }
        }, this);
        this.buy3.on('pointerdown', function(){
            if(this.score >= 1000 && legendariesPulled<4){
                this.pullCreature('L');
            }
            
        }, this);

        //bring up menu
        this.menuButton.on('pointerdown', function(){
            this.displayMenu = true;
            rect = this.add.rectangle(0, game.config.height-150, game.config.width, 150, 0xffc1aa, 1).setOrigin(0,0);
            rect.depth = BOTTOM;
            this.menuButton.disableInteractive();

            this.closeMenuButton.alpha = 1;
            this.closeMenuButton.setInteractive();

            //set Tab positions
            this.pond.setInteractive();
            this.pods.setInteractive();
            this.creatures.setInteractive();
            this.pond.x = 0;
            this.pond.y = game.config.height - 150;
            this.pods.x = 112;
            this.pods.y = game.config.height - 150;
            this.creatures.x = 112*2;
            this.creatures.y = game.config.height - 150;

            //display pods content by default
            /*
            this.buy1.alpha = 1;
            this.buy1.setInteractive();
            this.buy2.alpha = 1;
            this.buy2.setInteractive();
            this.buy3.alpha = 1;
            this.buy3.setInteractive();
            */
        }, this);


        //close menu button
        this.closeMenuButton.on('pointerdown', function(){
            this.displayMenu = false;
            this.closeMenuButton.alpha = 0;
            this.closeMenuButton.disableInteractive();


            //set tab positions
            this.pond.disableInteractive();
            this.pods.disableInteractive();
            this.creatures.disableInteractive();
            //this.pond.setTexture('pondTab'); redudant
            //this.pods.setTexture('podsTab');  redundant within podsTabDisable()
            //this.creatures.setTexture('creaturesTab'); redudant
            this.pond.x = 0;
            this.pond.y = game.config.height - 50;
            this.pods.x = 112;
            this.pods.y = game.config.height - 50;
            this.creatures.x = 112*2;
            this.creatures.y = game.config.height - 50;

            this.menuButton.setInteractive();

            //hide background of menu
            rect.destroy();

            //hide pond tab content
            this.pondTabDisable();

            //hide pods tab content
            this.podsTabDisable();

            //hide creatures tab content
            this.creaturesTabDisable();
        }, this);

        //pressed pond tab
        this.pond.on('pointerdown', function(){
            console.log("pond clicked");

            //disable Creatures display
            this.creaturesTabDisable();

            //disable pods display
            this.podsTabDisable();

            //disply pond tab options
            this.pond.setTexture('wpondTab');
            rect.fillColor = 0xFFFFFF;

        }, this);

        //pressed pods tab
        this.pods.on('pointerdown', function(){
            console.log("pods clicked");

            //disable creatures tab display
            this.creaturesTabDisable();

            //disable pond display
            this.pondTabDisable();

            //display perchasable containers for creatures
            this.pods.setTexture('wpodsTab');
            rect.fillColor = 0xFFFFFF;
            this.buy1.alpha = 1;
            this.buy1.setInteractive();
            this.buy2.alpha = 1;
            this.buy2.setInteractive();
            this.buy3.alpha = 1;
            this.buy3.setInteractive();
        }, this);

        //pressed creatures tab
        this.creatures.on('pointerdown', function(){
            console.log("creatures clicked");

            //disable pond tab display
            this.pondTabDisable();

            //disable pods tab display
            this.podsTabDisable();

            //code for creature display here
            this.creatures.setTexture('wcreaturesTab');
            rect.fillColor = 0xFFFFFF;
            
        }, this);

        this.commonBob = this.anims.create({
            key: 'commonBob',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('commonEgg', {start: 0, end: 3, first: 0}),
            frameRate: 4
        });
        this.rareBob = this.anims.create({
            key: 'rareBob',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('rareEgg', {start: 0, end: 3, first: 0}),
            frameRate: 4
        });
        this.legendaryBob = this.anims.create({
            key: 'legendaryBob',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('legendaryEgg', {start: 0, end: 3, first: 0}),
            frameRate: 4
        });


    }
    update(){
        if(this.pointer.leftButtonDown() && this.canPress){
            this.sound.play('water', { volume: 0.1 });
            this.canPress = false;
            this.score += 1;
            if (!this.vd) {
                this.vd = true;
                this.dropper = this.add.sprite(this.pointer.x, this.pointer.y, 'drop').setOrigin(0, 0);
                this.dropper.play('drops');
                this.time.delayedCall(500, () => {
                    this.dropper.destroy();
                    this.vd = false;
                });
            }
        }
        if(this.pointer.leftButtonReleased() &&  !this.canPress){
            this.canPress = true;
        }

        //add score passivly every 10 seconds
        if(!this.addEssence){
            this.addEssence = true;
            this.time.delayedCall(10000, () => {
                this.score += (commonsPulled + (4 * raresPulled) + (10 * legendariesPulled));
                this.addEssence = false;
            }, this);
        }
        this.scoreText.text = this.score;

    }

    pullCreature(letter){
        //manage eggs mechanic
        let eggIndex = 0;
        let ptr;
        let pullAllowed = false;
        const LEG_TIME = 9000;
        const RARE_TIME = 6000;
        const COM_TIME = 3000;
        
        for(eggIndex; eggIndex<this.pondLevel; eggIndex++){
            if(this.eggs[eggIndex].flag == false){
                break;
            }
        }
        if(eggIndex < this.pondLevel){
            ptr = this.eggs[eggIndex];
            ptr.flag = true;
            pullAllowed = true;
        }else{
            pullAllowed = false;
        }
        console.log("pullAllowed: " + pullAllowed);
        console.log("eggIndex: " + eggIndex);

        if(pullAllowed){
            let pull;
            switch(letter){
                case 'C':
                    ptr.object = this.add.sprite(ptr.x, ptr.y, 'holder').play('commonBob');
                    while(true){
                        pull = Phaser.Math.RND.pick(commonCreatures);
                        console.log(pull);
                        if(collectedCreatures.indexOf(pull) == -1){
                            this.time.delayedCall(COM_TIME, () => {
                                ptr.flag = false;
                                ptr.object.destroy();
                            }, this);
                            collectedCreatures += pull;
                            commonsPulled++;
                            this.score -= 10;
                            break;
                        }
                    }
                    break;
                case 'R':
                    ptr.object = this.add.sprite(ptr.x, ptr.y, 'holder').play('rareBob');
                    while(true){
                        pull = Phaser.Math.RND.pick(rareCreatures);
                        console.log(pull);
                        if(collectedCreatures.indexOf(pull) == -1){
                            this.time.delayedCall(RARE_TIME, () => {
                                ptr.flag = false;
                                ptr.object.destroy();
                            }, this);
                            collectedCreatures += pull;
                            raresPulled++;
                            this.score -= 100;
                            break;
                        }
                    }
                    break;
                case 'L':
                    ptr.object = this.add.sprite(ptr.x, ptr.y, 'holder').play('legendaryBob');
                    while(true){
                        pull = Phaser.Math.RND.pick(legendaryCreatures);
                        console.log(pull);
                        if(collectedCreatures.indexOf(pull) == -1){
                            this.time.delayedCall(LEG_TIME, () => {
                                ptr.flag = false;
                                ptr.object.destroy();
                            }, this);
                            collectedCreatures += pull;
                            legendariesPulled++;
                            this.score -= 1000;
                            break;
                       }
                   }
                   break;
            }
        }else{
            //Can add error msg popup here
        }
    }

    pondTabDisable(){
        this.pond.setTexture('pondTab');
    }

    podsTabDisable(){
        this.pods.setTexture('podsTab');
        this.buy1.alpha = 0;
        this.buy1.disableInteractive();
        this.buy2.alpha = 0;
        this.buy2.disableInteractive();
        this.buy3.alpha = 0;
        this.buy3.disableInteractive();
    }
    creaturesTabDisable(){
        if(this.creatures.texture.key != 'creaturesTab'){
            this.creatures.setTexture('creaturesTab');
        }
    }
}

class spawnPositions{
    constructor(flag, x, y){
        this.flag = flag;
        this.x = x;
        this.y = y;
        this.object;
    }
}