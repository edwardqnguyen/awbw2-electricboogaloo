import { CommandingOfficer, 
    DEFAULT_POWER_ATK_BONUS, 
    DEFAULT_POWER_DEF_BONUS,
    DEFAULT_BADLUCKMAX,} from "../commandingOfficerType";

const NELL_D2D_GOODLUCKMAX = 19;
const NELL_COP_GOODLUCKMAX = 59;
const NELL_SCOP_GOODLUCKMAX = 99;

export const coNell: CommandingOfficer = {
    name: "Nell",
    copSize: 3,
    scopSize: 3,
    
    attackBonus: (data) => {
        let bonus = 0;
        switch(data.powerStatus){
            case 'SCOP':
            case 'COP':
                bonus += DEFAULT_POWER_ATK_BONUS;
            case 'D2D':
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
    goodLuckMax: (powerStatus) => {
        switch(powerStatus) {
            case 'SCOP':
                return NELL_SCOP_GOODLUCKMAX;
            case 'COP':
                return NELL_COP_GOODLUCKMAX;
            case 'D2D':
                return NELL_D2D_GOODLUCKMAX;
        }
    },

    applyCOPower: (game) => null,
    applySCOPower: (game) => null,
}