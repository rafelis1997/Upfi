import { Grid, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE
  const { isOpen, onOpen, onClose } = useDisclosure();

  // TODO SELECTED IMAGE URL STATE
  const [selectedImageUrl, setSelectedImageUrl] = useState('');

  // TODO FUNCTION HANDLE VIEW IMAGE
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function handleImageViewModal(url: string) {
    setSelectedImageUrl(url);
    onOpen();
  }

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap="40px">
      {cards.map(card => (
        <Card
          key={card.id}
          data={card}
          viewImage={() => handleImageViewModal(card.url)}
        />
      ))}

      {isOpen && (
        <ModalViewImage
          isOpen={isOpen}
          onClose={onClose}
          imgUrl={selectedImageUrl}
        />
      )}
    </Grid>
  );
}
