"use strict"

/**
 * Base class for entities that can do and take damage.
 */
class Character {
    constructor(name, maxHp, attacks) {
        this.name = name,
        this.maxHp = maxHp,
        this.currentHp = maxHp,
        this.attacks = attacks
    }

    /**
     * Basic print function. Not used anymore.
     */
    print() {
        console.log(
            "Name: " + this.name +
            "\nMax HP.: " + this.maxHp + 
            "\nCurrent HP.: " + this.currentHP + 
            "\nAttacks: " + this.attacks
        );
    }

    /**
     * Get the amount of damage from the attack if the uses the greater than 0.
     * @param {integer} attackIndex 
     * @returns Amount of damage from the attack. Failure is 0
     */
    doAttack(attackIndex) {
        // console.log("Attack index: " + attackIndex);
        return this.attacks[attackIndex].doAttack();
    }

    /**
     * Reduce character's health.
     * @param {integer} amount of damage taken
     */
    takeDamage(amount) {
        // console.log(this.name + " took damage");
        this.currentHp -= amount;
        if (this.currentHp <= 0 ) {
            console.log(this.name + " took too much damage");
        }
    }
}


/**
 * Enemy class. Has added parameters compared to base class such as:
 * gold on kill, sprite, weakness and resistance.
 */
class Enemy extends Character {
    constructor(name, hp, goldOnKill, attacks, sprite, weakness, resistance) {
        super(name, hp, attacks);
        this.sprite = sprite;
        this.goldOnKill = goldOnKill;
        this.weakness = weakness;
        this.resistance = resistance;
    }

    print() {
        console.log(
            "Name: " + this.name +
            "\nMax HP.: " + this.maxHp + 
            "\nCurrent HP.: " + this.currentHP + 
            "\nAttacks: " + this.attacks + 
            "\nGold on kill: " + this.goldOnKill + 
            "\nWeakness: " + this.weakness + 
            "\nResistance: " + this.resistance
        );
    }

    doAttack(attackIndex) {
        return super.doAttack(attackIndex);
    }

    takeDamage(amount) {
        return super.takeDamage(amount);
    }
}


/**
 * Player class. Has added parameter for gold on start.
 */
class Player extends Character {
    constructor(name, hp, goldOnStart, attacks) {
        super(name, hp, attacks);
        this.goldOnStart = goldOnStart;
        this.currentGold = goldOnStart;
    }

    print() {
        console.log(
            "Name: " + this.name +
            "\nMax HP.: " + this.maxHp + 
            "\nCurrent HP.: " + this.currentHP + 
            "\nGold: " + this.goldOnStart + 
            "\nAttacks: " + this.attacks
        );
    }
}