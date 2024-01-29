"use strict";

// TODO add attack damage type
// Maybe use enmum?
class Attack {
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