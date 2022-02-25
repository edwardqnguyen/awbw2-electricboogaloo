import unitLoader from '../src/dataLoaders/unitLoader';
import damageMatrixLoader from '../src/dataLoaders/damageMatrixLoader';
import terrainLoader from '../src/dataLoaders/terrainLoader';
import {coLibrary} from '../src/commandingOfficers/coLibrary';
import selectBox from '../src/components/selectBox';
import * as React from 'react';

/**
 * @return {React.Component} React Component representing damage calculator
 */
export default function damageCalculator({unitArray, dmgMatrix, terrainArray}) {
  const unitList = unitArray;
  const damageMatrix = dmgMatrix;
  // const terrainList = terrainArray;
  const availableCOS = Object.keys(coLibrary);
  const [atkUnit, setAtkUnit] = React.useState(unitList[0]);
  const [defUnit, setDefUnit] = React.useState(unitList[0]);
  const [atkCO, setAtkCO] = React.useState(availableCOS[0]);
  const [defCO, setDefCO] = React.useState(availableCOS[0]);
  // const [atkFunds, setAtkFunds] = React.useState(0);
  // const [defFunds, setDefFunds] = React.useState(0);
  // const [atkCommTower, setAtkCommTower] = React.useState(0);
  // const [defCommTower, setDefCommTower] = React.useState(0);
  // const [atkTerrain, setAtkTerrain] = React.useState(terrainList[0]);
  // const [defTerrain, setDefTerrain] = React.useState(terrainList[0]);

  const getDamageBase = () => {
    const atkUnitIndex = unitList.indexOf(atkUnit);
    const defUnitIndex = unitList.indexOf(defUnit);
    return damageMatrix[atkUnitIndex][defUnitIndex];
  };

  const onChangeHelper = (setter) => {
    const helper = (event) => {
      setter(event.target.value);
    };
    return helper;
  };

  return (
    <>
      {
        selectBox({
          value: atkUnit,
          onChangeSetter: onChangeHelper(setAtkUnit),
          label: 'Attacking Unit',
          valueList: unitList,
        })
      }
      {
        selectBox({
          value: defUnit,
          onChangeSetter: onChangeHelper(setDefUnit),
          label: 'Defending Unit',
          valueList: unitList,
        })
      }
      {
        selectBox({
          value: atkCO,
          onChangeSetter: onChangeHelper(setAtkCO),
          label: 'Attacking CO',
          valueList: Object.keys(coLibrary),
        })
      }
      {
        selectBox({
          value: defCO,
          onChangeSetter: onChangeHelper(setDefCO),
          label: 'Defending CO',
          valueList: Object.keys(coLibrary),
        })
      }
      <text>
            Damage Base is: {getDamageBase()}
      </text>
    </>
  );
}

/**
 * Runs file loading server side.
 * @return {Object} JSON Object with relevant damage data.
 */
export async function getServerSideProps() {
  const uA = unitLoader('src/gameData/units.txt');
  const dM = damageMatrixLoader('src/gameData/damage-matrix.txt');
  const tA = terrainLoader('src/gameData/terrain.txt');
  return {
    props: {unitArray: uA, dmgMatrix: dM, terrainArray: tA},
  };
}
