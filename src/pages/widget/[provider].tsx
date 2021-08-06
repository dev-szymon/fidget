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
  Flex,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

import CalendarGrid, {
  CalendarGridSkeleton,
} from '../../components/CalendarGrid';
import MonthControl from '../../components/MonthControl';
import { fetchProvider } from '../../lib/queries';

export default function ProviderWidget() {
  const {
    query: { provider },
  } = useRouter();

  const { status, data, error } = useQuery(
    `provider-${provider}`,
    async () => await fetchProvider(provider as string)
  );

  if (!provider || status === 'loading') {
    return (
      <Modal
        isOpen
        onClose={() => {
          return;
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <Skeleton w='70%' />
          <ModalBody>
            <Skeleton />
            <Skeleton />
            <CalendarGridSkeleton />
          </ModalBody>

          <ModalFooter>
            <Flex w='40%'>
              <Skeleton />
            </Flex>
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
          <ModalHeader>{provider}</ModalHeader>
          <ModalBody>
            <MonthControl />
            <CalendarGrid provider={data} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='teal' mr={3}>
              Rezerwuję!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
}
