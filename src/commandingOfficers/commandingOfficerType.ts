type UnitCombatData = {
    unitName: string;
    terrain: string;
    funds: number;
    commTowers: number;
    cities: number;
}

export const DEFAULT_POWER_ATK_BONUS = 10;
export const DEFAULT_POWER_DEF_BONUS = 10;

export interface CommandingOfficer {
    name: string;
    copSize: number;
    scopSize: number;
    
    d2dAttackBonus: (data: UnitCombatData) => number;
    copAttackBonus: (data: UnitCombatData) => number;
    scopAttackBonus: (data: UnitCombatData) => number;

    d2dDefenseBonus: (data: UnitCombatData, atkUnit: string) => number;
    copDefenseBonus: (data: UnitCombatData, atkUnit: string) => number;
    scopDefenseBonus: (data: UnitCombatData, atkUnit: string) => number;

    d2dMoveBonus: (data: UnitCombatData) => number;
    copMoveBonus: (data: UnitCombatData) => number;
    scopMoveBonus: (data: UnitCombatData) => number;

    applyCOPower: (game: any) => null;
    applySCOPower: (game: any) => null;

}