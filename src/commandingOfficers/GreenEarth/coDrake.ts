import { CommandingOfficer, 
    DEFAULT_POWER_ATK_BONUS, 
    DEFAULT_POWER_DEF_BONUS,
    DEFAULT_BADLUCKMAX,
    DEFAULT_GOODLUCKMAX, } from "../commandingOfficerType";

import { isSeaUnit, isAirUnit, isTransportUnit } from "../../dataHelpers/unitHelpers";

const DRAKE_AIR_D2D_ATK_BONUS = -20;
const DRAKE_SEA_D2D_DEF_BONUS = 25;
const DRAKE_SEA_D2D_MOVE_BONUS = 1;

export const coDrake: CommandingOfficer = {
    name: "Drake",
    copSize: 4,
    scopSize: 3,
    
    attackBonus: (data) => {
        let bonus = 0;
        const unitName = data.unitName;
        if(isTransportUnit(unitName)) return bonus;
        switch(data.powerStatus){
            case 'SCOP':
            case 'COP':
                bonus += DEFAULT_POWER_ATK_BONUS;
            case 'D2D':
                if(isAirUnit(unitName)) bonus += DRAKE_AIR_D2D_ATK_BONUS;
                break;
        }
        return bonus;
    },
    defenseBonus: (data, atkUnit) => {
        let bonus = 0;
        const unitName = data.unitName;
        switch(data.powerStatus){
            case 'SCOP':
            case 'COP':
                bonus += DEFAULT_POWER_DEF_BONUS;
            case 'D2D':
                if(isSeaUnit(unitName)) bonus += DRAKE_SEA_D2D_DEF_BONUS;
                break;
        }
        return bonus;
    },
    moveBonus: (data) => isSeaUnit(data.unitName) ? DRAKE_SEA_D2D_MOVE_BONUS : 0,

    badLuckMax: (powerStatus) => DEFAULT_BADLUCKMAX,
    goodLuckMax: (powerStatus) => DEFAULT_GOODLUCKMAX,

    applyCOPower: (game) => null,
    applySCOPower: (game) => null,
}