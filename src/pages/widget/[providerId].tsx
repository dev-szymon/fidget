import React from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  Skeleton,
  List,
  ListItem,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

import CalendarGrid, {
  CalendarGridSkeleton,
} from '../../components/CalendarGrid';
import MonthControl from '../../components/MonthControl';
import { fetchProvider } from '../../lib/queries';
import { useStore } from '../../lib/Store';
import ServiceItem from '../../components/ServiceItem';

export default function ProviderWidget() {
  const {
    query: { providerId },
  } = useRouter();

  const { service } = useStore();

  const { status, data, error } = useQuery(
    `provider-${providerId}`,
    async () => await fetchProvider(providerId as string)
  );

  if (!providerId || status === 'loading') {
    return (
      <Modal
        isOpen
        onClose={() => {
          return;
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <Skeleton />
          <ModalBody>
            <Skeleton />
            <Skeleton />
            <CalendarGridSkeleton />
          </ModalBody>

          <ModalFooter>
            <Skeleton />
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }

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
          <ModalHeader>{providerId}</ModalHeader>
          <ModalBody>
            {service ? (
              <>
                <MonthControl />
                <CalendarGrid provider={data} />
              </>
            ) : (
              <>
                <h1>wybierz usługę</h1>
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
            <Button colorScheme='teal' mr={3}>
              {service ? `Rezerwuję!` : 'Dalej'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }

  if (error) {
    return <div>error</div>;
  }
}
