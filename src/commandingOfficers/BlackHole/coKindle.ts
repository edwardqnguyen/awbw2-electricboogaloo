import { CommandingOfficer, 
    DEFAULT_POWER_ATK_BONUS, 
    DEFAULT_POWER_DEF_BONUS,
    DEFAULT_BADLUCKMAX,
    DEFAULT_GOODLUCKMAX, } from "../commandingOfficerType";
import { isTransportUnit } from "../../dataHelpers/unitHelpers";
import { isUrbanTerrain } from "../../dataHelpers/terrainHelpers";

const KINDLE_D2D_URBAN_ATK_BONUS = 40;
const KINDLE_COP_URBAN_ATK_BONUS = 40;
const KINDLE_SCOP_URBAN_ATK_BONUS = 40;
const KINDLE_SCOP_PROPERTY_MULTIPLIER = 3;

export const coKindle: CommandingOfficer = {
    name: "Kindle",
    copSize: 3,
    scopSize: 3,
    
    attackBonus: (data) => {
        let bonus = 0;
        if(isTransportUnit(data.unitName)) return bonus;
        const terrain = data.terrain;
        switch(data.powerStatus){
            case 'SCOP':
                if(isUrbanTerrain(terrain)) bonus += KINDLE_SCOP_URBAN_ATK_BONUS;
                bonus += data.cities * KINDLE_SCOP_PROPERTY_MULTIPLIER;
            case 'COP':
                bonus += DEFAULT_POWER_ATK_BONUS;
                if(isUrbanTerrain(terrain)) bonus += KINDLE_COP_URBAN_ATK_BONUS;
            case 'D2D':
                if(isUrbanTerrain(terrain)) bonus += KINDLE_D2D_URBAN_ATK_BONUS;
                break;
        }
        return bonus;
    },
    defenseBonus: (data, atkUnit) => {
        let bonus = 0;
        switch(data.powerStatus){
            case 'SCOP':
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