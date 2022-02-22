import unitLoader from '../dataLoaders/unitLoader';
import damageMatrixLoader from '../dataLoaders/damageMatrixLoader';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import * as React from 'react';

const unitList = unitLoader();
const damageMatrix = damageMatrixLoader();
/**
 * @return {React.Component} React Component representing damage calculator
 */
export default function damageCalculator() {
  const [atkUnit, setAtkUnit] = React.useState(unitList[0]);
  const [defUnit, setDefUnit] = React.useState(unitList[0]);

  const onAtkUnitChange = (event) => {
    setAtkUnit(event.target.value);
  };

  const onDefUnitChange = (event) => {
    setDefUnit(event.target.value);
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
      <text>
            Damage Base is: {getDamageBase()}
      </text>
    </>
  );
}
