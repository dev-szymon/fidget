import React from 'react';
import { Grid, GridItem, Skeleton } from '@chakra-ui/react';
import { generateMonthArray, MS24HOUR } from '..//lib/dates';
import DayButton from './DayButton';
import { useMonthContext } from '../context/monthContext';

export default function CalendarGrid({ provider }: any) {
  const {
    state: { month, year },
  } = useMonthContext();
  const currentDateMS = Date.now();
  const { availability } = provider;
  console.log(provider);

  return (
    <Grid gridTemplateColumns='repeat(7, 1fr)'>
      {generateMonthArray(month, year).map((date) => {
        const weekday = new Date(date).getDay() || 7;
        return (
          <GridItem key={`current-month-${date}}`}>
            <DayButton
              disabled={
                date < currentDateMS - MS24HOUR ||
                !availability.includes(weekday)
              }
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

export function CalendarGridSkeleton() {
  return (
    <>
      {Array.from(Array(7).keys()).map((row) => (
        <Skeleton
          key={`${row}-skeleton-row`}
          h='40px'
          m='0.5rem 0'
          borderRadius='0.5rem'
        />
      ))}
    </>
  );
}
