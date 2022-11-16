import { FieldPacket } from "mysql2";
import { PilotRecord } from "../../records/pilot.record";



export type PilotRecordResult = [PilotRecord[], FieldPacket[]];