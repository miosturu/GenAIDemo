"use strict";

/**
 * Gamemanager class.
 * Keep tract of player and the enemy
 */
class Gamemanager {
    constructor(player, enemy) {
        this.player = player;
        this.enemy = enemy;
        player.print();
        enemy.print();
    }

    getParameters(par) {
        if (this.player.currentHp <= 0){
            return;
        }

        // Check if the enemy is weak to the damage
        var dmgMultiplier = 1;
        if ( this.player.attacks[par].attackType == this.enemy.weakness ) {
            dmgMultiplier = 4;
            console.log("Crit!");
        }

        // Check of the enemy has damage resistance to the attack
        if (this.player.attacks[par].attackType == this.enemy.resistance) {
            dmgMultiplier = 0.5;
            console.log("Resisted the attack!");
        }

        // Do the damage to the enemy
        var damage = this.player.doAttack(par);
        console.log("Player hit for " + damage + " points of damage");
        this.enemy.takeDamage(damage * dmgMultiplier);
        console.log(
            "Current enemy HP.: " + 
            this.enemy.currentHp + 
            "/" + 
            this.enemy.maxHp
        );  

        // If the enemy is alive
        if (this.enemy.currentHp > 0) {
            var enemyDamage = this.enemy.doAttack(0);
            console.log("Enemy hit for " + enemyDamage + " points of damage");
            this.player.takeDamage(enemyDamage);
        }

        // If the enemy has died
        if (this.enemy.currentHp <= 0) {
            console.log("Gold gained: " + this.enemy.goldOnKill)
            this.player.currentGold += this.enemy.goldOnKill;
        }
        console.log(
            "Current player HP.: " + 
            this.player.currentHp + 
            "/" + 
            this.player.maxHp);   
        console.log("\n\n");
    }

    changeEnemy(newEnemy) {
        this.enemy = newEnemy;
        this.enemy.currentHp = this.enemy.maxHp;
    }

    print() {
        console.log(
            this.enemy
        );
    }
}