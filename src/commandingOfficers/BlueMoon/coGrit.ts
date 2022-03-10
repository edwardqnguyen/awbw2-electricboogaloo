import { CommandingOfficer, 
    DEFAULT_POWER_ATK_BONUS, 
    DEFAULT_POWER_DEF_BONUS,
    DEFAULT_BADLUCKMAX,
    DEFAULT_GOODLUCKMAX, } from "../commandingOfficerType";
import { isIndirectUnit, isDirectUnit} from "../../dataHelpers/unitHelpers";

const GRIT_INDIRECT_D2D_ATK_BONUS = 20;
const GRIT_DIRECT_D2D_ATK_BONUS = -20;
const GRIT_INDIRECT_COP_ATK_BONUS = 20;

export const coGrit: CommandingOfficer = {
    name: "Grit",
    copSize: 3,
    scopSize: 3,
    
    attackBonus: (data) => {
        let bonus = 0;
        if(isDirectUnit(data.unitName)){
            switch(data.powerStatus){
                case 'SCOP':
                case 'COP':
                    bonus += DEFAULT_POWER_ATK_BONUS
                case 'D2D':
                    bonus += GRIT_DIRECT_D2D_ATK_BONUS;
                    break;
            }
        }
        else if(isIndirectUnit(data.unitName)) {
            switch(data.powerStatus){
                case 'SCOP':
                case 'COP':
                    bonus += DEFAULT_POWER_ATK_BONUS + GRIT_INDIRECT_COP_ATK_BONUS;
                case 'D2D':
                    bonus += GRIT_INDIRECT_D2D_ATK_BONUS;
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
    counterAttackBonus: (data) => 0,
    moveBonus: (data) => 0,

    badLuckMax: (powerStatus) => DEFAULT_BADLUCKMAX,
    goodLuckMax: (powerStatus) => DEFAULT_GOODLUCKMAX,

    applyCOPower: (game) => null,
    applySCOPower: (game) => null,
}