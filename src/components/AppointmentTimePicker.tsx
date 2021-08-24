import { Box, Flex } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useQuery } from 'react-query';
import { fetchAvailability } from '../lib/queries';

interface AppointmentTimePickerProps {
  date: string;
  providerId: string;
  serviceId: string;
}

export default observer(function AppointmentTimePicker({
  date,
  providerId,
  serviceId,
}: AppointmentTimePickerProps) {
  const { status, data, error } = useQuery(
    `availability-${providerId}-${date}-${serviceId}`,
    async () => await fetchAvailability(date, providerId, serviceId)
  );
  if (data) {
    console.log(data);
    return (
      <Flex>
        {data.map((d: number) => {
          const minutes = new Date(d).getMinutes();
          const hours = new Date(d).getHours();
          return (
            <Box key={d}>{`${hours}:${
              minutes < 10 ? `0${minutes}` : minutes
            }`}</Box>
          );
        })}
      </Flex>
    );
  }

  return <div></div>;
});
