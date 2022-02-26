import { CommandingOfficer, 
    DEFAULT_POWER_ATK_BONUS, 
    DEFAULT_POWER_DEF_BONUS} from "../commandingOfficerType";

const JUGGER_D2D_GOODLUCKMAX = 29;
const JUGGER_COP_GOODLUCKMAX = 54;
const JUGGER_SCOP_GOODLUCKMAX = 94;

const JUGGER_D2D_BADLUCKMAX = 14;
const JUGGER_COP_BADLUCKMAX = 24;
const JUGGER_SCOP_BADLUCKMAX = 44;

export const coJugger: CommandingOfficer = {
    name: "Jugger",
    copSize: 3,
    scopSize: 4,
    
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

    badLuckMax: (powerStatus) => {
        switch(powerStatus) {
            case 'SCOP':
                return JUGGER_SCOP_BADLUCKMAX;
            case 'COP':
                return JUGGER_COP_BADLUCKMAX;
            case 'D2D':
                return JUGGER_D2D_BADLUCKMAX;
        }
    },
    goodLuckMax: (powerStatus) => {
        switch(powerStatus) {
            case 'SCOP':
                return JUGGER_SCOP_GOODLUCKMAX;
            case 'COP':
                return JUGGER_COP_GOODLUCKMAX;
            case 'D2D':
                return JUGGER_D2D_GOODLUCKMAX;
        }
    },

    applyCOPower: (game) => null,
    applySCOPower: (game) => null,
}