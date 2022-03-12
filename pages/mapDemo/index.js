import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import {styled} from '@mui/system';
import mapDemoLoader from '../../src/dataLoaders/mapDemoLoader';
import {terrainToImageSrc} from '../../src/dataHelpers/imageHelpers';
import {terrainFromRepresentationDict} from '../../src/dataHelpers/terrainHelpers';
import * as React from 'react';

const Root = styled('div')(
    ({theme}) => `
  td {
    width:0.1%;
    white-space: nowrap;
    } 
`,
);

/**
 * Helper to grab correct img src from character representing terrain
 * @param {string} rep representation of terrain
 * @return {string} Homepage div
 */
function srcHelper(rep) {
  const terrain = terrainFromRepresentationDict[rep];
  const src = terrainToImageSrc(terrain, 'nada');
  return src;
}

/**
 * Unit on Unit Base Damage Chart
 * @return {div} Homepage div
 */
export default function MapDemo({mapDemoArray}) {
  const mapDemo = mapDemoArray;
  return (
    <Root>
      <TableContainer>
        <Table>
          <TableBody>
            {
              mapDemo.map((row) => (
                <TableRow>
                  {
                    row.map((char) => (
                      <TableCell align='center'>
                        <img src={srcHelper(char)}/>
                      </TableCell>
                    ))
                  }
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Root>
  );
}

/**
 * Runs file loading server side.
 * @return {Object} JSON Object with relevant damage data.
 */
export async function getServerSideProps() {
  const mD = mapDemoLoader('src/gameData/map-demo.txt');

  return {
    props: {mapDemoArray: mD},
  };
}
