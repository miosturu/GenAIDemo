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


// Define Player
var playerAttacks = [
    new Attack("Attack 0", 3, 10), 
    new Attack("Attack 1", 5, 2),
    new Attack("Attack 2", 3, 10), 
    new Attack("Attack 3", 5, 2)
];
var player = new Player("Player", 10, 10, playerAttacks);

// Define Enemy
var enemyData;
var enemyAttacks = [
    new Attack("Enemy attack", 1, 100)
];
var enemy = new Enemy("Enemy", 5, 10, enemyAttacks, 'enemy');
var enemyImage;
var enemyUiInfo;

// Game variables
var button = [];
var gamemanager = new Gamemanager(player, enemy);
var characterInfo;
var attackInfo;


function preload()
{
    enemyData = getEnemyData();
    console.log(enemyData);
    console.log(enemyData[0])
    this.load.image('background', 'assets/backgrounds/background_brown.png');
    this.load.image('button', 'assets/sprites/button.png');
    this.load.image('enemy', 'assets/sprites/enemy.png');
    this.load.image('enemy_yellow', 'assets/sprites/enemy_yellow.png');
}


function create()
{
    this.add.image(400, 300, 'background');
    
    // Create buttons for attacks
    for (var i = 0; i < 4; i++)
    {
        button.push(this.add.image( 40 + 75 * (i), 550, 'button'));
        button[i].setInteractive();
        button[i].setScale(2);
        button[i].myid = i;
        button[i].on('pointerup', onButtonPressed);
    }

    // Create UI text
    characterInfo = [
        this.add.text(16, 16, "HP: "  + player.currentHp, {fontSize: "32px"}),
        this.add.text(16, 48, "Gold: " + player.currentGold, {fontSize: "32px"})
    ];

    // Create UI for attack info
    attackInfo = [
        this.add.text(
            16, 100, 
            player.attacks[0].name + ", DMG: " + player.attacks[0].damage + 
            "\nUses: " + player.attacks[0].uses,
            {fontSize: "32px"}),
        this.add.text(
            16, 175, 
            player.attacks[1].name + ", DMG: " + player.attacks[1].damage + 
            "\nUses: " + player.attacks[1].uses,
            {fontSize: "32px"}),
        this.add.text(
            16, 250, 
            player.attacks[2].name + ", DMG: " + player.attacks[2].damage + 
            "\nUses: " + player.attacks[2].uses,
            {fontSize: "32px"}),
        this.add.text(
            16, 325, 
            player.attacks[3].name + ", DMG: " + player.attacks[3].damage + 
            "\nUses: " + player.attacks[3].uses,
            {fontSize: "32px"})
    ];

    enemyUiInfo = this.add.text(
        525, 16, 
        enemy.name + "\nHP: " + enemy.currentHp, 
        {fontSize: "32px"}
    );

    enemyImage = this.add.sprite(575, 250, 'enemy');
    enemyImage.setScale(4);
    
}


function onButtonPressed(pointer, gameObject)
{
    gamemanager.getParameters(this.myid);
    updateUi();
}


function update() {
}


function updateUi() {
    if (enemy.currentHp <= 0) {
        enemyImage.setActive(false).setVisible(false);
        getNewEnemy();
    }

    updateUiText();
}


function updateUiText() {
    characterInfo[0].setText("HP: " + player.currentHp);
    characterInfo[1].setText("Gold: " + player.currentGold);

    for (var i = 0; i < player.attacks.length; i++) {
        attackInfo[i].setText(
            player.attacks[i].name + ", DMG: " + player.attacks[i].damage + 
                "\nUses: " + player.attacks[i].uses
        );
    }

    enemyUiInfo.setText(
        enemy.name + "\nHP: " + enemy.currentHp
    );
}


function getNewEnemy() {
    console.log("New enemy");
    // TODO Select random enemy
    // TODO Reset Hp for the enemy
    // TODO Add make the enemy visible
    enemyImage.setTexture('enemy_yellow');
    enemyImage.setActive(true).setVisible(true);
}


async function getEnemyData() {
    // TODO How can I make this work?
    console.log("Loading enemy data")
    const res = await fetch("enemies.json");
    const json = await res.json();
    return json;
}

const game = new Phaser.Game(config);