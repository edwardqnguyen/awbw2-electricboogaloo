import { CommandingOfficer, 
    DEFAULT_POWER_ATK_BONUS, 
    DEFAULT_POWER_DEF_BONUS,
    DEFAULT_BADLUCKMAX,
    DEFAULT_GOODLUCKMAX, } from "../commandingOfficerType";

const KANBEI_D2D_ATK_BONUS = 30;
const KANBEI_D2D_DEF_BONUS = 30;
const KANBEI_COP_ATK_BONUS = 10;
const KANBEI_SCOP_DEF_BONUS = 20;

export const coKanbei: CommandingOfficer = {
    name: "Kanbei",
    copSize: 4,
    scopSize: 3,
    
    attackBonus: (data) => {
        let bonus = 0;
        switch(data.powerStatus){
            case 'SCOP':
            case 'COP':
                bonus += DEFAULT_POWER_ATK_BONUS + KANBEI_COP_ATK_BONUS;
            case 'D2D':
                bonus += KANBEI_D2D_ATK_BONUS;
                break;
        }
        return bonus;
    },
    defenseBonus: (data, atkUnit) => {
        let bonus = 0;
        switch(data.powerStatus){
            case 'SCOP':
                bonus += KANBEI_SCOP_DEF_BONUS;
            case 'COP':
                bonus += DEFAULT_POWER_DEF_BONUS;
            case 'D2D':
                bonus += KANBEI_D2D_DEF_BONUS;
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