export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export function damageRangeCalculator(matchupDamage:number, atkModifier:number, defModifier:number, defRating:number, atkHP:number, defHP:number){
    // Damage is (baseAttack + randInt(0,10)) * modifier
    const modifier = (atkHP * (200-(defModifier + defRating * defHP))/1000);
    const baseAttack = matchupDamage * atkModifier / 100;
    return {
        'baseAttack': baseAttack,
        'modifier': modifier
    };
}

export function sampleDamage(baseAttack, modifier, luckRating) {
    return (baseAttack + getRandomInt(luckRating)) * modifier;
}