import { ArenaResult, ArenaSkirmish } from "../ts/interfaces/arena";
import { PilotRecord } from "./pilot.record";


export class Arena implements ArenaSkirmish {
    public log: String[];

    constructor(
        public readonly pilot1: PilotRecord,
        public readonly pilot2: PilotRecord
    ) {
        this.log = [];

    }
    public fight(): PilotRecord {

        this.pilot1['stamina'] = this.pilot1.stamina * 10;
        this.pilot2['stamina'] = this.pilot2.stamina * 10;

        let attacker;
        let defender;


        const starting = Math.floor(Math.random() * 2) - 1;
        if (starting) {
            attacker = this.pilot1;
            defender = this.pilot2;
        } else {
            attacker = this.pilot2;
            defender = this.pilot1;
        }
        console.log(attacker);
        console.log(defender);
        do {
            this.log.push(`${attacker.pilotName} is attacking ${defender.pilotName}`)

            if (attacker.strength <= defender.defense) {

                this.log.push(`${defender.pilotName} BLOCKED ${attacker.pilotName} attack`)
                defender.defense -= (attacker.strength - (Math.round(defender.agility / 5)));


                if (defender.defense <= 0) {
                    this.log.push(`${attacker.pilotName} succesfully broke ${defender.pilotName} defense ----- ${defender.pilotName} has no defense left`);
                    defender.stamina += defender.defense;
                }


            } else if (attacker.strength > defender.defense && defender.defense > 0) {

                defender.defense -= (attacker.strength - (Math.round(defender.agility / 5)));

                defender.defense <= 0 ?
                    this.log.push(`${attacker.pilotName} broke ${defender.pilotName} defense ----- ${defender.pilotName} has no defense left`) :
                    this.log.push(`${attacker.pilotName} almost broke ${defender.pilotName} defense ----- ${defender.pilotName} got only ${defender.defense} DP left`);

                if (!(defender.defense > 0)) {
                    defender.stamina += defender.defense;
                }



            } else if (attacker.strength > defender.defense && defender.defense <= 0) {
                defender.stamina -= (attacker.strength - (Math.round(defender.agility / 5)));

                this.log.push(`${attacker.pilotName} successfully attacked ${defender.pilotName} for ${attacker.strength} damage ----- ${defender.pilotName} has ${defender.stamina < 0 ? 0 : defender.stamina} hp left`);
            }

            if (defender.stamina <= 0) {
                this.log.push(`${defender.pilotName} is defeated`);
            }
            [defender, attacker] = [attacker, defender];

        } while (attacker.stamina > 0 && defender.stamina > 0)

        const winner = defender;

        return winner;

    }
}