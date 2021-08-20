import React, { useEffect } from 'react';
import { Grid, GridItem, Skeleton } from '@chakra-ui/react';
import { generateMonthArray, getFirstMonthDay, MS24HOUR } from '../lib/utils';
import DayButton from './DayButton';
import { useStore } from '../lib/Store';
import { observer } from 'mobx-react';

export default observer(function CalendarGrid({ provider }: any) {
  const { month, year, selectDay } = useStore();
  const currentDateMS = Date.now();
  const { availability } = provider;

  useEffect(() => {
    const getStartingDay = (date: number): number => {
      return date > Date.now() ? date : getStartingDay(date + MS24HOUR);
    };
    const calculateFirstAvailableDay = (
      month: number,
      year: number,
      availability: number[]
    ) => {
      return availability.reduce((curr, next) => {
        const weekday = new Date(curr).getDay() || 7;
        return availability.includes(weekday) ? curr : curr + MS24HOUR;
      }, getStartingDay(getFirstMonthDay(month, year).getTime()));
    };
    const select = calculateFirstAvailableDay(month, year, availability);
    selectDay(select);
  }, [month, year, availability, selectDay]);

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
              colorScheme='teal'
            />
          </GridItem>
        );
      })}
    </Grid>
  );
});

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
