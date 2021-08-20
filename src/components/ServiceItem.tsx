import React from 'react';
import { Badge, Flex, Text } from '@chakra-ui/react';
import { Service } from '../models/Service';
import { IconButton } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { useStore } from '../lib/Store';
import { observer } from 'mobx-react';

interface ServicesListProps {
  service: Service;
}

export default observer(function ServiceItem({ service }: ServicesListProps) {
  const { name, duration } = service;
  const { selectService } = useStore();
  return (
    <Flex justify='space-between' align='center'>
      <Text>{name}</Text>
      <Flex align='center'>
        <Badge colorScheme='teal' p='0.2rem 0.5rem' m='0 0.2rem'>{`${
          duration / 1000 / 60
        } min`}</Badge>
        <IconButton
          aria-label={`wybierz ${name}`}
          icon={<ChevronRightIcon />}
          onClick={() => selectService(service)}
        />
      </Flex>
    </Flex>
  );
});
