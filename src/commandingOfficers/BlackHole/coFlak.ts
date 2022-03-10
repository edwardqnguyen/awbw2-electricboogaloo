import { CommandingOfficer, 
    DEFAULT_POWER_ATK_BONUS, 
    DEFAULT_POWER_DEF_BONUS} from "../commandingOfficerType";

const FLAK_D2D_GOODLUCKMAX = 24;
const FLAK_COP_GOODLUCKMAX = 49;
const FLAK_SCOP_GOODLUCKMAX = 89;

const FLAK_D2D_BADLUCKMAX = 9;
const FLAK_COP_BADLUCKMAX = 19;
const FLAK_SCOP_BADLUCKMAX = 39;

export const coFlak: CommandingOfficer = {
    name: "Flak",
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

    badLuckMax: (powerStatus) => {
        switch(powerStatus) {
            case 'SCOP':
                return FLAK_SCOP_BADLUCKMAX;
            case 'COP':
                return FLAK_COP_BADLUCKMAX;
            case 'D2D':
                return FLAK_D2D_BADLUCKMAX;
        }
    },
    goodLuckMax: (powerStatus) => {
        switch(powerStatus) {
            case 'SCOP':
                return FLAK_SCOP_GOODLUCKMAX;
            case 'COP':
                return FLAK_COP_GOODLUCKMAX;
            case 'D2D':
                return FLAK_D2D_GOODLUCKMAX;
        }
    },

    applyCOPower: (game) => null,
    applySCOPower: (game) => null,
}