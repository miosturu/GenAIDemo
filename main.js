"use strict";

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


// Player
var playerAttacks = [
    new Attack("Attack 0", 3, 10), 
    new Attack("Attack 1", 5, 2),
    new Attack("Attack 2", 3, 10), 
    new Attack("Attack 3", 5, 2)
];
var player = new Player("Player", 10, playerAttacks);

// Enemy
var enemyAttacks = [
    new Attack("Enemy attack", 1, 100)
];
var enemy = new Enemy("Enemy", 5, enemyAttacks, 10, null);

// Game variables
var button = [];
var gamemanager = new Gamemanager(player, enemy);


function preload ()
{
    this.load.image('background', 'assets/backgrounds/background_brown.png');
    this.load.image('button', 'assets/sprites/button.png');
}


function create ()
{
    this.add.image(400, 300, 'background');

    // Create buttons for attacks
    for (var i = 0; i < 4; i++)
    {
        button.push(this.add.image( 40 + 75 * (i), 400, 'button'));
        button[i].setInteractive();
        button[i].setScale(2);
        button[i].myid = i;
        button[i].on('pointerup', onButtonPressed);
    }
}


function onButtonPressed(pointer, gameObject)
{
    gamemanager.getParameters(this.myid);
}


function update ()
{
}

const game = new Phaser.Game(config);