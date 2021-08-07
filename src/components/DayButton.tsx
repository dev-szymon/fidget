import { observer } from 'mobx-react';
import { Button, ButtonProps } from '@chakra-ui/react';
import { getMonthAndYear } from '../lib/utils';
import { useStore } from '../lib/Store';

interface DayButtonProps extends ButtonProps {
  dateInMS: number;
}

export default observer(function DayButton({
  dateInMS,
  ...rest
}: DayButtonProps) {
  const { month, year } = useStore();

  const day = new Date(dateInMS).getDate();
  const { month: buttonMonth, year: buttonYear } = getMonthAndYear(dateInMS);

  const isCurrentMonth = month === buttonMonth && year === buttonYear;

  return (
    <Button p={0} {...rest} opacity={isCurrentMonth ? 1 : 0.4}>
      {day}
    </Button>
  );
});
