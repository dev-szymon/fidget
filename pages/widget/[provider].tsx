import {
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import CalendarGrid from '../../components/CalendarGrid';
import MonthControl from '../../components/MonthControl';
import { useRouter } from 'next/router';

interface ProviderWidgetProps {
  provider: string;
}

export default function ProviderWidget() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    query: { provider },
  } = useRouter();

  return (
    <>
      <Button
        position='fixed'
        bottom='1rem'
        right='1rem'
        zIndex='9999'
        colorScheme='teal'
        onClick={onOpen}
      >
        Rezerwuj
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{provider}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <MonthControl />
            <CalendarGrid />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='teal' mr={3}>
              Rezerwuję!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   if (!params) return { props: {} };
//   return {
//     props: { provider: params.provider },
//   };
// };
