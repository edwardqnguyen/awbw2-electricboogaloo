import { CommandingOfficer, 
    DEFAULT_POWER_ATK_BONUS, 
    DEFAULT_POWER_DEF_BONUS,
    DEFAULT_BADLUCKMAX,
    DEFAULT_GOODLUCKMAX, } from "../commandingOfficerType";
import { isIndirectUnit, isDirectUnit, isCapturingUnit } from "../../dataHelpers/unitHelpers";

const MAX_DIRECT_D2D_ATK_BONUS = 20;
const MAX_INDIRECT_D2D_ATK_BONUS = -10;
const MAX_DIRECT_COP_ATK_BONUS = 10;
const MAX_DIRECT_SCOP_ATK_BONUS = 20;
const MAX_COP_MOVE_BONUS = 1;
const MAX_SCOP_MOVE_BONUS = 1;


export const coMax: CommandingOfficer = {
    name: "Max",
    copSize: 3,
    scopSize: 3,
    
    attackBonus: (data) => {
        let bonus = 0;
        const unitName = data.unitName;
        switch(data.powerStatus){
            case 'SCOP':
                if(isDirectUnit(unitName)) bonus += MAX_DIRECT_SCOP_ATK_BONUS;
            case 'COP':
                bonus += DEFAULT_POWER_ATK_BONUS 
                if(isDirectUnit(unitName)) bonus+= MAX_DIRECT_COP_ATK_BONUS;
            case 'D2D':
                if(isDirectUnit(unitName)) bonus += MAX_DIRECT_D2D_ATK_BONUS;
                if(isIndirectUnit(unitName)) bonus += MAX_INDIRECT_D2D_ATK_BONUS;
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
        if(!isDirectUnit(data.unitName) && !isCapturingUnit(data.unitName)){
            return bonus;
        }
        switch(data.powerStatus){
            case 'SCOP':
                bonus += MAX_SCOP_MOVE_BONUS;
            case 'COP':
                bonus += MAX_COP_MOVE_BONUS;
            case 'D2D':
                break;
        }
        return bonus;
    },

    badLuckMax: (powerStatus) => DEFAULT_BADLUCKMAX,
    goodLuckMax: (powerStatus) => DEFAULT_GOODLUCKMAX,

    applyCOPower: (game) => null,
    applySCOPower: (game) => null,
}