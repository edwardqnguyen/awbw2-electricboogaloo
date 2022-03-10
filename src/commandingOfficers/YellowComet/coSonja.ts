import { CommandingOfficer, 
    DEFAULT_GOODLUCKMAX, 
    DEFAULT_POWER_ATK_BONUS, 
    DEFAULT_POWER_DEF_BONUS} from "../commandingOfficerType";

const SONJA_D2D_BADLUCKMAX = 9;
const SONJA_D2D_COUNTER_ATTACK_BONUS = 50;

export const coSonja: CommandingOfficer = {
    name: "Sonja",
    copSize: 3,
    scopSize: 2,
    
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
    counterAttackBonus: (data) => 50,
    moveBonus: (data) => 0,

    badLuckMax: (powerStatus) => SONJA_D2D_BADLUCKMAX,
    goodLuckMax: (powerStatus) => DEFAULT_GOODLUCKMAX,

    applyCOPower: (game) => null,
    applySCOPower: (game) => null,
}