import { CommandingOfficer, 
    DEFAULT_POWER_ATK_BONUS, 
    DEFAULT_POWER_DEF_BONUS,
    DEFAULT_BADLUCKMAX,
    DEFAULT_GOODLUCKMAX} from "../commandingOfficerType";
import { isAirUnit, isSeaUnit, isGroundVehicleUnit, isCapturingUnit, isTransportUnit } from "../../dataHelpers/unitHelpers";

const JESS_GROUND_VEHICLE_D2D_ATK_BONUS = 10;
const JESS_GROUND_VEHICLE_COP_ATK_BONUS = 10;
const JESS_GROUND_VEHICLE_SCOP_ATK_BONUS = 20;
const JESS_BALANCE_D2D_ATK_BONUS = -10;
const JESS_GROUND_VEHICLE_COP_MOVE_BONUS = 1;
const JESS_GROUND_VEHICLE_SCOP_MOVE_BONUS = 1;

function isJessWeakUnit(unitName: string){
    return !isTransportUnit(unitName) && (isAirUnit(unitName) || isSeaUnit(unitName) || isCapturingUnit(unitName));
}

export const coJess: CommandingOfficer = {
    name: "Jess",
    copSize: 3,
    scopSize: 3,
    
    attackBonus: (data) => {
        let bonus = 0;
        const unitName = data.unitName;
        if(isTransportUnit(unitName)) return bonus;
        switch(data.powerStatus){
            case 'SCOP':
                if(isGroundVehicleUnit(unitName)) bonus += JESS_GROUND_VEHICLE_SCOP_ATK_BONUS;
            case 'COP':
                bonus += DEFAULT_POWER_ATK_BONUS;
                if(isGroundVehicleUnit(unitName)) bonus += JESS_GROUND_VEHICLE_COP_ATK_BONUS;
            case 'D2D':
                if(isGroundVehicleUnit(unitName)) bonus += JESS_GROUND_VEHICLE_D2D_ATK_BONUS;
                if(isJessWeakUnit(unitName)) bonus += JESS_BALANCE_D2D_ATK_BONUS;
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
        const unitName = data.unitName
        switch(data.powerStatus){
            case 'SCOP':
                if(isGroundVehicleUnit(unitName)) bonus += JESS_GROUND_VEHICLE_SCOP_MOVE_BONUS;
            case 'COP':
                if(isGroundVehicleUnit(unitName)) bonus += JESS_GROUND_VEHICLE_COP_MOVE_BONUS;
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