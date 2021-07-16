/*
Collaborators: Alicia Zhen, Joe Carter, Sean Tran
Game Title:
Date Completed:
*/
let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 540,
    scene: [Menu, Credits, Play],
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

var collectedCreatures = [];
var commonCreatures = ['narwhal'];
var rareCreatures = ['strawberry'];
var legendaryCreatures = ['Swamp', 'River', 'Grass', 'Lives'];
var commonsPulled = 0;
var raresPulled = 0;
var legendariesPulled = 0;

let keySpace;
let keyM;
let keyC;