import { ArenaResult, ArenaSkirmish } from "../ts/interfaces/arena";
import { PilotRecord } from "./pilot.record";


export class Arena implements ArenaSkirmish {
    public log: String[] = [];

    constructor(
        public readonly pilot1: PilotRecord,
        public readonly pilot2: PilotRecord
    ) { }

    public fight(): PilotRecord {


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
        return this.getWinner(attacker, defender)

    }

    private getWinner(attacker: PilotRecord, defender: PilotRecord): PilotRecord {

        while (true) {
            this.log.push(`${attacker.pilotName} is attacking ${defender.pilotName}`);
            if (defender.hasDefense) {
                defender.calculateDefenseDamage(attacker, defender, this.log)
            }
            defender.calculateRawDamage(attacker, defender, this.log);

            if (defender.healthPoints <= 0) {
                this.log.push(`${defender.pilotName} is defeated`);
                return attacker;
            }
            [defender, attacker] = [attacker, defender];

        }
    }
}