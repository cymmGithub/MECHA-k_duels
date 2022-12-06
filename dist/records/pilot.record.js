"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PilotRecord = void 0;
const error_1 = require("../utils/error");
const uuid_1 = require("uuid");
const db_1 = require("../utils/db");
class PilotRecord {
    constructor(obj) {
        const { id, pilotName, strength, defense, stamina, agility, wins, mechName } = obj;
        this.id = id !== null && id !== void 0 ? id : (0, uuid_1.v4)();
        this.wins = wins !== null && wins !== void 0 ? wins : 0;
        this.pilotName = pilotName;
        this.strength = strength;
        this.defense = defense;
        this.defensePoints = defense + (wins * 0.2);
        this.stamina = stamina;
        this.hp = this.stamina * 10;
        this.agility = agility;
        this.mechName = mechName;
        this.healthPoints;
        this.validate();
    }
    set healthPoints(healthPointsLeft) {
        this.hp = healthPointsLeft;
    }
    get healthPoints() {
        return this.hp;
    }
    validate() {
        const statsArr = [this.strength, this.defense, this.stamina, this.agility];
        const sum = statsArr.reduce((prev, curr) => prev + curr, 0);
        for (const stat of statsArr) {
            if (stat < 1) {
                throw new error_1.ValidationError('You have to put at least 1 point in every stat');
            }
        }
        if (Number(this.pilotName) || this.pilotName.trim().length < 3 || this.pilotName.trim().length > 20 || !this.pilotName) {
            throw new error_1.ValidationError(`Your pilotName have to be between 3 and 20 chars, actually it is ${this.pilotName.length}`);
        }
        if (sum !== 18) {
            throw new error_1.ValidationError(`Sum of your abilities has to be 18, actually it is ${sum}`);
        }
    }
    insert() {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.pool.execute('INSERT INTO `pilots` VALUES (:id, :pilotName, :strength, :defense, :stamina, :agility, :wins, :mechName)', {
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
        });
    }
    update(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.pool.execute('UPDATE `pilots` SET `wins` = :wins WHERE `id` = :id', {
                wins: this.wins,
                id,
            });
        });
    }
    static getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield db_1.pool.execute('SELECT * FROM `pilots` WHERE `id` = :id', {
                id,
            });
            return result.length === 0 ? null : new PilotRecord(result[0]);
        });
    }
    static getRandom(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield db_1.pool.execute('SELECT * FROM `pilots` WHERE NOT `id` = :id', {
                id,
            });
            const mechList = result.map(obj => new PilotRecord(obj));
            return mechList[Math.floor(Math.random() * mechList.length)];
        });
    }
    static listAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield db_1.pool.execute('SELECT * FROM `pilots` ORDER BY `pilotName`');
            return result.map(obj => new PilotRecord(obj));
        });
    }
    static listTop(topCount) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield db_1.pool.execute('SELECT * FROM `pilots` ORDER BY `wins` DESC LIMIT :topCount', {
                topCount: topCount.toString(),
            });
            return result.map(obj => new PilotRecord(obj));
        });
    }
    static isNameTaken(pilotName) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield db_1.pool.execute('SELECT * FROM `pilots` WHERE `pilotName` = :pilotName', {
                pilotName,
            });
            return result.length > 0;
        });
    }
    ;
    hasDefense() {
        return this.defensePoints > 0;
    }
    calculateDefenseDamage(attacker, defender, commentator) {
        if (attacker.strength <= defender.defensePoints) {
            commentator.push(`${defender.pilotName} BLOCKED ${attacker.pilotName}'s attack`);
            defender.defensePoints -= (attacker.strength - (Math.round(defender.agility / 5)));
            if (!this.hasDefense()) {
                commentator.push(`${attacker.pilotName} succesfully broke ${defender.pilotName}'s defense ----- ${defender.pilotName} has no defense left`);
                defender.healthPoints += defender.defensePoints;
            }
        }
        else if (attacker.strength > defender.defensePoints && this.hasDefense()) {
            defender.defensePoints -= (attacker.strength - (Math.round(defender.agility / 5)));
            defender.defensePoints <= 0 ?
                commentator.push(`${attacker.pilotName} broke  ${defender.pilotName}'s defense ----- ${defender.pilotName} has no defense left`) :
                commentator.push(`${attacker.pilotName} almost broke ${defender.pilotName}'s defense ----- ${defender.pilotName} got only ${defender.defensePoints.toFixed(1)} DP left`);
            if (!this.hasDefense()) {
                defender.healthPoints += defender.defensePoints;
            }
        }
    }
    calculateRawDamage(attacker, defender, commentator) {
        if (attacker.strength > defender.defensePoints && defender.defensePoints <= 0) {
            defender.healthPoints -= (attacker.strength - (Math.round(defender.agility / 5)));
            commentator.push(`${attacker.pilotName} successfully attacked ${defender.pilotName} for ${attacker.strength} damage ----- ${defender.pilotName} has ${defender.healthPoints < 0 ? 0 : defender.healthPoints.toFixed(0)} HP left`);
        }
    }
}
exports.PilotRecord = PilotRecord;
//# sourceMappingURL=pilot.record.js.map