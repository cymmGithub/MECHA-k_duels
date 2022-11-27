import { PilotRecord } from "../../records/pilot.record";

export interface SimpleArena {
    fight(pilot1: PilotRecord, pilot2: PilotRecord): String[];
}