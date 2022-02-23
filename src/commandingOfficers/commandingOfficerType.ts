type UnitCombatData = {
    unitName: string;
    terrain: string;
    funds: number;
    commTowers: number;
    cities: number;
}

export interface CommandingOfficer {
    name: string;
    copSize: number;
    scopSize: number;
    
    d2dAttackBonus: (data: UnitCombatData) => number;
    d2dDefenseBonus: (data: UnitCombatData, atkUnit: string) => number;
    copAttackBonus: (data: UnitCombatData) => number;
    copDefenseBonus: (data: UnitCombatData, atkUnit: string) => number;
    scopAttackBonus: (data: UnitCombatData) => number;
    scopDefenseBonus: (data: UnitCombatData, atkUnit: string) => number;

    applyCOPower: (game: any) => null;
    applySCOPower: (game: any) => null;

}