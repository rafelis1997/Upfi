import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
  ModalHeader,
  ModalCloseButton,
  LinkBox,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalHeader>
        <ModalCloseButton />
      </ModalHeader>

      <ModalContent bgColor="pGray.600" maxW="900px" maxH="600px">
        <Image src={imgUrl} alt="" w="100%" />

        <ModalFooter
          justifyContent="flex-start"
          bgColor="pGray.800"
          borderRadius="inherit"
          borderTopRadius={0}
          h={5}
        >
          <Link href={imgUrl} target="_blank">
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
