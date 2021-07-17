/*
Collaborators: Alicia Zhen, Joe Carter, Sean Tran
Game Title:
Date Completed:
*/
let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 540,
    scene: [Menu, Credits, Intro, Play],
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
var commonCreatures = ['narwhal', 'blossom', 'onion-chan'];
var rareCreatures = ['strawberry', 'electro'];
var legendaryCreatures = ['prince'];
var commonsPulled = 0;
var raresPulled = 0;
var legendariesPulled = 0;
const MAX_COM = 3; // change these as creatures get added to the arrays above
const MAX_RARE = 2;
const MAX_LEG = 1;

let keySpace;
let keyM;
let keyC;