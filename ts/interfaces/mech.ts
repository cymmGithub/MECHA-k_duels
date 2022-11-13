import { FieldPacket } from "mysql2";
import { MechRecord } from "../../records/mech.record";



export type MechRecordResult = [MechRecord[], FieldPacket[]];