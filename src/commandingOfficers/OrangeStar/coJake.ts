import { CommandingOfficer, 
    DEFAULT_POWER_ATK_BONUS, 
    DEFAULT_POWER_DEF_BONUS,
    DEFAULT_BADLUCKMAX,
    DEFAULT_GOODLUCKMAX, } from "../commandingOfficerType";
import { isTransportUnit, isGroundVehicleUnit } from "../../dataHelpers/unitHelpers";

const JAKE_D2D_PLAIN_ATK_BONUS = 10;
const JAKE_SCOP_PLAIN_ATK_BONUS = 30;
const JAKE_GROUND_VEHICLE_SCOP_MOVE_BONUS = 2;

export const coJake: CommandingOfficer = {
    name: "Jake",
    copSize: 3,
    scopSize: 3,
    
    attackBonus: (data) => {
        let bonus = 0;
        if(isTransportUnit(data.unitName)) return bonus;
        switch(data.powerStatus){
            case 'SCOP':
                if(data.terrain === 'Road') bonus += JAKE_SCOP_PLAIN_ATK_BONUS;
            case 'COP':
                bonus += DEFAULT_POWER_ATK_BONUS;
            case 'D2D':
                if(data.terrain === 'Road') bonus += JAKE_D2D_PLAIN_ATK_BONUS;
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
                if(isGroundVehicleUnit(data.unitName)) bonus += JAKE_GROUND_VEHICLE_SCOP_MOVE_BONUS;
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