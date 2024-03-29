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
        "weakness": 0,
        "resistance": 1
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
        "weakness": 1,
        "resistance": 2
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
        "weakness": 2,
        "resistance": 0
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


/**
 * Phaser's own preload function.
 * Used for loading assets for the game.
 * I also use this for initiating game objects outside the game.
 */
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


/**
 * Phaser's own create-function.
 * Used for creating the entities for the game.
 * TODO create UI text if the enemy is critted or resisted the attack
 */
function create()
{
    // Add UI iamges
    this.add.image(400, 300, 'background');

    // 1st attack frame
    this.add.image(70, 130, 'frame')
    this.add.image(70, 160, 'frame')
    this.add.image(150, 130, 'frame')
    this.add.image(150, 160, 'frame')
    this.add.image(275, 130, 'frame')
    this.add.image(275, 160, 'frame')

    // 2nd attack frame
    this.add.image(70, 230, 'frame')
    this.add.image(70, 260, 'frame')
    this.add.image(150, 230, 'frame')
    this.add.image(150, 260, 'frame')
    this.add.image(275, 230, 'frame')
    this.add.image(275, 260, 'frame')

    // 3rd attack frame
    this.add.image(70, 330, 'frame')
    this.add.image(70, 360, 'frame')
    this.add.image(150, 330, 'frame')
    this.add.image(150, 360, 'frame')
    this.add.image(275, 330, 'frame')
    this.add.image(275, 360, 'frame')

    // 4th attack frame
    this.add.image(70, 430, 'frame')
    this.add.image(70, 460, 'frame')
    this.add.image(150, 430, 'frame')
    this.add.image(150, 460, 'frame')
    this.add.image(275, 430, 'frame')
    this.add.image(275, 460, 'frame')

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
            "\nUses: " + player.attacks[0].uses + 
            "\nDamage type:" + player.attacks[0].attackType,
            {fontSize: "32px"}),
        this.add.text(
            16, 200, 
            player.attacks[1].name + ", DMG: " + player.attacks[1].damage + 
            "\nUses: " + player.attacks[1].uses+ 
            "\nDamage type:" + player.attacks[1].attackType,
            {fontSize: "32px"}),
        this.add.text(
            16, 300, 
            player.attacks[2].name + ", DMG: " + player.attacks[2].damage + 
            "\nUses: " + player.attacks[2].uses+ 
            "\nDamage type:" + player.attacks[2].attackType,
            {fontSize: "32px"}),
        this.add.text(
            16, 400, 
            player.attacks[3].name + ", DMG: " + player.attacks[3].damage + 
            "\nUses: " + player.attacks[3].uses+ 
            "\nDamage type:" + player.attacks[3].attackType,
            {fontSize: "32px"})
    ];

    // Enemy UI info
    enemyUiInfo = this.add.text(
        525, 16, 
        enemy.name + "\nHP: " + enemy.currentHp, 
        {fontSize: "32px"}
    );

    // Rooms number info
    roomInfo = this.add.text(
        450, 350, 
        "Room: " + roomNumber,
        {fontSize: "64px"}
    );

    // Create enemy's sprite
    enemyImage = this.add.sprite(575, 250, enemy.sprite);
    enemyImage.setScale(4);
    
}


/**
 * When the player clicks the button, this is called.
 * This takes the name/index of the button and does the desired attack.
 */
function onButtonPressed(pointer, gameObject)
{
    // Sends the index of the attack
    gamemanager.getParameters(this.myid);
    updateUi();
    if (player.currentHp <= 0){
        // TODO Restart the game/the shop view
    }
}


/**
 * Updates the UI's text elements, gets the new enemy when it is killed.
 */
function updateUi() {
    if (enemy.currentHp <= 0) {
        enemyImage.setActive(false).setVisible(false);
        getNewEnemy();
    }

    updateUiText();
}


/**
 * Updates UI's text elemets.
 */
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


/**
 * Gets the new enemy. 
 * A random enemy from the list is chosen.
 * At the moment only called when the previous enemy is killed.
 */
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


/**
 * Random integer from 0 to number of different enemies.
 * @returns Ranom enemy's index
 */
function getRandomInt() {
    return Math.floor(Math.random() * Object.keys(enemyData).length)
}


/**
 * Load enemy data from a dict/JSON.
 * Ideally this would load the data from other file but at the momemt it doesn't work.
 */
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
                currentEnemy["weakness"],
                currentEnemy["resistance"],
            )
        );
    }
}

const game = new Phaser.Game(config);