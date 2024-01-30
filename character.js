"use strict"

class Character {
    constructor(name, maxHp, attacks) {
        this.name = name,
        this.maxHp = maxHp,
        this.currentHp = maxHp,
        this.attacks = attacks
    }

    print() {
        console.log(
            "Name: " + this.name +
            "\nMax HP.: " + this.maxHp + 
            "\nCurrent HP.: " + this.currentHP + 
            "\nAttacks: " + this.attacks
        );
    }

    doAttack(attackIndex) {
        // console.log("Attack index: " + attackIndex);
        return this.attacks[attackIndex].doAttack();
    }

    takeDamage(amount) {
        // console.log(this.name + " took damage");
        this.currentHp -= amount;
        if (this.currentHp <= 0 ) {
            console.log(this.name + " took too much damage");
        }
    }
}


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