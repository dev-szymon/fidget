import { observer } from 'mobx-react';
import { Button, ButtonProps } from '@chakra-ui/react';
import { getMonthAndYear, MS24HOUR } from '../lib/utils';
import { useStore } from '../lib/Store';

interface DayButtonProps extends ButtonProps {
  dateInMS: number;
}

export default observer(function DayButton({
  dateInMS,
  ...rest
}: DayButtonProps) {
  const { month, year, selectDay, selectedDay } = useStore();

  const day = new Date(dateInMS).getDate();
  const { month: buttonMonth, year: buttonYear } = getMonthAndYear(dateInMS);
  const isCurrentDay =
    Date.now() > dateInMS && Date.now() < dateInMS + MS24HOUR;
  const isSelected = dateInMS === selectedDay;
  const isCurrentMonth = month === buttonMonth && year === buttonYear;

  return (
    <Button
      p={0}
      {...rest}
      opacity={isCurrentMonth ? 1 : 0.4}
      variant={isSelected ? 'solid' : isCurrentDay ? 'outline' : 'ghost'}
      onClick={() => selectDay(dateInMS)}
    >
      {day}
    </Button>
  );
});
