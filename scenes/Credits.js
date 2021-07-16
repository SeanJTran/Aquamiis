class Credits extends Phaser.Scene{
    constructor() {
        super("creditScene");
    }

    preload(){
        this.load.image('sofield', './assets/credit.png');
        this.load.audio('clicks', './assets/clicks.wav');
    }

    create(){
        this.sofield = this.add.tileSprite(0, 0, 960, 540, 'sofield').setOrigin(0, 0);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start('menuScene');    
        }
    }
}