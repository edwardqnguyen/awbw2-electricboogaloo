import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import unitLoader from '../src/dataLoaders/unitLoader';
import {unitToImageSrc} from '../src/dataHelpers/imageHelpers';
import {coLibrary} from '../src/commandingOfficers/coLibrary';
import * as React from 'react';

const topFaction = 'CobaltIce';

/**
   * CO Atk/Def Bonus Chart for D2D/COP/SCOP
   * @return {div} Homepage div
   */
export default function coDamageChart({unitArray}) {
  const unitList = unitArray;
  const availableCOS = Object.keys(coLibrary);
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableCell align='center'>CO</TableCell>
            {
              unitList.map((unit) => (
                <TableCell align='center'>
                  <img src={unitToImageSrc(unit, topFaction)}/>
                </TableCell>
              ))
            }
          </TableHead>
          <TableBody>
            {
              availableCOS.map((row, i) => (
                <TableRow>
                  <TableCell align='center'>
                    <img src={unitToImageSrc(unitList[i], sideFaction)}/>
                  </TableCell>
                  {
                    row.map((element) => (
                      <TableCell align='center'>{element === 0 ? '-':element}</TableCell>
                    ))
                  }
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

/**
   * Runs file loading server side.
   * @return {Object} JSON Object with relevant damage data.
   */
export async function getServerSideProps() {
  const uA = unitLoader('src/gameData/units.txt');

  return {
    props: {unitArray: uA},
  };
}
