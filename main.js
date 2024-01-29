"use strict";

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create
    }
};


// Define Player
var player;

// Define Enemy
// TODO Load this from seperate file
// At the moment this is good enough for demo purposes
const enemyData = {
    "enemy0":{
        "name": "Angry man",
        "hp": 5,
        "goldOnKill": 10,
        "attacks": {
            "attack0": {
                "name": "Slap",
                "damage": 1,
                "uses": 1000,
            }
        },
        "sprite": "enemy",
        "weakness": 0
    },
    "enemy1":{
        "name": "Suprised man",
        "hp": 10,
        "goldOnKill": 25,
        "attacks": {
            "attack0": {
                "name": "Scream",
                "damage": 3,
                "uses": 1000,
            }
        },
        "sprite": "enemy_yellow",
        "weakness": 1
    },
    "enemy2":{
        "name": "nnam saD",
        "hp": 1,
        "goldOnKill": 1,
        "attacks": {
            "attack0": {
                "name": "Wail",
                "damage": 10,
                "uses": 1000,
            }
        },
        "sprite": "enemy_blue",
        "weakness": 2
    }
}

// Enemy variables
var enemy; // Current enemy
var enemies = []; // Available enemies
var enemyImage;  // Sprite holder for the enemy
var enemyUiInfo; // UI info text for enemy

// Game variables
var button = [];
var gamemanager;
var characterInfo;
var attackInfo;
var roomInfo;
var roomNumber;

function preload()
{
    // Define player
    player = new Player(
        "Player", 
        20, // HP
        10, // Gold on start
        [
            new Attack("Hug", 3, 10, 0), 
            new Attack("Pat", 5, 2, 1),
            new Attack("Tickle", 10, 1, 2), 
            new Attack("Thumbs up", 2, 20, 0)
        ]
    );

    getEnemyData();
    enemy = enemies[getRandomInt()];

    roomNumber = 1;

    gamemanager = new Gamemanager(player, enemy);

    // Load UI components
    this.load.image('background', 'assets/backgrounds/background_brown.png');
    this.load.image('button', 'assets/sprites/button.png');
    this.load.image('frame', 'assets/backgrounds/frame_gray.png')

    // Load enemy sprites
    this.load.image('enemy', 'assets/sprites/enemy.png');
    this.load.image('enemy_yellow', 'assets/sprites/enemy_yellow.png');
    this.load.image('enemy_blue', 'assets/sprites/enemy_blue.png');
}


function create()
{
    // Add UI iamges
    this.add.image(400, 300, 'background');

    // 1st attack frame
    this.add.image(70, 130, 'frame')
    this.add.image(170, 130, 'frame')
    this.add.image(290, 130, 'frame')

    // 2nd attack frame
    this.add.image(70, 205, 'frame')
    this.add.image(170, 205, 'frame')
    this.add.image(290, 205, 'frame')

    // 3rd attack frame
    this.add.image(70, 280, 'frame')
    this.add.image(170, 280, 'frame')
    this.add.image(290, 280, 'frame')

    // ¤th attack frame
    this.add.image(70, 355, 'frame')
    this.add.image(170, 355, 'frame')
    this.add.image(290, 355, 'frame')

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

    // Enemy UI info
    enemyUiInfo = this.add.text(
        525, 16, 
        enemy.name + "\nHP: " + enemy.currentHp, 
        {fontSize: "32px"}
    );

    roomInfo = this.add.text(
        450, 350, 
        "Room: " + roomNumber,
        {fontSize: "64px"}
    );

    enemyImage = this.add.sprite(575, 250, enemy.sprite);
    enemyImage.setScale(4);
    
}


function onButtonPressed(pointer, gameObject)
{
    // Sends the index of the attack
    gamemanager.getParameters(this.myid);
    updateUi();
    if (player.currentHp <= 0){
        // TODO Restart the game/the shop view
    }
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

    // Update attack's info
    for (var i = 0; i < player.attacks.length; i++) {
        attackInfo[i].setText(
            player.attacks[i].name + ", DMG: " + player.attacks[i].damage + 
                "\nUses: " + player.attacks[i].uses
        );
    }

    // Set enemy's HP
    enemyUiInfo.setText(
        enemy.name + "\nHP: " + enemy.currentHp
    );
        
    // Set the room's number
    roomInfo.setText(
        "Room: " + roomNumber,
    );
}


function getNewEnemy() {
    console.log("New enemy");
    roomNumber++;
    enemy = enemies[getRandomInt()];
    
    gamemanager.changeEnemy(enemy);

    enemyImage.setTexture(enemy.sprite);

    // TODO add delay
    enemyImage.setActive(true).setVisible(true);

    gamemanager.print();
}


function getRandomInt() {
    return Math.floor(Math.random() * Object.keys(enemyData).length)
}


function getEnemyData() {

    for (var i = 0; i < Object.keys(enemyData).length; i++) {
        var currentEnemy = enemyData["enemy" + i];
        enemies.push(
            enemy = new Enemy(
                currentEnemy["name"], 
                currentEnemy["hp"],
                currentEnemy["goldOnKill"],
                [
                    new Attack(
                        currentEnemy["attacks"]["attack0"]["name"],
                        currentEnemy["attacks"]["attack0"]["damage"],
                        currentEnemy["attacks"]["attack0"]["uses"],
                    )
                ],
                currentEnemy["sprite"],
                currentEnemy["weakness"]
            )
        );
    }
}

const game = new Phaser.Game(config);