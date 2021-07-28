import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import { generateMonthArray, MS24HOUR } from '../lib/dates';
import DayButton from './DayButton';
import { useMonthContext } from '../context/global';

export default function CalendarGrid() {
  const {
    state: { month, year },
  } = useMonthContext();
  const currentDateMS = Date.now();

  return (
    <Grid gridTemplateColumns='repeat(7, 1fr)'>
      {generateMonthArray(month, year).map((date) => {
        return (
          <GridItem key={`current-month-${date}}`}>
            <DayButton
              disabled={date < currentDateMS - MS24HOUR}
              dateInMS={date}
              variant='ghost'
              colorScheme='teal'
            />
          </GridItem>
        );
      })}
    </Grid>
  );
}
