import { CommandingOfficer, 
    DEFAULT_POWER_ATK_BONUS, 
    DEFAULT_POWER_DEF_BONUS,
    DEFAULT_BADLUCKMAX,
    DEFAULT_GOODLUCKMAX, } from "../commandingOfficerType";
import { isAirUnit, isTransportUnit, isSeaUnit } from "../../dataHelpers/unitHelpers";

const EAGLE_AIR_D2D_ATK_BONUS = 15;
const EAGLE_AIR_D2D_DEF_BONUS = 10;
const EAGLE_AIR_COP_ATK_BONUS = 5;
const EAGLE_AIR_COP_DEF_BONUS = 10;
const EAGLE_SEA_D2D_ATK_BONUS = -30;

export const coEagle: CommandingOfficer = {
    name: "Eagle",
    copSize: 3,
    scopSize: 6,
    
    attackBonus: (data) => {
        let bonus = 0;
        const unitName = data.unitName;
        if(isTransportUnit(unitName)) return bonus;
        switch(data.powerStatus){
            case 'SCOP':
            case 'COP':
                bonus += DEFAULT_POWER_ATK_BONUS;
                if(isAirUnit(unitName)) bonus += EAGLE_AIR_COP_ATK_BONUS;
            case 'D2D':
                if(isSeaUnit(unitName)) bonus += EAGLE_SEA_D2D_ATK_BONUS;
                if(isAirUnit(unitName)) bonus += EAGLE_AIR_D2D_ATK_BONUS;
                break;
        }
        return bonus;
    },
    counterAttackBonus: (data) => 0,
    defenseBonus: (data, atkUnit) => {
        let bonus = 0;
        const unitName = data.unitName;
        switch(data.powerStatus){
            case 'SCOP':
            case 'COP':
                bonus += DEFAULT_POWER_DEF_BONUS;
                if(isAirUnit(unitName)) bonus += EAGLE_AIR_COP_DEF_BONUS;
            case 'D2D':
                if(isAirUnit(unitName)) bonus += EAGLE_AIR_D2D_DEF_BONUS;
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