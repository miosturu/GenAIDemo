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

var button = [];

function preload ()
{
    this.load.image('background', 'assets/backgrounds/background_brown.png');
    this.load.image('button', 'assets/sprites/button.png');
}

function create ()
{
    this.add.image(400, 300, 'background');

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
    console.log(this.myid);
}

function update ()
{
}

const game = new Phaser.Game(config);