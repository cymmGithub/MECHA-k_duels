import { ValidationError } from "../utils/error";
import { v4 as uuid } from 'uuid'
import { pool } from "../utils/db";
import { PilotRecordResult } from "../ts/interfaces/mech";
import { FieldPacket } from "mysql2";



export class PilotRecord {

    public id?: string;
    public readonly pilotName: string;
    public readonly mechName: string;
    public strength: number;
    public defense: number;
    public stamina: number;
    public agility: number;
    public wins?: number;

    constructor(obj: Omit<PilotRecord, 'insert' | 'update'>) {

        const { id, pilotName, strength, defense, stamina, agility, wins, mechName } = obj;
        this.id = id ?? uuid();
        this.wins = wins ?? 0;
        this.pilotName = pilotName;
        this.strength = strength;
        this.defense = defense;
        this.stamina = stamina;
        this.agility = agility;
        this.mechName = mechName;
        this.validate();

    }

    private validate() {
        const statsArr = [this.strength, this.defense, this.stamina, this.agility];
        const sum = statsArr.reduce((prev, curr) => prev + curr, 0);

        for (const stat of statsArr) {
            if (stat < 1) {
                throw new ValidationError('You have to put at least 1 point in every stat')
            }
        }
        if (sum !== 18) {
            throw new ValidationError(`Sum of your abilities has to be 18, actually it is ${sum}`);

        }
        if (Number(this.pilotName) || this.pilotName.trim().length < 3 || this.pilotName.trim().length > 55 || !this.pilotName) {
            throw new ValidationError(`Your pilotName have to be between 3 and 55 chars, actually it is ${this.pilotName.length}`);
        }
    }
    async insert(): Promise<string> {
        await pool.execute('INSERT INTO `pilots` VALUES (:id, :pilotName, :strength, :defense, :stamina, :agility, :wins, :mechName)', {
            id: this.id,
            pilotName: this.pilotName,
            strength: this.strength,
            defense: this.defense,
            stamina: this.stamina,
            agility: this.agility,
            wins: this.wins,
            mechName: this.mechName,
        });

        return this.id;

    }
    async update(id: string): Promise<void> {
        await pool.execute('UPDATE `pilots` SET `wins` = :wins WHERE `id` = :id', {
            wins: this.wins,
            id,
        })
    }
    static async getOne(id: string): Promise<PilotRecord | null> {
        const [result] = await pool.execute('SELECT * FROM `pilots` WHERE `id` = :id', {
            id,
        }) as PilotRecordResult;


        return result.length === 0 ? null : new PilotRecord(result[0]);

    }
    static async listAll(): Promise<PilotRecord[]> {
        const [result] = await pool.execute('SELECT * FROM `pilots` ORDER BY `pilotName`') as [PilotRecord[], FieldPacket[]];

        return result.map(obj => new PilotRecord(obj));

    }
    static async listTop(topCount: number): Promise<PilotRecord[]> {
        const [result] = await pool.execute('SELECT * FROM `pilots` ORDER BY `wins` DESC LIMIT :topCount', {
            topCount: topCount.toString(),
        }) as PilotRecordResult;

        return result.map(obj => new PilotRecord(obj));
    }
    static async isNameTaken(pilotName: string): Promise<boolean> {
        const [result] = await pool.execute('SELECT * FROM `pilots` WHERE `pilotName` = :pilotName', {
            pilotName,
        }) as PilotRecordResult;


        return result.length > 0;
    }
}

