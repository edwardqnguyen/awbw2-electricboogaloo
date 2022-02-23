import unitLoader from '../src/dataLoaders/unitLoader';
import damageMatrixLoader from '../src/dataLoaders/damageMatrixLoader';
import {coLibrary} from '../src/commandingOfficers/coLibrary';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import * as React from 'react';

/**
 * @return {React.Component} React Component representing damage calculator
 */
export default function damageCalculator({unitArray, dmgMatrix, terrainArray}) {
  const unitList = unitArray;
  const damageMatrix = dmgMatrix;
  const terrainList = terrainArray;
  const availableCOS = coLibrary.keys();
  const [atkUnit, setAtkUnit] = React.useState(unitList[0]);
  const [defUnit, setDefUnit] = React.useState(unitList[0]);
  const [atkCO, setAtkCO] = React.useState(availableCOS[0]);
  const [defCO, setDefCO] = React.useState(availableCOS[0]);
  const [atkFunds, setAtkFunds] = React.useState(0);
  const [defFunds, setDefFunds] = React.useState(0);
  const [atkCommTower, setAtkCommTower] = React.useState(0);
  const [defCommTower, setDefCommTower] = React.useState(0);
  const [atkTerrain, setAtkTerrain] = React.useState(terrainList[0]);
  const [defTerrain, setDefTerrain] = React.useState(terrainList[0]);

  const onAtkUnitChange = (event) => {
    setAtkUnit(event.target.value);
  };

  const onDefUnitChange = (event) => {
    setDefUnit(event.target.value);
  };

  const onAtkCOChange = (event) => {
    setAtkCO(event.target.value);
  };

  const onDefCOChange = (event) => {
    setDefCO(event.target.value);
  };

  const onAtkFundsChange = (event) => {
    setAtkFunds(event.target.value);
  };

  const onDefFundsChange = (event) => {
    setDefFunds(event.target.value);
  };

  const onAtkCommTowerChange = (event) => {
    setAtkCommTower(event.target.value);
  };

  const onDefCommTowerChange = (event) => {
    setDefCommTower(event.target.value);
  };

  const getDamageBase = () => {
    const atkUnitIndex = unitList.indexOf(atkUnit);
    const defUnitIndex = unitList.indexOf(defUnit);
    return damageMatrix[atkUnitIndex][defUnitIndex];
  };

  return (
    <>
      <Box sx={{minWidth: 120}}>
        <FormControl fullWidth>
          <InputLabel id="atk-unit-select-label">Attacking Unit</InputLabel>
          <Select
            labelId="atk-unit-select-label"
            id="atk-unit-select"
            value={atkUnit}
            label="Attacking Unit"
            onChange={onAtkUnitChange}
          >
            {
              unitList.map((unit) => {
                return <MenuItem key={unit} value={unit}>{unit}</MenuItem>;
              })
            }
          </Select>
        </FormControl>
      </Box>
      <Box sx={{minWidth: 120}}>
        <FormControl fullWidth>
          <InputLabel id="def-unit-select-label">Defending Unit</InputLabel>
          <Select
            labelId="def-unit-select-label"
            id="def-unit-select"
            value={defUnit}
            label="Defending Unit"
            onChange={onDefUnitChange}
          >
            {
              unitList.map((unit) => {
                return <MenuItem key={unit} value={unit}>{unit}</MenuItem>;
              })
            }
          </Select>
        </FormControl>
      </Box>
      <Box sx={{minWidth: 120}}>
        <FormControl fullWidth>
          <InputLabel id="atk-co-select-label">Attacking CO</InputLabel>
          <Select
            labelId="atk-co-select-label"
            id="atk-co-select"
            value={atkCO}
            label="attackingCO"
            onChange={onDefUnitChange}
          >
            {
              unitList.map((unit) => {
                return <MenuItem key={unit} value={unit}>{unit}</MenuItem>;
              })
            }
          </Select>
        </FormControl>
      </Box>
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
