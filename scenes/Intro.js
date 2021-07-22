class Intro extends Phaser.Scene {
    constructor() {
        super('introScene');
    }

    preload(){
        this.load.image('lore1', './assets/lore1.png');
        this.load.image('lore2', './assets/lore2.png');
        this.load.image('lore3', './assets/lore3.png');
        this.load.image('lore4', './assets/lore4.png');
        this.load.image('tutorial', './assets/tutorial.png');
        this.load.image('tutorial2', './assets/tutorial2.png');
        this.load.image('tutorial3', './assets/tutorial3.png');
        this.load.image('tutorial4', './assets/tutorial4.png');
        this.load.image('tutorial5', './assets/tutorial5.png');
        this.load.image('tutorial6', './assets/tutorial6.png');
        this.load.image('tutorial7', './assets/tutorial7.png');
        this.load.audio('clicks', './assets/clicks.wav');
    }

    create(){
        this.slides = ['lore1', 'lore2', 'lore3', 'lore4', 'tutorial', 'tutorial2', 'tutorial3', 'tutorial5', 'tutorial7'];
        this.justClicked = true;
        this.slideIndex = 0;
        this.bg = this.add.image(0, 0, 'lore1').setOrigin(0,0);  
        this.pointer = game.input.activePointer;
    }

    update(){

        var leftDown = this.pointer.leftButtonDown();
        if(this.pointer.leftButtonReleased()){
          this.justClicked = false;
        }
        if(leftDown && !this.justClicked){
            if(this.bg.texture.key == 'tutorial7'){
                this.sound.stopAll();
                this.scene.start("playScene");
            }
            this.slideIndex++;
            this.bg.setTexture(this.slides[this.slideIndex]);
            this.justClicked = true;
            let clicksound = {
                mute: false,
                volume: 2,
                rate: 0.9,
                detune: 0,
                seek: 0,
                loop: false,
                delay: 0,
                pan: 0
            }
            this.sound.play("clicks", clicksound); 
        }
        
    }

}