/*
Collaborators: Alicia Zhen, Joe Carter, Sean Tran
Game Title: Aquamiis
Date Completed: 7/22/2021
*/
let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 540,
    scene: [Menu, Credits, Intro, Play],
    // Referenced for scale: https://photonstorm.github.io/phaser3-docs/Phaser.Scale.ScaleManager.html
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 1000},
            debug: false
        }
    },
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

var collectedCreatures = [];
var commonCreatures = ['narwhal', 'blossom', 'onion-chan'];
var rareCreatures = ['strawberry', 'electro', 'Cotton_Candy', 'Truffle'];
var legendaryCreatures = ['prince'];
var commonsPulled = 0;
var raresPulled = 0;
var legendariesPulled = 0;
const MAX_COM = 3; // change these as creatures get added to the arrays above
const MAX_RARE = 4;
const MAX_LEG = 1;
let keySpace;
let keyM;
let keyC;