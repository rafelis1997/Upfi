import { Button, Box, Flex, Text } from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface FetchImageResponseProps {
  data: Card[];
  after: string | null;
}

export default function Home(): JSX.Element {
  async function fetchImages({
    pageParam = null,
  }): Promise<FetchImageResponseProps> {
    if (pageParam) {
      const { data } = await api.get('/api/images', {
        params: {
          after: pageParam,
        },
      });
      return data;
    }
    const { data } = await api.get('/api/images');
    return data;
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    // TODO AXIOS REQUEST WITH PARAM
    fetchImages,
    // TODO GET AND RETURN NEXT PAGE PARAM
    { getNextPageParam: lastPage => lastPage?.after ?? null }
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    function onScroll() {
      // const target = ev.target as Document;
      const { scrollHeight, scrollTop, clientHeight } =
        document.scrollingElement;

      if (hasNextPage && scrollHeight - scrollTop <= clientHeight * 1.2) {
        fetchNextPage();
      }
    }

    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [hasNextPage, fetchNextPage]);

  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
    return data ? data.pages.map(page => page.data).flat() : [];
  }, [data]);

  // TODO RENDER LOADING SCREEN
  if (isLoading) {
    return <Loading />;
  }

  // TODO RENDER ERROR SCREEN

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Flex
        maxW={1120}
        px={20}
        mx="auto"
        my={20}
        justifyContent="center"
        flexDirection="column"
      >
        <CardList cards={formattedData} />

        {hasNextPage ? (
          <Button
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            marginTop={20}
            alignSelf="center"
            w="fit-content"
          >
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        ) : (
          <Text marginTop={20} alignSelf="center" w="fit-content">
            WOW! Você chegou até o fim das postagens! 👏
          </Text>
        )}
      </Flex>
    </>
  );
}
