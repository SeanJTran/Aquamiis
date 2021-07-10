/*
Collaborators: Alicia Zhen, Joe Carter, Sean Tran
Game Title:
Date Completed:
Creative Tilt Justification:
*/
let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 540,
    scene: [Menu, Play],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 1000},
            debug: false
        }
    }
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keySpace;