import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  List,
  ListItem,
  Spinner,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import CalendarGrid from "../../components/CalendarGrid";
import MonthControl from "../../components/MonthControl";
import { fetchProvider } from "../../lib/queries";
import { useStore } from "../../lib/Store";
import ServiceItem from "../../components/ServiceItem";
import AppointmentTimePicker from "../../components/AppointmentTimePicker";
import { observer } from "mobx-react";
import { generateDateString } from "../../lib/utils";

export default observer(function ProviderWidget() {
  const {
    query: { providerId },
  } = useRouter();

  const { service, selectedDay, selectedDayString } = useStore();

  const date = selectedDay && generateDateString(new Date(selectedDay));

  const { data, error } = useQuery(
    `provider-${providerId}`,
    async () => await fetchProvider(providerId)
  );

  if (data) {
    return (
      <Modal
        isOpen
        onClose={() => {
          return;
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{data.name}</ModalHeader>
          <ModalBody>
            {service ? (
              <>
                <MonthControl />
                <CalendarGrid provider={data} />
                {selectedDay && date && (
                  <AppointmentTimePicker
                    date={date}
                    providerId={providerId as string}
                    serviceId={service._id}
                  />
                )}
              </>
            ) : (
              <>
                <Heading as="h4" fontSize="1rem">
                  wybierz usługę
                </Heading>
                <List>
                  {data.services.map((service) => {
                    return (
                      <ListItem key={service._id}>
                        <ServiceItem service={service} />
                      </ListItem>
                    );
                  })}
                </List>
              </>
            )}
          </ModalBody>

          <ModalFooter>
            {service && (
              <Button colorScheme="teal" mr={3}>
                Rezerwuję!
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <Modal
      isOpen
      onClose={() => {
        return;
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <Flex height="60vh" justify="center" align="center">
          <Spinner colorScheme="teal" />
        </Flex>
      </ModalContent>
    </Modal>
  );
});
