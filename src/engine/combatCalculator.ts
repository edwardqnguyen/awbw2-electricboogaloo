export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export function damageEquationCalculator(matchupDamage:number, atkModifier:number, defModifier:number, defRating:number, atkHP:number, defHP:number){
    // Damage is (baseAttack + randInt(0,10)) * modifier

    const modifier = (atkHP * (200-(defModifier + defRating * defHP))/1000.0);
    const baseAttack = matchupDamage * atkModifier / 100.0;
    return {
        'baseAttack': baseAttack,
        'modifier': modifier
    };
}

export function damageRangeCalculator(baseAttack: number, modifier: number, badLuckMax: number, goodLuckMax: number) {
    const lowEstimate = Math.floor((baseAttack - badLuckMax) * modifier);
    const highEstimate = Math.floor((baseAttack + goodLuckMax) * modifier);
    return [lowEstimate, highEstimate];
}

export function sampleDamage(baseAttack: number, modifier: number, badLuckMax: number, goodLuckMax: number) {
    return (baseAttack + getRandomInt(goodLuckMax + 1) - getRandomInt(badLuckMax + 1)) * modifier;
}