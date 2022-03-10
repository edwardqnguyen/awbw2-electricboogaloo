import { CommandingOfficer, 
    DEFAULT_POWER_ATK_BONUS, 
    DEFAULT_POWER_DEF_BONUS,
    DEFAULT_BADLUCKMAX,
    DEFAULT_GOODLUCKMAX, } from "../commandingOfficerType";

const ANDY_SCOP_ATK_BONUS = 10;
const ANDY_SCOP_MOVE_BONUS = 1;

export const coAndy: CommandingOfficer = {
    name: "Andy",
    copSize: 3,
    scopSize: 3,
    
    attackBonus: (data) => {
        let bonus = 0;
        switch(data.powerStatus){
            case 'SCOP':
                bonus += ANDY_SCOP_ATK_BONUS;
            case 'COP':
                bonus += DEFAULT_POWER_ATK_BONUS;
            case 'D2D':
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
        switch(data.powerStatus){
            case 'SCOP':
                bonus += ANDY_SCOP_MOVE_BONUS;
            case 'COP':
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