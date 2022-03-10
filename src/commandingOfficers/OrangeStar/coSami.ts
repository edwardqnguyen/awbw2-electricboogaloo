import { CommandingOfficer, 
    DEFAULT_POWER_ATK_BONUS, 
    DEFAULT_POWER_DEF_BONUS,
    DEFAULT_BADLUCKMAX,
    DEFAULT_GOODLUCKMAX, } from "../commandingOfficerType";
import { isInfantryTransportUnit, isCapturingUnit, isDirectUnit } from "../../dataHelpers/unitHelpers";

const SAMI_INFANTRY_D2D_ATK_BONUS = 30;
const SAMI_DIRECT_D2D_ATK_BONUS = -10;
const SAMI_INFANTRY_COP_ATK_BONUS = 20;
const SAMI_INFANTRY_SCOP_ATK_BONUS = 20;
const SAMI_TRANSPORT_D2D_MOVE_BONUS = 1;
const SAMI_INFANTRY_COP_MOVE_BONUS = 1;
const SAMI_INFANTRY_SCOP_MOVE_BONUS = 2;

export const coSami: CommandingOfficer = {
    name: "Sami",
    copSize: 3,
    scopSize: 5,
    
    attackBonus: (data) => {
        let bonus = 0;
        const unitName = data.unitName;
        switch(data.powerStatus){
            case 'SCOP':
                if(isCapturingUnit(unitName)) bonus += SAMI_INFANTRY_SCOP_ATK_BONUS;
            case 'COP':
                bonus += DEFAULT_POWER_ATK_BONUS;
                if(isCapturingUnit(unitName)) bonus += SAMI_INFANTRY_COP_ATK_BONUS;
            case 'D2D':
                if(isCapturingUnit(unitName)) bonus += SAMI_INFANTRY_D2D_ATK_BONUS;
                if(isDirectUnit(unitName)) bonus += SAMI_DIRECT_D2D_ATK_BONUS;
                break;
        }
        return bonus;
    },
    counterAttackBonus: (data) => 0,
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

    moveBonus: (data) => {
        let bonus = 0;
        const unitName = data.unitName;
        switch(data.powerStatus){
            case 'SCOP':
                if(isCapturingUnit(unitName)) bonus += SAMI_INFANTRY_SCOP_MOVE_BONUS;
            case 'COP':
                if(isCapturingUnit(unitName)) bonus += SAMI_INFANTRY_COP_MOVE_BONUS;
            case 'D2D':
                if(isInfantryTransportUnit(unitName)) bonus += SAMI_TRANSPORT_D2D_MOVE_BONUS;
                break;
        }
        return bonus;
    },

    badLuckMax: (powerStatus) => DEFAULT_BADLUCKMAX,
    goodLuckMax: (powerStatus) => DEFAULT_GOODLUCKMAX,

    applyCOPower: (game) => null,
    applySCOPower: (game) => null,
}