import { CommandingOfficer, 
    DEFAULT_POWER_ATK_BONUS, 
    DEFAULT_POWER_DEF_BONUS,
    DEFAULT_BADLUCKMAX,
    DEFAULT_GOODLUCKMAX, } from "../commandingOfficerType";

const ADDER_SCOP_MOVE_BONUS = 1;
const ADDER_COP_MOVE_BONUS = 1;

export const coAdder: CommandingOfficer = {
    name: "Adder",
    copSize: 2,
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
    moveBonus: (data) => {
        let bonus = 0;
        switch(data.powerStatus){
            case 'SCOP':
                bonus += ADDER_SCOP_MOVE_BONUS;
            case 'COP':
                bonus += ADDER_COP_MOVE_BONUS;
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