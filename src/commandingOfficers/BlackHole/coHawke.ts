import { CommandingOfficer, 
    DEFAULT_POWER_ATK_BONUS, 
    DEFAULT_POWER_DEF_BONUS,
    DEFAULT_BADLUCKMAX,
    DEFAULT_GOODLUCKMAX, } from "../commandingOfficerType";

const HAWKE_D2D_ATK_BONUS = 10;

export const coHawke: CommandingOfficer = {
    name: "Hawke",
    copSize: 5,
    scopSize: 4,
    
    attackBonus: (data) => {
        let bonus = 0;
        switch(data.powerStatus){
            case 'SCOP':
            case 'COP':
                bonus += DEFAULT_POWER_ATK_BONUS;
            case 'D2D':
                bonus += HAWKE_D2D_ATK_BONUS;
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
    moveBonus: (data) => 0,

    badLuckMax: (powerStatus) => DEFAULT_BADLUCKMAX,
    goodLuckMax: (powerStatus) => DEFAULT_GOODLUCKMAX,

    applyCOPower: (game) => null,
    applySCOPower: (game) => null,
}