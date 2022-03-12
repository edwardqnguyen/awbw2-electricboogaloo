import { CommandingOfficer, 
    DEFAULT_POWER_ATK_BONUS, 
    DEFAULT_POWER_DEF_BONUS,
    DEFAULT_BADLUCKMAX,
    DEFAULT_GOODLUCKMAX, } from "../commandingOfficerType";
import { terrainDefenseDict } from "../../dataHelpers/terrainHelpers";
import { isAirUnit } from "../../dataHelpers/unitHelpers";

function getTerrainDef(terrain: string, unit: string) {
    if(isAirUnit(unit)) return 0;
    return terrainDefenseDict[terrain];
}

const LASH_ATK_MULTIPLIER = 10;
const LASH_DEF_MULTIPLIER = 10;

export const coLash: CommandingOfficer = {
    name: "Lash",
    copSize: 3,
    scopSize: 4,
    // TODO: Check how Lash unit hp affects boosts to defense and atk from terrain.
    attackBonus: (data) => {
        let bonus = 0;
        const atkBoost = getTerrainDef(data.terrain, data.unitName) * LASH_ATK_MULTIPLIER;
        switch(data.powerStatus){
            case 'SCOP':
                bonus += atkBoost;
            case 'COP':
                bonus += DEFAULT_POWER_ATK_BONUS;
            case 'D2D':
                bonus += atkBoost;
                break;
        }
        return bonus;
    },
    counterAttackBonus: (data) => 0,
    defenseBonus: (data, atkUnit) => {
        let bonus = 0;
        const defBoost = getTerrainDef(data.terrain, data.unitName) * LASH_DEF_MULTIPLIER;
        switch(data.powerStatus){
            case 'SCOP':
                bonus += defBoost;
            case 'COP':
                bonus += DEFAULT_POWER_DEF_BONUS;
            case 'D2D':
                break;
        }
        return bonus;
    },
    moveBonus: (data) => 0,

    badLuckMax: (powerStatus) => DEFAULT_BADLUCKMAX,
    goodLuckMax: (powerStatus) => DEFAULT_GOODLUCKMAX,

    applyCOPower: (game) => null,
    applySCOPower: (game) => null,
}