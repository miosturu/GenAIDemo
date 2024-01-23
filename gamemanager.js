"use strict";


class Gamemanager {
    constructor(player, enemy) {
        this.player = player;
        this.enemy = enemy;
        player.print();
        enemy.print();
    }

    getParameters(par) {
        var damage = this.player.doAttack(par);
        console.log("Player hit for " + damage + " points of damage");
        this.enemy.takeDamage(damage);
        console.log(
            "Current enemy HP.: " + 
            this.enemy.currentHp + 
            "/" + 
            this.enemy.maxHp);  


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
}