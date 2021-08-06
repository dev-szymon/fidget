import React from 'react';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createMonthStore, StoreProvider } from '../lib/Store';

const queryClient = new QueryClient();
const store = createMonthStore();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <StoreProvider store={store}>
          <Component {...pageProps} />
        </StoreProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
export default MyApp;
