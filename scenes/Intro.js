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
    }

    create(){
        this.slides = ['tutorial', 'lore1', 'lore2', 'lore3', 'lore4'];
        this.justClicked = true;
        this.slideIndex = 0;
        this.bg = this.add.image(0, 0, 'tutorial').setOrigin(0,0);
        //this.add.rectangle(100,200, 200, 400, 0xfff)
        this.pointer = game.input.activePointer;
    }

    update(){

        var leftDown = this.pointer.leftButtonDown();
        if(this.pointer.leftButtonReleased()){
          this.justClicked = false;
        }
        if(leftDown && !this.justClicked){
            if(this.bg.texture.key == 'lore4'){
                //console.log("swap");
                this.sound.stopAll();
                this.scene.start("playScene");
            }
            this.slideIndex++;
            this.bg.setTexture(this.slides[this.slideIndex]);
            this.justClicked = true;
        }
        
    }

}