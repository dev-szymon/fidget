import { Button, ButtonProps } from '@chakra-ui/react';
import { useMonthContext } from '../context/monthContext';
import { getMonthAndYear } from '..//lib/dates';

interface DayButtonProps extends ButtonProps {
  dateInMS: number;
}
export default function DayButton({ dateInMS, ...rest }: DayButtonProps) {
  const {
    state: { month, year },
  } = useMonthContext();
  const day = new Date(dateInMS).getDate();
  const { month: buttonMonth, year: buttonYear } = getMonthAndYear(dateInMS);

  const isCurrentMonth = month === buttonMonth && year === buttonYear;

  return (
    <Button p={0} {...rest} opacity={isCurrentMonth ? 1 : 0.4}>
      {day}
    </Button>
  );
}
