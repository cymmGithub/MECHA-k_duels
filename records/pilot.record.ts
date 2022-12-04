import { ValidationError } from "../utils/error";
import { v4 as uuid } from 'uuid'
import { pool } from "../utils/db";
import { PilotRecordResult } from "../ts/interfaces/mech";
import { FieldPacket } from "mysql2";



export class PilotRecord {

    public id?: string;
    public readonly pilotName: string;
    public readonly mechName: string;
    public readonly strength: number;
    public readonly stamina: number;
    public readonly agility: number;
    public readonly defense: number;
    public wins?: number;
    public enemy?: boolean;
    private hp: number;
    private defensePoints: number;


    constructor(obj: Omit<PilotRecord, 'insert' | 'update'>) {

        const { id, pilotName, strength, defense, stamina, agility, wins, mechName } = obj;
        this.id = id ?? uuid();
        this.wins = wins ?? 0;
        this.pilotName = pilotName;
        this.strength = strength;
        this.defense = defense;
        this.defensePoints = defense + (wins * 0.2)
        this.stamina = stamina;
        this.hp = this.stamina * 10;
        this.agility = agility;
        this.mechName = mechName;
        this.healthPoints;
        this.validate();

    }
    public set healthPoints(healthPointsLeft: number) {
        this.hp = healthPointsLeft;
    }
    public get healthPoints(): number {
        return this.hp;
    }


    private validate() {
        const statsArr = [this.strength, this.defense, this.stamina, this.agility];
        const sum = statsArr.reduce((prev, curr) => prev + curr, 0);

        for (const stat of statsArr) {
            if (stat < 1) {
                throw new ValidationError('You have to put at least 1 point in every stat')
            }
        }
        if (Number(this.pilotName) || this.pilotName.trim().length < 3 || this.pilotName.trim().length > 20 || !this.pilotName) {
            throw new ValidationError(`Your pilotName have to be between 3 and 20 chars, actually it is ${this.pilotName.length}`);
        }
        if (sum !== 18) {
            throw new ValidationError(`Sum of your abilities has to be 18, actually it is ${sum}`);

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
    static async getRandom(id: string): Promise<PilotRecord> {
        const [result] = await pool.execute('SELECT * FROM `pilots` WHERE NOT `id` = :id', {
            id,
        }) as [PilotRecord[], FieldPacket[]];
        const mechList = result.map(obj => new PilotRecord(obj));



        return mechList[Math.floor(Math.random() * mechList.length)];

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
    };

    public hasDefense(): boolean {
        return this.defense > 0;
    }
    public calculateDefenseDamage(attacker: PilotRecord, defender: PilotRecord, commentator: String[]) {


        if (attacker.strength <= defender.defensePoints) {

            commentator.push(`${defender.pilotName} BLOCKED ${attacker.pilotName}'s attack`)
            defender.defensePoints -= (attacker.strength - (Math.round(defender.agility / 5)));


            if (!this.hasDefense) {
                commentator.push(`${attacker.pilotName} succesfully broke ${defender.pilotName}'s defense ----- ${defender.pilotName} has no defense left`);
                defender.healthPoints += defender.defensePoints;
            }


        } else if (attacker.strength > defender.defensePoints && this.hasDefense) {

            defender.defensePoints -= (attacker.strength - (Math.round(defender.agility / 5)));

            defender.defensePoints <= 0 ?
                commentator.push(`${attacker.pilotName} broke  ${defender.pilotName}'s defense ----- ${defender.pilotName} has no defense left`) :
                commentator.push(`${attacker.pilotName} almost broke ${defender.pilotName}'s defense ----- ${defender.pilotName} got only ${defender.defensePoints.toFixed(1)} DP left`);

            if (!this.hasDefense) {
                defender.healthPoints += defender.defensePoints;
            }



        }

    }
    public calculateRawDamage(attacker: PilotRecord, defender: PilotRecord, commentator: String[]) {
        if (attacker.strength > defender.defensePoints && defender.defensePoints <= 0) {
            defender.healthPoints -= (attacker.strength - (Math.round(defender.agility / 5)));

            commentator.push(`${attacker.pilotName} successfully attacked ${defender.pilotName} for ${attacker.strength} damage ----- ${defender.pilotName} has ${defender.healthPoints < 0 ? 0 : defender.healthPoints} HP left`);
        }

    }

}