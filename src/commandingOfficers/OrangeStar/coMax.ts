import { CommandingOfficer, DEFAULT_POWER_ATK_BONUS, DEFAULT_POWER_DEF_BONUS } from "../commandingOfficerType";
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
        if(isDirectUnit(data.unitName) && !isCapturingUnit(data.unitName)){
            switch(data.powerStatus){
                case 'SCOP':
                    bonus += MAX_DIRECT_SCOP_ATK_BONUS;
                case 'COP':
                    bonus += DEFAULT_POWER_ATK_BONUS + MAX_DIRECT_COP_ATK_BONUS;
                case 'D2D':
                    bonus += MAX_DIRECT_D2D_ATK_BONUS;
                    break;
            }
        }
        else if(isIndirectUnit(data.unitName)) {
            switch(data.powerStatus){
                case 'SCOP':
                case 'COP':
                    bonus += DEFAULT_POWER_ATK_BONUS;
                case 'D2D':
                    bonus += MAX_INDIRECT_D2D_ATK_BONUS
                    break;
            }
        }
        else {
            switch(data.powerStatus){
                case 'SCOP':
                case 'COP':
                    bonus += DEFAULT_POWER_ATK_BONUS;
                case 'D2D':
                    break;
            }
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
    moveBonus: (data) => {
        let bonus = 0;
        if(!isDirectUnit(data.unitName)){
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

    applyCOPower: (game) => null,
    applySCOPower: (game) => null,
}