import { SimpleArena } from "../ts/interfaces/arena";
import { PilotRecord } from "./pilot.record";


export class Arena implements SimpleArena {
    public fight(pilot1: PilotRecord, pilot2: PilotRecord): String[] {
        pilot1['stamina'] = pilot1.stamina * 10;
        pilot2['stamina'] = pilot1.stamina * 10;

        let attacker;
        let defender;
        const log: String[] = [];

        const starting = Math.floor(Math.random() * 2) - 1;
        if (starting) {
            attacker = pilot1;
            defender = pilot2;
        } else {
            attacker = pilot2;
            defender = pilot1;
        }

        do {
            if (attacker.strength > defender.stamina + defender.defense) {
                defender.defense = defender.defense - attacker.strength;
                defender
                log.push(`${attacker.pilotName} attack was succesful `)
            }
        } while (attacker.stamina > 0 && defender.stamina > 0)

    }
}