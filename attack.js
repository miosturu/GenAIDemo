"use strict";

// TODO add attack damage type
// Maybe use enmum?
class Attack {
    constructor(attackName, attackDamage, attackUses) {
        this.name = attackName,
        this.damage = attackDamage,
        this.uses = attackUses
    }

    print() {
        console.log(
            "Attack name: " + this.name,
            "\nAttack damage: " + this.damage,
            "\nUses: " + this.uses
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
}