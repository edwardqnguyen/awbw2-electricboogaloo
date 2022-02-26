import { CommandingOfficer, 
    DEFAULT_POWER_ATK_BONUS, 
    DEFAULT_POWER_DEF_BONUS,
    DEFAULT_BADLUCKMAX,
    DEFAULT_GOODLUCKMAX, } from "../commandingOfficerType";
import { isIndirectUnit } from "../../dataHelpers/unitHelpers";

const JAVIER_D2D_DEF_FROM_INDIRECT_BONUS = 20;
const JAVIER_COP_DEF_FROM_INDIRECT_BONUS = 20;
const JAVIER_SCOP_DEF_FROM_INDIRECT_BONUS = 20;
const JAVIER_D2D_DEF_FROM_COMM_TOWER_BONUS = 10;
const JAVIER_D2D_ATK_FROM_COMM_TOWER_BONUS = 10;

export const coJavier: CommandingOfficer = {
    name: "Javier",
    copSize: 3,
    scopSize: 3,
    
    attackBonus: (data) => {
        let bonus = 0;
        switch(data.powerStatus){
            case 'SCOP':
                bonus += data.commTowers * JAVIER_D2D_ATK_FROM_COMM_TOWER_BONUS;
            case 'COP':
                bonus += DEFAULT_POWER_ATK_BONUS;
                bonus += data.commTowers * JAVIER_D2D_ATK_FROM_COMM_TOWER_BONUS;
            case 'D2D':
                break;
        }
        return bonus;
    },
    defenseBonus: (data, atkUnit) => {
        let bonus = 0;
        switch(data.powerStatus){
            case 'SCOP':
                if(isIndirectUnit(atkUnit)) bonus += JAVIER_SCOP_DEF_FROM_INDIRECT_BONUS;
                bonus += data.commTowers * JAVIER_D2D_DEF_FROM_COMM_TOWER_BONUS;
            case 'COP':
                bonus += DEFAULT_POWER_DEF_BONUS;
                if(isIndirectUnit(atkUnit)) bonus += JAVIER_COP_DEF_FROM_INDIRECT_BONUS;
                bonus += data.commTowers * JAVIER_D2D_DEF_FROM_COMM_TOWER_BONUS;
            case 'D2D':
                if(isIndirectUnit(atkUnit)) bonus += JAVIER_D2D_DEF_FROM_INDIRECT_BONUS;
                bonus += data.commTowers * JAVIER_D2D_DEF_FROM_COMM_TOWER_BONUS;
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