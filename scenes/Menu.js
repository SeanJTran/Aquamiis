class Menu extends Phaser.Scene{
    constructor() {
        super("menuScene");
    }

    preload(){
      this.load.image('bgmenu', './assets/start.png');
      this.load.audio('menuMusic', './assets/menuMusic.mp3');
      this.load.audio('clicks', './assets/clicks.wav');
    }

    create(){
      this.backgroundmenu = this.add.tileSprite(0, 0, 960 , 540, 'bgmenu').setOrigin(0, 0);
      keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

      // initialize
      this.pointer = game.input.activePointer;
      this.menuStart = false;
      this.justClicked = false;
    }

    update(){
      if (Phaser.Input.Keyboard.JustDown(keyC)) {
        this.scene.start('creditScene');    
      }
      var leftDown = this.pointer.leftButtonDown();
      if(this.pointer.leftButtonReleased()){
        this.justClicked = false;
      }
      if(leftDown && !this.menuStart && !this.justClicked){
        console.log("PreStart");
        this.sound.play('menuMusic', {loop: true, volume: 0.2});
        this.menuStart = true;
        this.justClicked = true;
      }
      if(leftDown && this.menuStart && !this.justClicked){
          console.log("PostStart");
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
          this.sound.stopAll();
          this.scene.start("playScene");
      }

      /* ----  Keyboard input --------
      if (Phaser.Input.Keyboard.JustDown(keySpace)) {
        console.log("Playing");
        this.scene.start("playScene");
      }
      */
    }
}