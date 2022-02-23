import { CommandingOfficer, DEFAULT_POWER_ATK_BONUS, DEFAULT_POWER_DEF_BONUS } from "../commandingOfficerType";
import { isIndirectUnit, isDirectUnit, isCapturingUnit } from "../../gameData/unitTypes";

const MAX_DIRECT_D2D_BONUS = 20;
const MAX_INDIRECT_D2D_BONUS = -10;
const MAX_DIRECT_COP_BONUS = 20;
const MAX_DIRECT_SCOP_BONUS = 40;
const MAX_COP_MOVE_BONUS = 1;
const MAX_SCOP_MOVE_BONUS = 2;


export const coMax: CommandingOfficer = {
    name: "Max",
    copSize: 3,
    scopSize: 3,
    
    d2dAttackBonus: (data) => {
        let base = 0;
        if(isDirectUnit(data.unitName) && !isCapturingUnit(data.unitName)){
            base = base + MAX_DIRECT_D2D_BONUS;
        }
        if(isIndirectUnit(data.unitName)) {
            base = base + MAX_INDIRECT_D2D_BONUS;
        }
        return base;
    },
    copAttackBonus: (data) => {
        let base = DEFAULT_POWER_ATK_BONUS;
        if(isDirectUnit(data.unitName) && !isCapturingUnit(data.unitName)){
            base = base + MAX_DIRECT_D2D_BONUS + MAX_DIRECT_COP_BONUS;
        }
        if(isIndirectUnit(data.unitName)) {
            base = base + MAX_INDIRECT_D2D_BONUS;
        }
        return base;
    },
    scopAttackBonus: (data) => {
        let base = DEFAULT_POWER_ATK_BONUS;
        if(isDirectUnit(data.unitName) && !isCapturingUnit(data.unitName)){
            base = base + MAX_DIRECT_D2D_BONUS + MAX_DIRECT_SCOP_BONUS;
        }
        if(isIndirectUnit(data.unitName)) {
            base = base + MAX_INDIRECT_D2D_BONUS;
        }
        return base;
    },

    d2dDefenseBonus: (data, atkUnit) => 0,
    copDefenseBonus: (data, atkUnit) => DEFAULT_POWER_DEF_BONUS,
    scopDefenseBonus: (data, atkUnit) => DEFAULT_POWER_DEF_BONUS,

    d2dMoveBonus: (data) => 0,
    copMoveBonus: (data) => {
        return isDirectUnit(data.unitName) ? MAX_COP_MOVE_BONUS : 0;
    },
    scopMoveBonus: (data) => {
        return isDirectUnit(data.unitName) ? MAX_SCOP_MOVE_BONUS : 0;
    },

    applyCOPower: (game) => null,
    applySCOPower: (game) => null,
}