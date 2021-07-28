import React from 'react';
import { Flex, Box, IconButton } from '@chakra-ui/react';
import { useMonthContext } from '../context/global';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { getMonthAndYear, monthSwitch } from '../lib/dates';

export default function MonthControl() {
  const { month: currentMonth, year: currentYear } = getMonthAndYear(
    Date.now()
  );

  const {
    state: { month, year },
    dispatch,
  } = useMonthContext();

  return (
    <Flex justify='space-between' align='center' p='0.5rem 0'>
      <IconButton
        aria-label='previous month'
        icon={<ChevronLeftIcon />}
        onClick={() => dispatch({ type: 'PREV_MONTH' })}
        disabled={year === currentYear && month === currentMonth}
      ></IconButton>
      <Box>{`${monthSwitch(month)} ${year}`}</Box>
      <IconButton
        aria-label='next month'
        icon={<ChevronRightIcon />}
        onClick={() => dispatch({ type: 'NEXT_MONTH' })}
      ></IconButton>
    </Flex>
  );
}
