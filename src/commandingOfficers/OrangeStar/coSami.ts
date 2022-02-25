import { CommandingOfficer, DEFAULT_POWER_ATK_BONUS, DEFAULT_POWER_DEF_BONUS } from "../commandingOfficerType";
import { isInfantryTransportUnit, isCapturingUnit, isDirectUnit } from "../../gameData/unitHelpers";

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
        if(isCapturingUnit(data.unitName)){
            switch(data.powerStatus){
                case 'SCOP':
                    bonus += SAMI_INFANTRY_SCOP_ATK_BONUS;
                case 'COP':
                    bonus += DEFAULT_POWER_ATK_BONUS + SAMI_INFANTRY_COP_ATK_BONUS;
                case 'D2D':
                    bonus += SAMI_INFANTRY_D2D_ATK_BONUS;
                    break;
            }
        }
        else if(isDirectUnit(data.unitName)) {
            switch(data.powerStatus){
                case 'SCOP':
                case 'COP':
                    bonus += DEFAULT_POWER_ATK_BONUS;
                case 'D2D':
                    bonus += bonus + SAMI_DIRECT_D2D_ATK_BONUS;
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
        if(isCapturingUnit(data.unitName)){
            switch(data.powerStatus){
                case 'SCOP':
                    bonus += SAMI_INFANTRY_SCOP_MOVE_BONUS;
                case 'COP':
                    bonus += SAMI_INFANTRY_COP_MOVE_BONUS;
                case 'D2D':
                    break;
            }
        }
        else if(isInfantryTransportUnit(data.unitName)) {
            switch(data.powerStatus){
                case 'SCOP':
                case 'COP':
                case 'D2D':
                    bonus += bonus + SAMI_TRANSPORT_D2D_MOVE_BONUS;
                    break;
            }
        }
        return bonus;
    },

    applyCOPower: (game) => null,
    applySCOPower: (game) => null,
}