import * as React from "react";
import { Box, Button, HStack } from "@chakra-ui/react";
import { observer } from "mobx-react";
import { useQuery } from "react-query";
import { fetchAvailability } from "../lib/queries";
import { generateHourMinutesString } from "../lib/utils";

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
    return (
      <HStack overflowX="scroll" overflowY="hidden" pt="1rem" pb="0.5rem">
        {data.map((d: number) => {
          const displayTime = generateHourMinutesString(
            new Date(d).getHours(),
            new Date(d).getMinutes()
          );
          return (
            <Button minW="4rem" variant="outline" mr="0.5rem" key={d}>
              {displayTime}
            </Button>
          );
        })}
      </HStack>
    );
  }

  return <div></div>;
});
