import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  InputRightAddon,
  useDisclosure,
} from '@chakra-ui/react';
import { FiSearch, FiX } from 'react-icons/fi';

function SearchModalComponent({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div onClick={onOpen}>{children}</div>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="500px">
          <ModalHeader>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={FiSearch} color="gray.500" />}
              />
              <Input variant="outline" placeholder="검색" />
              <InputRightAddon
                onClick={onClose}
                children={<Icon as={FiX} color="gray.500" />}
              />
            </InputGroup>
          </ModalHeader>
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              닫기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SearchModalComponent;
