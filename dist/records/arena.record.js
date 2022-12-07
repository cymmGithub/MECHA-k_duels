"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arena = void 0;
class Arena {
    constructor(pilot1, pilot2) {
        this.pilot1 = pilot1;
        this.pilot2 = pilot2;
        this.log = [];
    }
    fight() {
        let attacker;
        let defender;
        const starting = Math.floor(Math.random() * 2) - 1;
        if (starting) {
            attacker = this.pilot1;
            defender = this.pilot2;
        }
        else {
            attacker = this.pilot2;
            defender = this.pilot1;
        }
        return this.getWinner(attacker, defender);
    }
    getWinner(attacker, defender) {
        while (true) {
            this.log.push(`${attacker.pilotName} is attacking ${defender.pilotName}`);
            defender.hasDefense() ?
                defender.calculateDefenseDamage(attacker, defender, this.log) :
                defender.calculateRawDamage(attacker, defender, this.log);
            if (defender.healthPoints <= 0) {
                this.log.push(`${defender.pilotName} is defeated`);
                return attacker;
            }
            [defender, attacker] = [attacker, defender];
        }
    }
}
exports.Arena = Arena;
//# sourceMappingURL=arena.record.js.map