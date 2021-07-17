class Intro extends Phaser.Scene {
    constructor() {
        super("introScene");
        console.log("introScene");
    }

    preload(){
        this.load.image('lore1', './assets/lore1.png');
        this.load.image('lore2', './assets/lore2.png');
        this.load.image('lore3', './assets/lore3.png');
        this.load.image('lore4', './assets/lore4.png');
        this.load.image('tutorial', './assets/tutorial.png');
        this.bg = this.add.image(0, 0, 'tutorial');
    }

    create(){
        this.slides = ['tutorial', 'lore1', 'lore2', 'lore3', 'lore4'];
        this.justClicked = false;
        this.slideIndex = 0;
    }

    update(){

        var leftDown = this.pointer.leftButtonDown();
        if(this.pointer.leftButtonReleased()){
          this.justClicked = false;
        }
        if(leftDown && !this.justClicked){
            if(this.bg.texture == 'lore4'){
                this.scene.start("playScene");
            }
            this.slideIndex++;
            this.bg.setTexture(slides[this.slideIndex]);
            this.justClicked = true;
        }
        
    }

}