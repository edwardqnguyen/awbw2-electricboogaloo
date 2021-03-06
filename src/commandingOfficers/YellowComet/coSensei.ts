import { CommandingOfficer, 
    DEFAULT_POWER_ATK_BONUS, 
    DEFAULT_POWER_DEF_BONUS,
    DEFAULT_BADLUCKMAX,
    DEFAULT_GOODLUCKMAX, } from "../commandingOfficerType";
import { isTransportUnit, isCapturingUnit, isGroundVehicleUnit, isSeaUnit} from "../../dataHelpers/unitHelpers";

const SENSEI_D2D_TRANSPORT_MOVE_BONUS = 1;
const SENSEI_D2D_BOPTER_ATK_BONUS = 50;
const SENSEI_D2D_CAPTURING_ATK_BONUS = 40;
const SENSEI_COP_BOPTER_ATK_BONUS = 15;
const SENSEI_D2D_BALANCE_ATK_BONUS = -10;

export const coSensei: CommandingOfficer = {
    name: "Sensei",
    copSize: 2,
    scopSize: 4,
    
    attackBonus: (data) => {
        let bonus = 0;
        const unitName = data.unitName;
        if(isTransportUnit(unitName)) return bonus;
        switch(data.powerStatus){
            case 'SCOP':
            case 'COP':
                bonus += DEFAULT_POWER_ATK_BONUS;
                if(unitName === "B-Copter") bonus += SENSEI_COP_BOPTER_ATK_BONUS
            case 'D2D':
                if(isCapturingUnit(unitName)) bonus += SENSEI_D2D_CAPTURING_ATK_BONUS;
                if(unitName === "B-Copter") bonus += SENSEI_D2D_BOPTER_ATK_BONUS;
                if(isGroundVehicleUnit(unitName) || isSeaUnit(unitName)) bonus += SENSEI_D2D_BALANCE_ATK_BONUS;
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
    moveBonus: (data) => isTransportUnit(data.unitName) ? SENSEI_D2D_TRANSPORT_MOVE_BONUS : 0,

    badLuckMax: (powerStatus) => DEFAULT_BADLUCKMAX,
    goodLuckMax: (powerStatus) => DEFAULT_GOODLUCKMAX,

    applyCOPower: (game) => null,
    applySCOPower: (game) => null,
}