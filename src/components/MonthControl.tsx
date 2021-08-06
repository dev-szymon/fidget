import React from 'react';
import { Flex, Box, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { getMonthAndYear, monthSwitch } from '../lib/dates';
import { useStore } from '../lib/Store';
import { observer } from 'mobx-react';

export default observer(function MonthControl() {
  const { month: currentMonth, year: currentYear } = getMonthAndYear(
    Date.now()
  );

  const { month, year, nextMonth, prevMonth } = useStore();

  return (
    <Flex justify='space-between' align='center' p='0.5rem 0'>
      <IconButton
        aria-label='previous month'
        icon={<ChevronLeftIcon />}
        onClick={() => prevMonth()}
        disabled={year === currentYear && month === currentMonth}
      ></IconButton>
      <Box>{`${monthSwitch(month)} ${year}`}</Box>
      <IconButton
        aria-label='next month'
        icon={<ChevronRightIcon />}
        onClick={() => nextMonth()}
      ></IconButton>
    </Flex>
  );
});
