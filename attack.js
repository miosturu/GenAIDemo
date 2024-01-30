"use strict";

/**
 * Attack class that the character and its descendants use.
 */
class Attack {
    /**
     * Constructor for the attack object.
     * The damge is fixed to aid the reliability and to make things less random.
     * @param {string} attackName Attack's name
     * @param {integer} attackDamage Amount of damage the attack does
     * @param {integer} attackUses How many times the attack can be used
     * @param {integer} attackType Determines resistances and weaknesses
     */
    constructor(attackName, attackDamage, attackUses, attackType) {
        this.name = attackName,
        this.damage = attackDamage,
        this.uses = attackUses
        this.attackType = attackType;
    }

    print() {
        console.log(
            "Attack name: " + this.name,
            "\nAttack damage: " + this.damage,
            "\nUses: " + this.uses,
            "\nAttackType:" + this.attackType
        );
    }

    /**
     * Return the amount of damage the attacks does.
     * If One has used all the uses, this does 0 damge.
     * @returns Amount of damage the attack does
     */
    doAttack() {
        if (this.uses > 0) {
            this.uses--;
            return this.damage
        } else {
            return 0;
        }
    }

    changeAttackType(newAttackType) {
        this.attackType = newAttackType
    }
}