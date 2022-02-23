import { CommandingOfficer, DEFAULT_POWER_ATK_BONUS, DEFAULT_POWER_DEF_BONUS } from "../commandingOfficerType";
import { isInfantryTransportUnit, isCapturingUnit, isDirectUnit } from "../../gameData/unitTypes";

const SAMI_INFANTRY_D2D_BONUS = 30;
const SAMI_DIRECT_D2D_BONUS = -10;
const SAMI_INFANTRY_COP_BONUS = 30;
const SAMI_INFANTRY_SCOP_BONUS = 50;
const SAMI_D2D_TRANSPORT_MOVE_BONUS = 1;
const SAMI_COP_INFANTRY_MOVE_BONUS = 1;
const SAMI_SCOP_INFANTRY_MOVE_BONUS = 2;

export const coSami: CommandingOfficer = {
    name: "Sami",
    copSize: 3,
    scopSize: 3,
    
    d2dAttackBonus: (data) => {
        let base = 0;
        if(isCapturingUnit(data.unitName)){
            base = base + SAMI_INFANTRY_D2D_BONUS;
        }
        else if(isDirectUnit(data.unitName)) {
            base = base + SAMI_DIRECT_D2D_BONUS;
        }
        return base;
    },
    copAttackBonus: (data) => {
        let base = DEFAULT_POWER_ATK_BONUS;
        if(isCapturingUnit(data.unitName)){
            base = base + SAMI_INFANTRY_D2D_BONUS + SAMI_INFANTRY_COP_BONUS;
        }
        else if(isDirectUnit(data.unitName)) {
            base = base + SAMI_DIRECT_D2D_BONUS;
        }
        return base;
    },
    scopAttackBonus: (data) => {
        let base = DEFAULT_POWER_ATK_BONUS;
        if(isCapturingUnit(data.unitName)){
            base = base + SAMI_INFANTRY_D2D_BONUS + SAMI_INFANTRY_SCOP_BONUS;
        }
        else if(isDirectUnit(data.unitName)) {
            base = base + SAMI_DIRECT_D2D_BONUS;
        }
        return base;
    },

    d2dDefenseBonus: (data, atkUnit) => 0,
    copDefenseBonus: (data, atkUnit) => DEFAULT_POWER_DEF_BONUS,
    scopDefenseBonus: (data, atkUnit) => DEFAULT_POWER_DEF_BONUS,

    d2dMoveBonus: (data) => {
        return isInfantryTransportUnit(data.unitName) ? SAMI_D2D_TRANSPORT_MOVE_BONUS : 0
    },
    copMoveBonus: (data) => {
        let base = 0;
        if(isInfantryTransportUnit(data.unitName)) {
            base = base + SAMI_D2D_TRANSPORT_MOVE_BONUS;
        }
        if(isCapturingUnit(data.unitName)){
            base = base + SAMI_COP_INFANTRY_MOVE_BONUS;
        } 
        return base;
    },
    scopMoveBonus: (data) => {
        let base = 0;
        if(isInfantryTransportUnit(data.unitName)) {
            base = base + SAMI_D2D_TRANSPORT_MOVE_BONUS;
        }
        if(isCapturingUnit(data.unitName)){
            base = base + SAMI_SCOP_INFANTRY_MOVE_BONUS;
        } 
        return base;
    },

    applyCOPower: (game) => null,
    applySCOPower: (game) => null,
}