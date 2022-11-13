import { ValidationError } from "../utils/error";
import { v4 as uuid } from 'uuid'
import { pool } from "../utils/db";
import { MechRecordResult } from "../ts/interfaces/mech";
import { FieldPacket } from "mysql2";



export class MechRecord {

    public id?: string;
    public readonly name: string;
    public strength: number;
    public defense: number;
    public stamina: number;
    public agility: number;
    public wins?: number;

    constructor(obj: Omit<MechRecord, 'insert' | 'update'>) {

        const { id, name, strength, defense, stamina, agility, wins } = obj;
        this.id = id ?? uuid();
        this.wins = wins ?? 0;
        this.name = name;
        this.strength = strength;
        this.defense = defense;
        this.stamina = stamina;
        this.agility = agility;
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
        if (sum !== 10) {
            throw new ValidationError(`Sum of your abilities has to be 10, actually it is ${sum}`);

        }
        if (Number(this.name) || this.name.trim().length < 3 || this.name.trim().length > 55 || !this.name) {
            throw new ValidationError(`Your name have to be between 3 and 55 chars, actually it is ${this.name.length}`);
        }
    }
    async insert(): Promise<string> {
        await pool.execute('INSERT INTO `mechs` VALUES (:id, :name, :strength, :defense, :stamina, :agility, :wins)', {
            id: this.id,
            name: this.name,
            strength: this.strength,
            defense: this.defense,
            stamina: this.stamina,
            agility: this.agility,
            wins: this.wins,
        });

        return this.id;

    }
    async update(id: string): Promise<void> {
        await pool.execute('UPDATE `mechs` SET `wins` = :wins WHERE `id` = :id', {
            wins: this.wins,
            id,
        })
    }
    static async getOne(id: string): Promise<MechRecord | null> {
        const [result] = await pool.execute('SELECT * FROM `mechs` WHERE `id` = :id', {
            id,
        }) as MechRecordResult;


        return result.length === 0 ? null : new MechRecord(result[0]);

    }
    static async listAll(): Promise<MechRecord[]> {
        const [result] = await pool.execute('SELECT * FROM `mechs` ORDER BY `name`') as [MechRecord[], FieldPacket[]];

        return result.map(obj => new MechRecord(obj));

    }
    static async listTop(topCount: number): Promise<MechRecord[]> {
        const [result] = await pool.execute('SELECT * FROM `mechs` ORDER BY `wins` DESC LIMIT :topCount', {
            topCount: topCount.toString(),
        }) as MechRecordResult;

        return result.map(obj => new MechRecord(obj));
    }
}

