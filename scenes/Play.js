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
        this.load.spritesheet('drop', './assets/rain.png', {frameWidth: 23, frameHeight: 118});
        this.load.image('wpodsTab', './assets/uiassets/whitePodsTab.png');
        this.load.image('wcreaturesTab', './assets/uiassets/whiteCreaturesTab.png');
        this.load.image('wpondTab', './assets/uiassets/whitePondTab.png');
        this.load.audio('hat', './assets/hatch.wav');
        this.load.image('uibar', './assets/uiassets/uibar.png')
        this.load.image('ccc', './assets/uiassets/basicPod.png');
        this.load.image('rcc', './assets/uiassets/rarePod.png');
        this.load.image('lcc', './assets/uiassets/legendaryPod.png');
        this.load.image('restart', './assets/replay.png');
        this.load.image('mainMenu', './assets/mainMenu.png');
        this.load.image('congrats', './assets/endGame.png');

        this.load.spritesheet('commonEgg', './assets/basicEggAtlas.png', {frameWidth: 75, frameHeight: 63});
        this.load.spritesheet('rareEgg', './assets/rareEggAtlas.png', {frameWidth: 75, frameHeight: 63});
        this.load.spritesheet('legendaryEgg', './assets/legendaryEggAtlas.png', {frameWidth: 75, frameHeight: 63});

        this.load.spritesheet('commonEggR', './assets/basicEggReady.png', {frameWidth: 73, frameHeight: 80});
        this.load.spritesheet('rareEggR', './assets/rareEggReady.png', {frameWidth: 73, frameHeight: 80});
        this.load.spritesheet('legendaryEggR', './assets/legendaryEggReady.png', {frameWidth: 73, frameHeight: 80});

        this.load.spritesheet('strawberry', './assets/legendary_creatures/strawberry.png', {frameWidth: 80, frameHeight: 97});
        this.load.spritesheet('narwhal', './assets/basic_creatures/narwhal.png', {frameWidth: 96, frameHeight: 74});
        this.load.spritesheet('blossom', './assets/basic_creatures/blossom.png', {frameWidth: 82, frameHeight: 66});
        this.load.image('prince', './assets/legendary_creatures/prince.png');
        this.load.image('onion-chan', './assets/basic_creatures/onion-chan.png');
        this.load.image('electro', './assets/rare_creatures/electro.png');
        this.load.image('Truffle', './assets/rare_creatures/Truffle.png');
        this.load.image('Cotton_Candy', './assets/rare_creatures/Cotton_Candy.png');
        this.load.image('leonis', './assets/legendary_creatures/leonis.png');

        this.load.image('uistrawberry', './assets/legendary_creatures/StrawberryPopup.png');
        this.load.image('uinarwhal', './assets/basic_creatures/narwhalPopup.png');
        this.load.image('uiblossom', './assets/basic_creatures/blossomPopup.png');
        this.load.image('uiprince', './assets/legendary_creatures/princePopup.png');
        this.load.image('uionion-chan', './assets/basic_creatures/onion-chanPopup.png');
        this.load.image('uielectro', './assets/rare_creatures/electroPopup.png');
        this.load.image('uiTruffle', './assets/rare_creatures/TrufflePopup.png');
        this.load.image('uiCotton_Candy', './assets/rare_creatures/Cotton_CandyPopup.png');
        this.load.image('uileonis', './assets/legendary_creatures/leonisPopup.png');
    }

    create() {
        commonsPulled = 0;
        raresPulled = 0;
        legendariesPulled = 0;
        collectedCreatures = [];
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
            repeat: 2,
            frames: this.anims.generateFrameNumbers('drop', {start: 0, end: 3, first: 0}),
            frameRate: 4
        })
        
        //variable initiallization section
        const TOP = 3;
        const MIDDLE = 2;
        const BOTTOM = 1;
        this.scoreText = this.add.text(190, game.config.height - 25, "0", playTextConfig).setOrigin(1,0.5);
        this.scoreText.depth = TOP;
        this.pointer = game.input.activePointer;
        this.score = 0;
        this.canPress = false;
        this.displayMenu = false;
        this.addEssence = false;
        this.timeStep = false;
        this.pondLevel = 3;
        var rect;
        this.eggs = [new spawnPositions(false, 250, 400), new spawnPositions(false, 400, 450), new spawnPositions(false, 650, 425)];
        this.uiPopUps = new Queue();
        this.popupDisplayed = false;
        this.restart = this.add.image(game.config.width/2 - 100, game.config.height/2 + 150, 'restart');
        this.mainMenu = this.add.image(game.config.width/2 + 100, game.config.height/2 + 150, 'mainMenu');
        this.congrats = this.add.image(game.config.width/2, game.config.height/2, 'congrats');
        this.restart.alpha = 0;
        this.mainMenu.alpha = 0;
        this.congrats.alpha = 0;
        this.restart.depth = TOP;
        this.mainMenu.depth = TOP;
        this.congrats.depth = MIDDLE;


        //static menu setup
        this.uibar = this.add.image(0, game.config.height - 50, 'uibar').setOrigin(0,0);
        this.uibar.depth = MIDDLE;


        //interactable menu setup
        this.menuButton = this.add.image(game.config.width - 84, game.config.height - 50, 'menu').setOrigin(0,1).setInteractive();

        this.closeMenuButton = this.add.image(game.config.width - 84, game.config.height - 150 - 33, 'closeMenu').setOrigin(0,0);
        this.closeMenuButton.depth = TOP;
        this.closeMenuButton.alpha = 0;

        this.pond = this.add.image(-100, -100, 'pondTab').setOrigin(0,1);
        this.pond.depth = BOTTOM;

        this.pods = this.add.image(-100, -100, 'podsTab').setOrigin(0,1);
        this.pods.depth = BOTTOM;

        this.creatures = this.add.image(-100, -100, 'creaturesTab').setOrigin(0,1);
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


        //restart and menu buttons
        this.restart.on('pointerdown', function(){
            this.sound.stopAll();
            this.scene.restart();
        }, this);
        this.mainMenu.on('pointerdown', function(){
            this.sound.stopAll();
            this.scene.start("menuScene");
        }, this);
        
        //buy button event listeners
        this.buy1.on('pointerdown', function(){
            this.score--;
            if(commonsPulled >= MAX_COM-1){
                this.buy1.alpha = 0.5;
            }
            if(this.score >= 10 && commonsPulled<MAX_COM){
                this.pullCreature('C');
            }
        }, this)

        this.buy2.on('pointerdown', function(){
            this.score--;
            if(raresPulled >= MAX_RARE-1){
                this.buy2.alpha = 0.5;
            }
            if(this.score >= 100 && raresPulled<MAX_RARE){
                this.pullCreature('R');
            }
        }, this);

        this.buy3.on('pointerdown', function(){
            this.score--;
            if(legendariesPulled >= MAX_LEG-1){
                this.buy3.alpha = 0.5;
            }
            if(this.score >= 1000 && legendariesPulled<MAX_LEG){
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
            //this.pond.x = 0;
            //this.pond.y = game.config.height - 150;
            this.pods.x = 0;
            this.pods.y = game.config.height - 150;
            //this.creatures.x = 112*2;
            //this.creatures.y = game.config.height - 150;
            console.log("pods clicked");

            //disable creatures tab display
            this.creaturesTabDisable();

            //disable pond display
            this.pondTabDisable();

            //display purchasable containers for creatures
            this.pods.setTexture('wpodsTab');
            rect.fillColor = 0xFFFFFF;
            if(commonsPulled == MAX_COM){
                this.buy1.alpha = 0.5;
            }else{
                this.buy1.alpha = 1;
            }
            this.buy1.setInteractive();
            if(raresPulled == MAX_RARE){
                this.buy2.alpha = 0.5;
            }else{
                this.buy2.alpha = 1;
            }
            this.buy2.setInteractive();
            if(legendariesPulled == MAX_LEG){
                this.buy3.alpha = 0.5;
            }else{
                this.buy3.alpha = 1;
            }
            this.buy3.setInteractive();
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
            this.pond.x = -100;
            this.pond.y = -100;
            this.pods.x = -100;
            this.pods.y = -100;
            this.creatures.x = -100;
            this.creatures.y = -100;

            /*this.pond.x = 0;
            this.pond.y = game.config.height - 50;
            this.pods.x = 112;
            this.pods.y = game.config.height - 50;
            this.creatures.x = 112*2;
            this.creatures.y = game.config.height - 50; */

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

            //display purchasable containers for creatures
            this.pods.setTexture('wpodsTab');
            rect.fillColor = 0xFFFFFF;
            if(commonsPulled == MAX_COM){
                this.buy1.alpha = 0.5;
            }else{
                this.buy1.alpha = 1;
            }
            this.buy1.setInteractive();
            if(raresPulled == MAX_RARE){
                this.buy2.alpha = 0.5;
            }else{
                this.buy2.alpha = 1;
            }
            this.buy2.setInteractive();
            if(legendariesPulled == MAX_LEG){
                this.buy3.alpha = 0.5;
            }else{
                this.buy3.alpha = 1;
            }
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

        //eggs waiting animation
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

        //eggs ready to hatch animation
        this.commonReady = this.anims.create({
            key: 'commonReady',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('commonEggR', {start: 0, end: 1, first: 0}),
            frameRate: 2
        });
        this.rareReady = this.anims.create({
            key: 'rareReady',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('rareEggR', {start: 0, end: 1, first: 0}),
            frameRate: 2
        });
        this.legendaryReady = this.anims.create({
            key: 'legendaryReady',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('legendaryEggR', {start: 0, end: 1, first: 0}),
            frameRate: 2
        });

        //creature sprite animations
        this.strawberryAnim = this.anims.create({
            key: 'strawberryAnim',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('strawberry', {start: 0, end: 1, first: 0}),
            frameRate: 2
        });
        this.narwhalAnim = this.anims.create({
            key: 'narwhalAnim',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('narwhal', {start: 0, end: 1, first: 0}),
            frameRate: 2
        });
        this.blossomAnim = this.anims.create({
            key: 'blossomAnim',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('blossom', {start: 0, end: 1, first: 0}),
            frameRate: 2
        });

        //creature sprite initialization
        this.strawberry = this.add.sprite(600, 200, 'holder').play('strawberryAnim');
        this.strawberry.alpha = 0;
        this.narwhal = this.add.sprite(400, 350, 'holder').play('narwhalAnim');
        this.narwhal.alpha = 0;
        this.blossom = this.add.sprite(100, 300, 'holder').play('blossomAnim');
        this.blossom.alpha = 0;
        this.prince = this.add.sprite(850, 200, 'prince');
        this.prince.alpha = 0;
        this.electro = this.add.sprite(850, 320, 'electro');
        this.electro.alpha = 0;
        this.onion_chan = this.add.sprite(300, 200, 'onion-chan');
        this.onion_chan.alpha = 0;
        this.Truffle = this.add.sprite(750, 410, 'Truffle');
        this.Truffle.alpha = 0;
        this.Cotton_Candy = this.add.sprite(450, 240, 'Cotton_Candy');
        this.Cotton_Candy.alpha = 0;
        this.leonis = this.add.sprite(100, 150, 'leonis');
        this.leonis.alpha = 0;

    }
    update(){
        if(this.pointer.leftButtonDown() && this.canPress){
            if(this.popupDisplayed){
                this.popup.destroy();
                this.popupDisplayed = false;
            }
            this.sound.play('water', { volume: 0.1 });
            this.canPress = false;
            this.score++;
            let dropper = this.add.sprite(this.pointer.x, this.pointer.y, 'drop').setOrigin(0, 0);
            dropper.play('drops');
            this.time.delayedCall(2000, () => {
                dropper.destroy();
            }, this);
        }
        if(!this.uiPopUps.isEmpty() && !this.popupDisplayed){
            this.popup = this.add.image(game.config.width/2, game.config.height/2, this.uiPopUps.dequeue());
            this.popup.depth = 2;
            this.popupDisplayed = true;
        }
        if(this.pointer.leftButtonReleased() &&  !this.canPress){
            this.canPress = true;
        }

        if(!this.timeStep){
            this.timeStep = true;
            for(let i=0; i<this.pondLevel; i++){
                if(this.eggs[i].flag){
                    this.eggs[i].timer -= 1000;
                    this.eggs[i].text.setText(this.formatTime(this.eggs[i].timer));
                }
            }
            this.time.delayedCall(1000, () => {
                this.timeStep = false;
            }, this);
        }
        //check if  game is over
        if(commonsPulled == MAX_COM && raresPulled == MAX_RARE && legendariesPulled == MAX_LEG){
            if(!this.eggs[0].flag && !this.eggs[1].flag && !this.eggs[2].flag && !this.popup.active){
                this.time.delayedCall(10000, () => {
                    this.restart.alpha = 0.8;
                    this.mainMenu.alpha = 0.8;
                    this.congrats.alpha = 1;
                    this.restart.setInteractive();
                    this.mainMenu.setInteractive();
                }, this);
            }
        }

        //add score passivly every 10 seconds
        if(!this.addEssence){
            this.addEssence = true;
            this.time.delayedCall(10000, () => {
                this.score += (commonsPulled + (10 * raresPulled) + (100 * legendariesPulled));
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
        const LEG_TIME = 45 * 1000;
        const RARE_TIME = 20 * 1000;
        const COM_TIME = 10 * 1000;
        
        //find spawn location for egg
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
                    ptr.text = this.add.text(ptr.x - 18, ptr.y + 13, this.formatTime(COM_TIME));
                    ptr.timer = COM_TIME;
                    while(true){
                        pull = Phaser.Math.RND.pick(commonCreatures);
                        if(collectedCreatures.indexOf(pull) == -1){
                            this.time.delayedCall(COM_TIME, () => {
                                ptr.flag = false;
                                ptr.object.destroy();
                                ptr.text.destroy();
                                //ptr.object.play('commonReady');
                                this.sound.play('hat', { volume: 0.3 });
                                this.displayCreature(pull);
                            }, this);
                            collectedCreatures += pull;
                            commonsPulled++;
                            this.score -= 10;
                            console.log(pull);
                            break;
                        }
                    }
                    break;
                case 'R':
                    ptr.object = this.add.sprite(ptr.x, ptr.y, 'holder').play('rareBob');
                    ptr.text = this.add.text(ptr.x - 18, ptr.y + 13, this.formatTime(RARE_TIME));
                    ptr.timer = RARE_TIME;
                    while(true){
                        pull = Phaser.Math.RND.pick(rareCreatures);
                        console.log(pull);
                        if(collectedCreatures.indexOf(pull) == -1){
                            this.time.delayedCall(RARE_TIME, () => {
                                ptr.flag = false;
                                ptr.object.destroy();
                                ptr.text.destroy();
                                //ptr.object.play('rareReady');
                                this.sound.play('hat', { volume: 0.3 });
                                this.displayCreature(pull);
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
                    ptr.text = this.add.text(ptr.x - 18, ptr.y + 13, this.formatTime(LEG_TIME));
                    ptr.timer = LEG_TIME;
                    while(true){
                        pull = Phaser.Math.RND.pick(legendaryCreatures);
                        console.log(pull);
                        if(collectedCreatures.indexOf(pull) == -1){
                            this.time.delayedCall(LEG_TIME, () => {
                                ptr.flag = false;
                                ptr.object.destroy();
                                ptr.text.destroy();
                                //ptr.object.play('legendaryReady');
                                this.sound.play('hat', { volume: 0.3 });
                                this.displayCreature(pull);
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

    formatTime(startTime){
        let converted = startTime/1000;
        let minutes = 0;
        let seconds = 0;
        let string = "";
        seconds = converted%60;
        minutes = Math.floor(converted/60);
        if(minutes >= 1){
            if(minutes >= 10){
                string += minutes + ":";
            }else{
                string += "0"+minutes + ":";
            }
        }else{
            string += "00:";
        }
        if(seconds >= 1){
            if(seconds >= 10){
                string += seconds;
            }else{
                string += "0" + seconds;
            }
        }else{
            string += "00";
        }
        return string;
    }

    displayCreature(name){
        switch(name){
            case('strawberry'):
                this.strawberry.alpha = 1;
                this.uiPopUps.enqueue('uistrawberry');
                break;
            case('narwhal'):
                this.narwhal.alpha = 1;
                this.uiPopUps.enqueue('uinarwhal');
                break;
            case('prince'):
                this.prince.alpha = 1;
                this.uiPopUps.enqueue('uiprince');
                break;
            case('blossom'):
                this.blossom.alpha = 1;
                this.uiPopUps.enqueue('uiblossom');
                break;
            case('electro'):
                this.electro.alpha = 1;
                this.uiPopUps.enqueue('uielectro');
                break;
            case('onion-chan'):
                this.onion_chan.alpha = 1;
                this.uiPopUps.enqueue('uionion-chan');
                break;
            case('Truffle'):
                this.Truffle.alpha = 1;
                this.uiPopUps.enqueue('uiTruffle');
                break;
            case('Cotton_Candy'):
                this.Cotton_Candy.alpha = 1;
                this.uiPopUps.enqueue('uiCotton_Candy');
                break;
            case('leonis'):
                this.leonis.alpha = 1;
                this.uiPopUps.enqueue('uileonis');
        }
    }
}

//code for Queue provided from online
// https://code.iamkate.com/javascript/queues/
function Queue(){
    var a=[], b=0;
    this.getLength=function()
    {
        return a.length-b
    };
    this.isEmpty=function(){
        return 0==a.length
    };
    this.enqueue=function(b){
        a.push(b)
    };
    this.dequeue=function(){
        if(0!=a.length){
            var c=a[b];2*++b>=a.length&&(a=a.slice(b),b=0);
            return c
        }
    };
    this.peek=function(){
        return 0<a.length?a[b]:void 0
    }
};
//----------END BARROWED CODE-------------
class spawnPositions{
    constructor(flag, x, y){
        this.flag = flag;
        this.x = x;
        this.y = y;
        this.object;
        this.timer;
        this.text;
    }
}