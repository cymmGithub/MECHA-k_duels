import { PilotRecord } from "../../records/pilot.record";

export interface ArenaResult {
    log: String[];
    winner: PilotRecord;
}

export interface ArenaSkirmish {
    pilot1: PilotRecord;
    pilot2: PilotRecord;
    fight(pilot1: PilotRecord, pilot2: PilotRecord): PilotRecord;
}